import request from '@/utils/request'

export function noticeList() {
    return request({
        url: '/admin/noticeList',
        method: 'get'
    })
}

export function deleteNotice(id) {
    return request({
        url: `/admin/deleteNotice/${id}`,
        method: 'get'
    })
}

export function addNotice(data) {
    return request({
        url: '/admin/addNotice',
        method: 'post',
        data
    })
}