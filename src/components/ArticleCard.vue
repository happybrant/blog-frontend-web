<template lang="">
  <div class="card" style="transition: opacity 0.3s ease-out 0s, transform 0.3s ease-out 0s; opacity: 1; transform-origin: center top;">
    <div v-if="article.coverUrl" class="card-image">
      <a class="image is-7by3" href="/hexo-theme-icarus/uncategorized/getting-started-with-icarus/">
        <img  class="fill" :src="article.coverUrl" alt="Getting Started with Icarus">
      </a>
    </div>
    <article class="card-content article" role="article">
      <div class="article-meta is-size-7 is-uppercase level is-mobile">
        <div class="level-left">
          <span class="level-item">
            <time :datetime="article.createTime" :title="article.createTime">{{parseTime(article.createTime)}}</time>&nbsp;发表
          </span>
          <span class="level-item">
            <router-link :to="{path: '/' + router + '/categories/' + rootCategory}" class="link-muted">
              {{rootCategory}}
            </router-link> 
            <span v-if="childCategory != ''">&nbsp;/&nbsp;</span>
            <router-link v-if="childCategory != ''" :to="{path:'/' + router + '/categories/' + rootCategory + '/' + childCategory}" class="link-muted">
              {{childCategory}}
            </router-link> 
          </span>
          <span class="level-item">{{redaTime}} 分钟读完(大约{{wordsCount}}个字)</span></div>
      </div>
      <h1 class="title is-3 is-size-4-mobile">
        <router-link :to="{path:'/' + router + '/article/' + article.id}" class="link-muted">
          {{article.title}}
        </router-link> 
      </h1>
      <div class="content">
        {{article.description}}
      </div>
      <router-link :to="{path:'/' + router + '/article/' + article.id}" class="article-more button is-small is-size-7">
        查看全文
      </router-link> 
    </article>
  </div>
</template>
<script>
import { parseTime } from '@/utils'
export default {
  name: 'ArticleCard',
  props: ['article'],
  methods: {
    parseTime(createTime) {
      return parseTime(createTime, '{y}-{m}-{d}')
    },
  },
  computed: {
    rootCategory() {
      return this.article.path.split('/')[1]
    },
    childCategory() {
      if (this.article.path.split('/').length > 2) {
        return this.article.path.split('/')[2]
      }
      return ''
    },
    wordsCount() {
      if (this.article.content == null || this.article.content == '') return 0
      return this.article.content.replace(/<[^>]+>|\s/g, '').length
    },
    redaTime() {
      return Math.ceil(this.wordsCount / 400)
    },
    router() {
      return this.$route.params.router
    }
  },
}
</script>