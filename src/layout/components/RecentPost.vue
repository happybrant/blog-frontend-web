<template>
  <div class="card widget" data-type="recent-posts" style="transition: opacity 0.3s ease-out 0s, transform 0.3s ease-out 0s; opacity: 1; transform-origin: center top;">
    <div class="card-content">
      <h3 class="menu-label">最新文章</h3>
      <article class="media" v-for="item in recentPosts" :key="item.id">
        <figure v-if="item.coverUrl" class="media-left">
          <router-link :to="{path:'/' + router + '/article/' + item.id}" class="image">
            <img  :src="item.coverUrl" :alt="item.title" />
          </router-link> 
        </figure>
        <div class="media-content">
          <p class="date"><time :datetime="item.createTime">{{parseTime(item.createTime)}}</time></p>
          <p class="title">  
            <router-link :to="{path:'/' + router + '/article/' + item.id}">
                {{item.title}}
            </router-link> 
          </p>
          <p class="categories">
            <router-link :to="{path:'/' + router + '/categories/' + rootCategory(item)}">
              {{rootCategory(item)}}
            </router-link>
            <span v-if="childCategory(item) != ''">/</span>
            <router-link v-if="childCategory(item) != ''" :to="{path:'/' + router + '/categories/' + rootCategory(item) + '/' + childCategory(item)}">
              {{childCategory(item)}}
            </router-link>
          </p>
        </div>
      </article>
    </div>
  </div>
</template>
<script>
import { parseTime } from '@/utils'
export default {
  name: 'RecentPost',
  props: ['recentPosts'],
  methods: {
    parseTime(createTime) {
      return parseTime(createTime, '{y}-{m}-{d}')
    },
    rootCategory(article) {
      return article.path.split('/')[1]
    },
    childCategory(article) {
      if (article.path.split('/').length > 2) {
        return article.path.split('/')[2]
      }
      return ''
    },
  },
  computed:{
    router() {
      return this.$route.params.router
    }
  }
}
</script>