import request from '@/utils/request'
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