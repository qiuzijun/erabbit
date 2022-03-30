import { cartList ,deleteCartList} from '@/api/cart.js'
import { message } from 'ant-design-vue';


export default {
    namespaced: true,
    state() {
        return {
            // 购物车商品列表
            list: []
        }
    },
    mutations: {
        setList(state,list){
            state.list = list
        },
        deleteCart(state,id){
            state.list = state.list.filter(data=>{
                return data.id !== id
            })
        }
      },
     
      actions: {
      getList(store){
            if(store.rootState.user.profile.token){
                cartList().then(({result})=>{
                    // 获取数据成功，提交mutations进行数据修改
                    store.commit('setList', result)
                }).catch(err=>{
                    console.log(err);
                    return err
                })
            } else {
                store.commit('setList', [])
            }
            
        },
        deleteList(store,skuid){
            if(store.rootState.user.profile.token){
                deleteCartList([skuid]).then(data=>{
                    message.success('删除成功');
                    store.dispatch('getList')
                }).catch(err=>{
                    console.log(err);
                    message.error('删除失败');
                })
            }
        }

      },
      getters:{

      }
}