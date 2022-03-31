import request from "../utils/request";


// 获取购物车列表
export const cartList = ()=>{
    return request('/member/cart','get')
}
// 获取删除购物车
export const deleteCartList = (ids)=>{
    return request('/member/cart','delete',{ids})
}
// 购物车单选
export const selectedCartList = (id,selected)=>{
    return request(`/member/cart/${id}`,'put',{selected})
}
// 购物车全选/取消全选
export const selectedAllCartList = (ids,selected)=>{
    return request('/member/cart/selected','put',{ids,selected})
}
