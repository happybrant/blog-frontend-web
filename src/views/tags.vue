<template>
  <div class="column order-2 column-main is-8-tablet is-8-desktop is-6-widescreen">
    <TagCard v-if="$route.params.tag == null"   />
    <template v-else>
      <BreadcrumbCard :first-param="$route.params.tag" :type="type"   />
      <ArticleCard v-for="item in articles" :key="item.id" :article="item"  />
    </template>
  </div>
</template>
<script>
import TagCard from '../components/TagCard'
import BreadcrumbCard from '../components/BreadcrumbCard'
import ArticleCard from '../components/ArticleCard'
export default {
  name: 'Tag',
  components: { TagCard, BreadcrumbCard, ArticleCard },
  data() {
    return {
      // 展示在面包屑组件的名字的路由
      type: {
        path: 'tags',
        name: '标签',
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
      parameters.tag = _this.$route.params.tag
      parameters.router = _this.$route.params.router
      _this.$store
        .dispatch('getArticlePager', parameters)
        .then(function (response) {
          if (response == null || response.records == null || response.records.length == 0) {
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