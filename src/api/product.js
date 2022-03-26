import request from '@/utils/request'
/**
 * 获取商品详情
 * @param {String} id 
 */
     export const findProductGoods = (id) => {
        return request('/goods', 'get', { id })
      }