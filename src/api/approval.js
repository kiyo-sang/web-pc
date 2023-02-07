import request from '@/utils/request'

export function ApprovalList() {
    return request({
        url: '/Approval/list',
        method: 'get'
    })
}