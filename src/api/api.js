import request from '@/utils/request'
import axios from 'axios'
// 首页轮播
export const bananr = () => {
    return request('/home/banner', 'get')
  }
// 热门品牌
export const brand = (data) => {
    return request('/home/brand', 'get',data)
  }
// 新鲜好物
export const getNew = (data) => {
    return request('/home/new', 'get',data)
  }
// 人气推荐
export const hot = (data) => {
    return request('/home/hot', 'get',data)
  }
//   最新专题
  export const findSpecial = () => {
    return request('home/special', 'get')
  }
  // 获取城市数据
export const getCityData = () => {
    // 这个位置可能有异常操作，封装成promise
    return new Promise((resolve, reject) => {
      if (window.cityData) {
        // 有缓存
        resolve(window.cityData)
      } else {
        // 无缓存
        const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
        axios.get(url).then(res => {
          window.cityData = res.data
          resolve(window.cityData)
        })
      }
    })
  }