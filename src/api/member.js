import request from "../utils/request";

/**
 * 生成订单(即填写订单或结算页)
 */
 export const memberOrderPre = () => {
    return request('/member/order/pre', 'get')
  }