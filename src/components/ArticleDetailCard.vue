<template>
  <div class="card" style="transition: opacity 0.3s ease-out 0s, transform 0.3s ease-out 0s; opacity: 1; transform-origin: center top;">
    <div v-if="article.coverUrl" class="card-image">
      <span class="image is-7by3">
        <img class="fill"  :src="article.coverUrl" alt="Getting Started with Icarus">
      </span>
    </div>
    <article class="card-content article" role="article">
      <div class="article-meta is-size-7 is-uppercase level is-mobile">
        <div class="level-left">
          <span class="level-item">更新于&nbsp;
            <time :datetime="article.lastUpdateTime" :title="article.lastUpdateTime">{{parseTime(article.lastUpdateTime)}}</time>
          </span>
          <span class="level-item">{{redaTime}} 分钟读完(大约{{wordsCount}}个字)</span>
          </div>
      </div>
      <h1 class="title is-3 is-size-4-mobile">{{article.title}}</h1>
      <article class="message message-immersive is-primary" v-if="article.description">
        <div class="message-body">
          <i class="fa fa-globe-asia mr-2"></i>{{article.description}}
        </div>
      </article>
      <div class="content" ref="content" v-html="article.content">
      </div>
      <div v-if="article.tagNames != null && article.tagNames.length > 0" class="article-tags is-size-7 mb-4">
        <span class="mr-2">#</span>
        <router-link v-for="(item, index) in article.tagNames" :key="index" :to="{path:'/' + router + '/tags/' + item}" class="link-muted mr-2" rel="tag">
            {{item}}
        </router-link>
      </div>
    </article>
  </div>
</template>
<script>
import { parseTime } from '@/utils'
export default {
  name:'ArticleDetailCard',
  props:['article'],
  methods: {
    parseTime(createTime) {
      return parseTime(createTime, '{y}-{m}-{d}')
    },
  },
  computed:{
    wordsCount() {
    if (this.article.content == null || this.article.content == '') return 0;
      return this.article.content.replace(/<[^>]+>|\s/g,"").length;
    },
    redaTime() {
      return Math.ceil(this.wordsCount/400)
    },
    router() {
      return this.$route.params.router
    } 
  }
}
</script>