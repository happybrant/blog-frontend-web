<template>
  <div class="column order-2 column-main is-8-tablet is-8-desktop is-6-widescreen">
    <ArticleCard v-for="item in articles" :key="item.id" :article="item"  />
    <Pagination :pager="pager" :getPagerData="getArticlePager" />
  </div>
</template>
<script>
import ArticleCard from '../components/ArticleCard'
import Pagination from '../components/Pagination'
export default {
  name: 'Article',
  components: { ArticleCard, Pagination },
  data() {
    return {
      articles: '',
      pager: '',
    }
  },
  methods: {
    getArticlePager(pageIndex) {
      const _this = this
      var parameters = new Object()
      parameters.pageIndex = pageIndex
      parameters.pageSize = 5
      parameters.router = _this.$route.params.router
      _this.$store
        .dispatch('getArticlePager', parameters)
        .then(function (response) {
          if (response == null || response.records == null || response.records.length == 0) {
             _this.$router.push('/404')
          }
          let { records, ...newObj } = response
          _this.pager = newObj
          _this.articles = records
        })
      window.scroll({ top: 0, behavior: 'smooth' })
    },
  },
  mounted() {
    this.getArticlePager(1)
  },
}
</script>