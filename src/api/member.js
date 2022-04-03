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
