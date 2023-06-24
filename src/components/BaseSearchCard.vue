<template>
  <div :class="searchBoxStyle">
    <div class="searchbox-container">
      <div class="searchbox-header">
        <div class="searchbox-input-container"><input @keypress="searchArticle" class="searchbox-input" type="text" v-model="$store.state.keyword" placeholder="想要查找什么..."></div>
        <a class="searchbox-close" href="javascript:;" @click="closeSearchBox">×</a>
      </div>
      <div class="searchbox-body">
        <section class="searchbox-result-section" v-if="$store.state.searchArticles != null && $store.state.searchArticles.length > 0">
          <header>文章</header>
          <router-link v-for="(item, index) in $store.state.searchArticles" :key="index" class="searchbox-result-item" :to="{path:'/' + router + '/article/' + item.id}">
            <span class="searchbox-result-icon">
              <i class="fa fa-file"></i>
            </span>
            <span class="searchbox-result-content">
              <span class="searchbox-result-title"  v-html="item.title">
              </span>
              <span class="searchbox-result-preview" v-html="item.content"></span>
            </span>
          </router-link> 
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name:'BaseSearchCard',
  computed:{
    ...mapState(['searchBoxOpen']),
    searchBoxStyle() {
      return this.searchBoxOpen?'searchbox show':'searchbox'
    },
    router() {
      return this.$route.params.router
    }
  },

  methods:{
    closeSearchBox() {
      this.$store.state.searchBoxOpen = false
      this.$store.state.keyword = ""
      this.$store.state.searchArticles = []
    },
    searchArticle() {
      const _this = this
      var parameters = new Object()
      parameters.keyword = _this.$store.state.keyword
      parameters.router = this.$route.params.router
      _this.$store
          .dispatch('searchArticles', parameters)
          .then(function (response) {
            if(response == null) return
            _this.$store.state.searchArticles = response
          })
    }
  },
  watch:{
    // 监听搜索框是否打开
    searchBoxOpen(val) {
      if(val) {
        this.searchArticle()
      }
    }
  }
}
</script>

<style>
</style>