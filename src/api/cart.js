import request from "../utils/request";


// 获取购物车列表
export const cartList = ()=>{
    return request('/member/cart','get')
}
// 获取删除购物车
export const deleteCartList = (ids)=>{
    return request('/member/cart','delete',{ids})
}
