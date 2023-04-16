import request from '@/utils/request'

export function getIndexData(data) {
  return request({
    url: '/home/getIndexData',
    params: data,
    method: 'get'
  })
}
export function getDefaultRouting() {
  return request({
    url: '/home/getDefaultRouting',
    method: 'get'
  })
}