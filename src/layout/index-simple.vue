<template>
  <div class="is-2-column">
    <!--头部导航栏-->
    <Navbar />
    <section class="section" style="transition: opacity 0.3s ease-out 0s, transform 0.3s ease-out 0s; opacity: 1;">
      <div class="container">
        <!-- 简化版Layout，目前只用作文章详情展示 -->
        <div class="columns">
          <div class="column column-left is-4-tablet is-4-desktop is-4-widescreen  order-1 is-sticky">
            <!-- 个人简介 -->
            <Profile 
              :setting="setting" 
              :articleCount="indexData.articleCount" 
              :categoryCount="indexData.categoryCount" 
              :tagCount="indexData.tagCount"              
            />
            <!-- 文章目录 -->
            <Catalogue 
              :catalogues="$store.state.catalogues" 
              v-if="$store.state.catalogues != null && $store.state.catalogues.length > 0"               
            />
            <!-- 分类 -->
            <Category v-if="setting.category == 1"  :categories="indexData.categories" />
            <!-- 标签 -->
            <Tag v-if="setting.tag == 1" :tags="indexData.tagMap" />
          </div>
          <router-view :key="key" />
        </div>
      </div>
    </section>
    <!-- 页脚 -->
    <Footer />
    <!-- 搜索框 -->
    <BaseSearchCard />
  </div>
</template>

<script>
import { Navbar, Footer, Profile, Category, Tag, Catalogue } from './components'
import BaseSearchCard from '@/components/BaseSearchCard'
export default {
  name: 'Layout',
  components: {
    Navbar,
    Footer,
    Profile,
    Category,
    Tag,
    Catalogue,
    BaseSearchCard
  },
  data() {
    return {
      indexData:'',
      setting:''
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  methods: {
    getIndexData() {
      const _this = this;
      _this.$store.dispatch('getIndexData', {router:_this.$route.params.router}).then(function(response){
        if(response == null) return
        _this.indexData = response
        _this.setting = _this.indexData.setting
      })
    }
  },
  mounted() {
    this.$store.state.currentRouter = this.$route.params.router
    this.getIndexData()
  }
}
</script>
