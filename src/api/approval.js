import request from '@/utils/request'

export function ApprovalList() {
    return request({
        url: '/Approval/list',
        method: 'get'
    })
}

export function passOne(id) {
    return request({
        url: '/Approval/pass?preid=' +id,
        method: 'get'
    })
}

export function failOne(id) {
    return request({
        url: '/Approval/fail?preid=' +id,
        method: 'get'
    })
}