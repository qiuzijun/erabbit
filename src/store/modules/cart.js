import { cartList ,deleteCartList,selectedCartList,selectedAllCartList} from '@/api/cart.js'
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
                    const map = new Map()
                    const data = result.filter(item=>{
                        return !map.has(item.skuId) && map.set(item.skuId,1)
                    })
                    // console.log(data);
                    store.commit('setList', data)
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
                deleteCartList(skuid).then(data=>{
                    message.success('删除成功');
                    store.dispatch('getList')
                }).catch(err=>{
                    console.log(err);
                    message.error('删除失败');
                })
            }
        },
        // 单选
        selectedList(store,{id,checked}){
            return new Promise((resolve, reject)=>{
                if(store.rootState.user.profile.token){
                    selectedCartList(id,checked).then(data=>{
                        if(checked) message.success('选中成功');
                       else message.success('取消成功');
                        store.dispatch('getList')
                        resolve(data)
                    }).catch(err=>{
                        console.log(err);
                        if(checked) message.error('选中失败');
                        else message.error('取消失败');
                        reject(err)
                    })
                }
            })
        },
        // 全选
        selectedAllList(store,{ids,checked}){
            console.log(ids);
           return new Promise((resolve, reject)=>{
            if(store.rootState.user.profile.token){
                selectedAllCartList(ids,checked).then(data=>{
                    if(checked) message.success('选中成功');
                    else  message.success('取消成功');
                    store.dispatch('getList')
                    resolve(data)
                }).catch(err=>{
                    console.log(err);
                    if(checked) message.error('选中失败');
                    else message.error('取消失败');
                    reject(err)
                })
            }
           })
        }

      },
      getters:{

      }
}