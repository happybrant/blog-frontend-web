<template>
  <div class="column order-2 column-main is-8-tablet is-8-desktop is-8-widescreen">
    <ArticleDetailCard :article="article"  />
    <nav class="post-navigation mt-4 level is-mobile" style="transition: opacity 0.3s ease-out 0s, transform 0.3s ease-out 0s; opacity: 1; transform-origin: center top;">
      <div class="level-start" v-if="article.preArticle != null">
        <router-link :to="{path:'/' + router + '/article/' + article.preArticle.id}" class="article-nav-prev level level-item link-muted">
           <i class="level-item fa fa-chevron-left"></i>
          <span class="level-item">{{article.preArticle.title}}</span>
        </router-link> 
      </div>
      <div class="level-end" v-if="article.nextArticle != null">
        <router-link :to="{path:'/' + router + '/article/' + article.nextArticle.id}" class="article-nav-next level level-item link-muted">
          <span class="level-item">{{article.nextArticle.title}}</span>
          <i class="level-item fa fa-chevron-right"></i>
        </router-link> 
      </div>
    </nav>
  </div>
</template>
<script>
import ArticleDetailCard from '../components/ArticleDetailCard'
export default {
  components: {
    ArticleDetailCard,
  },
  props: ['router'],
  data() {
    return {
      article: {
        preArticle:null,
        nextArticle:null
      },
      catalogues: [],
    }
  },
  methods: {
    getArticleDetail() {
      const _this = this
      _this.$store
        .dispatch('getArticleDetail', _this.$route.params.id)
        .then(function (response) {
          if (response == null || response.data == null) {
             _this.$router.push('/404')
          }
          else {
            _this.article = response.data
          }
        })
    }
  },
  mounted() {
    // 有可能是从搜索页面跳转过来的,故关掉搜索页面,清空搜索框
    this.$store.state.searchBoxOpen = false
    this.$store.state.keyword = ""
    this.$store.state.searchArticles = []
    this.getArticleDetail()
  },
}
</script>