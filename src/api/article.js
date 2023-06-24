import request from '@/utils/request';

export function getArticlePager(data) {
  return request({
    url: '/article/getArticlePager',
    method: 'post',
    data: data,
  });
}
export function getArticleDetail(id) {
  return request({
    url: `/article/detail/${id}`,
    method: 'get',
  });
}
export function getAboutArticle(router) {
  return request({
    url: '/article/about',
    method: 'get',
    params: router
  });
}
export function searchArticles(data) {
  return request({
    url: '/article/searchArticles',
    method: 'get',
    params: data
  });
}