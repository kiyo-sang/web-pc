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

export function EveryDayList() {
    return request({
        url: '/EveryDay/list',
        method: 'get'
    })
}

export function EveryDayDelete(id) {
    return request({
        url: `/EveryDay/delete/${id}`,
        method: 'get'
    })
}

export function EveryDayAdd(id) {
    return request({
        url: `/EveryDay/add/${id}`,
        method: 'get'
    })
}