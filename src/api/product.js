import request from '@/utils/request'
import axios from 'axios'
import qs from 'qs'
/**
 * 获取商品详情
 * @param {String} id 
 */
    export const findProductGoods = (id) => {
        return request('/goods', 'get', { id })
    }
/**
 * 获取商品同类商品推荐
 * @param {String} id 
 * @param {String} limit 
 */
    export const findProductGoodsRelevant = (params) => {
        return request('/goods/relevant', 'get', params)
    }
/**
 * 获取榜单
 * @param {String} id 
 * @param {String} limit 
 * @param {String} type 
 */
    export const findProductGoodsHot = (params) => {
        return request('/goods/hot', 'get', params)
    }
// 获取评论类型
export const evaluate = (id)=>{
    return new Promise((resolve, reject) => {
          const url = `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`
          axios.get(url).then(res => {
            resolve(res)
          }).catch(err=>{
            reject(err)
          })
        
      })
}
// 获取评论
export const evaluatePage = (id,data)=>{
    const d = qs.stringify(data)
    return new Promise((resolve, reject) => {
          const url = `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page?${d}`
          axios.get(url).then(res => {
            resolve(res)
          }).catch(err=>{
            reject(err)
          })
        
      })
}