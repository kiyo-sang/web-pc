import request from '@/utils/request'

export function getMenuList() {
  return request({
    url: '/menus/searchByAll',
    method: 'get'
  })
}

export function getMenuTypeList() {
  return request({
    url: '/selectAll',
    method: 'get'
  })
}

export function addMenuByAdmin(data) {
  return request({
    url: '/menus/addByAdmin',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
  }
  })
}
