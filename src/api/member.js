import request from "../utils/request";

/**
 * 生成订单(即填写订单或结算页)
 */
 export const memberOrderPre = () => {
    return request('/member/order/pre', 'get')
  }
/**
 * 添加收货地址
 */
 export const memberAddress = ({
      receiver,
      contact,
      fullLocation,
      address,
      provinceCode,
      cityCode,
      countyCode,
      postalCode,
      addressTags,
      isDefault,
 }) => {
    return request('/member/address', 'post',{
      receiver,
      contact,
      fullLocation,
      address,
      provinceCode,
      cityCode,
      countyCode,
      postalCode,
      addressTags,
      isDefault,
    })
  }

/**
 * 
 * 提交订单
 */
export const memberOrder = ({
    goods,
    addressId,
    deliveryTimeType,
    payType,
    payChannel,
    buyerMessage	
})=>{
    return request('/member/order', 'post',{
    goods,
    addressId,
    deliveryTimeType,
    payType,
    payChannel,
    buyerMessage
    })
}
/**
 * 获取订单详情
 * @param {String} id - 订单ID
 */
 export const findOrderDetail = (id) => {
    return request('/member/order/' + id, 'get')
  }
/**
 * 查询订单列表
 * @param {Number} orderState - 订单状态，1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消，未传该参数或0为全部
 * @param {Number} page - 页码
 * @param {Number} pageSize - 每页条数
 * @returns
 */
 export const findOrderList = ({ orderState, page, pageSize }) => {
    return request('/member/order', 'get', { orderState, page, pageSize })
  }
/**
 * 删除订单
 * @param {Array} ids 
 * @returns
 */
 export const deleteOrderLists = ({ ids }) => {
    return request('/member/order', 'delete', { ids })
  }
/**
 * 取消订单
 * @param {String} id
 * @returns
 */
 export const findOrderCancel = ({ id ,cancelReason}) => {
    return request(`/member/order/${id}/cancel`, 'put', {cancelReason})
  }