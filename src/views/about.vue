<template>
  <div class="column order-2 column-main is-8-tablet is-8-desktop is-8-widescreen">
    <ArticleDetailCard v-if="article != null" :article="article" />
    <AboutMeNotFound v-else />
  </div>
</template>
<script>
import ArticleDetailCard from '../components/ArticleDetailCard'
import AboutMeNotFound from '../components/AboutMeNotFound'
export default {
  components: {
    ArticleDetailCard,
    AboutMeNotFound,
  },
  props: ['router'],
  data() {
    return {
      article: {
        preArticle: null,
        nextArticle: null,
      },
      catalogues: [],
    }
  },
  methods: {
    getArticleDetail() {
      const _this = this
      _this.$store
        .dispatch('getAboutArticle', { router: _this.$route.params.router })
        .then(function (response) {
          if (response == null || response.data == null) {
            _this.article = null
          } else {
            _this.article = response.data
          }
        })
    },
  },
  mounted() {
    // 有可能是从搜索页面跳转过来的,故关掉搜索页面,清空搜索框
    this.$store.state.searchBoxOpen = false
    this.$store.state.keyword = ''
    this.$store.state.searchArticles = []
    this.getArticleDetail()
  },
}
</script>