<template>
  <div class="column order-2 column-main is-8-tablet is-8-desktop is-6-widescreen">
    <CategoryCard v-if="$route.params.rootCategory == null && $route.params.category == null"  />
    <template v-else>
      <BreadcrumbCard 
        :first-param="$route.params.rootCategory" 
        :second-param="$route.params.category" 
        :type="type"
          />
      <ArticleCard v-for="item in articles" :key="item.id" :article="item"  />
    </template>
  </div>
</template>
<script>
import CategoryCard from '../components/CategoryCard'
import BreadcrumbCard from '../components/BreadcrumbCard'
import ArticleCard from '../components/ArticleCard'
export default {
  name: 'Category',
  components: { CategoryCard, BreadcrumbCard, ArticleCard },
  data() {
    return {
      // 展示在面包屑组件的名字的路由
      type: {
        path: 'categories',
        name: '分类',
      },
      articles: '',
    }
  },
  methods: {
    getArticlePager() {
      const _this = this
      var parameters = new Object()
      parameters.pageIndex = 1
      parameters.pageSize = 10
      parameters.category = _this.$route.params.category
        ? _this.$route.params.category
        : _this.$route.params.rootCategory
      parameters.router = _this.$route.params.router
      _this.$store
        .dispatch('getArticlePager', parameters)
        .then(function (response) {
          if (
            response == null ||
            response.records == null ||
            response.records.length == 0
          ) {
             _this.$router.push('/404')
          }
          _this.articles = response.records
        })
    },
  },
  mounted() {
    this.getArticlePager()
  },
}
</script>