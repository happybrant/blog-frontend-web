import { getAboutArticle, getArticleDetail, getArticlePager, searchArticles } from '@/api/article';
import { getDefaultRouting, getIndexData } from '@/api/home';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const actions = {
  // 获取首页统计数据
  getIndexData: (_, parameters) => {
    return new Promise((resolve, reject) => {
      getIndexData(parameters)
        .then((response) => {
          const { data } = response;
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getDefaultRouting: () => {
    return new Promise((resolve, reject) => {
      getDefaultRouting()
        .then((response) => {
          const { data } = response;
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // 获取文章列表
  getArticlePager: (_, parameters) => {
    return new Promise((resolve, reject) => {
      getArticlePager(parameters)
        .then((response) => {
          const { data } = response;
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // 根据id获取文章详情
  getArticleDetail: (context, parameters) => {
      return new Promise((resolve, reject) => {
        getArticleDetail(parameters)
          .then((response) => {
            const { data } = response;
            context.commit('GET_CATALOGUE',data)
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  // 根据id获取文章详情
  getAboutArticle: (context, parameters) => {
    return new Promise((resolve, reject) => {
      getAboutArticle(parameters)
        .then((response) => {
          const { data } = response;
          context.commit('GET_CATALOGUE',data)
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },  
  // 搜索文章
  searchArticles: (_, parameters) => {
    return new Promise((resolve, reject) => {
      searchArticles(parameters)
        .then((response) => {
          const { data } = response;
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const mutations = {
  // 获取文章目录
  GET_CATALOGUE(state, data) {
    data = data.data
    if(data != null && data.content != null) {
      // 获取文章内容中的h标签
      let hLables = data.content.match(/<h\d[^>]*>([\s\S]*?)<\/h\d>/gi)
      let hLabelobjs = []
      if(hLables != null) {
        hLables.forEach(item => {
          let label = item.match(/h\d/i)[0]
          let name = item.substring(item.indexOf('</a>') + 4,item.indexOf('</h') )
          let id = item.split("\"")[1]
          hLabelobjs.push({label,name,id,isRoot:true,children:[]})
        })
      }
      for(let i = hLabelobjs.length - 1; i > 1; i--) {
        // 当前标签元素
        let currentLabel = hLabelobjs[i]
        for(let j = i - 1; j > 0; j--) {
            // 获取前一标签元素
            let preLabel = hLabelobjs[j];
            // 如果当前元素比前一元素大，则当前元素是前一元素的子节点
            if(preLabel.label < currentLabel.label) {
              currentLabel.isRoot = false
              preLabel.children.push(currentLabel)
              break;
            }
        }
      }
      // 第一层只遍历根元素
      state.catalogues = hLabelobjs.filter(item => item.isRoot)
      console.log(state.catalogues)
    }
  }
};

const state = {
  // 文章目录
  catalogues:[],
  // 文章分类
  categories:[],
  // 文章标签
  tags:[],
  // 搜索框开关
  searchBoxOpen:false,
  // 搜索关键词
  keyword:'',
  // 搜索到的文章
  searchArticles:[],
 // 当前路由
  currentRouter:''
};

const getters = {};

export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters,
});
