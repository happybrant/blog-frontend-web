<template>
  <div class="is-3-column">
    <!--头部导航栏-->
    <Navbar />
    <section class="section" style="transition: opacity 0.3s ease-out 0s, transform 0.3s ease-out 0s; opacity: 1;">
      <div class="container">
        <div class="columns">
          <div class="column column-left is-4-tablet is-4-desktop is-3-widescreen  order-1">
            <!-- 个人简介 -->
            <Profile :setting="setting" :articleCount="indexData.articleCount" :categoryCount="indexData.categoryCount" :tagCount="indexData.tagCount" />
            <!--! 链接-->
            <Link v-if="setting.link == 1"/>
            <!-- 按月份归档 -->
            <Archive v-if="setting.archive == 1" :archives="indexData.articleMap" />
            <!-- 分类 -->
            <Category v-if="setting.category == 1"  :categories="indexData.categories" />
            <!-- 自适应，窄屏显示 -->
            <div class="column-right-shadow is-hidden-widescreen">
              <!-- 近期发布 -->
              <RecentPost v-if="setting.recentPost == 1" :recentPosts="indexData.recentPosts" />
              <!-- 标签 -->
              <Tag v-if="setting.tag == 1" :tags="indexData.tagMap" />
            </div>
          </div>
          <router-view :key="key" />
          <div class="column column-right is-4-tablet is-4-desktop is-3-widescreen is-hidden-touch is-hidden-desktop-only order-3">
              <!-- 近期发布 -->
              <RecentPost v-if="setting.recentPost == 1" :recentPosts="indexData.recentPosts" />
              <!-- 标签 -->
              <Tag v-if="setting.tag == 1" :tags="indexData.tagMap" />
          </div>
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
import { Navbar, Footer,Profile,Link,Archive,Category,Tag,RecentPost  } from './components'
import BaseSearchCard from '@/components/BaseSearchCard'
export default {
  name: 'Layout',
  components: {
    Navbar,
    Footer,
    Profile,
    Link,
    Archive,
    Category,
    Tag,
    RecentPost,
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
        _this.$store.state.categories = _this.indexData.categories
        _this.$store.state.tags = _this.indexData.tagMap
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
