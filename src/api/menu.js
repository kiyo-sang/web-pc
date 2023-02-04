import request from '@/utils/request'

export function getMenuList() {
  return request({
    url: '/menus/searchByAll',
    method: 'get'
    
  })
}


// export function getMenuList(params) {
//   return request({
//     url: '/vue-admin-template/table/list',
//     method: 'get',
//     params
//   })
// }
