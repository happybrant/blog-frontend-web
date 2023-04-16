<template>
  <div class="card" style="
      transition: opacity 0.3s ease-out 0s, transform 0.3s ease-out 0s;
      opacity: 1;
      transform-origin: center top;
    ">
    <div class="card-content">
      <h3 class="tag is-primary">{{date}}</h3>
      <div class="timeline">
        <article class="media" v-for="item in articles" :key="item.id">
          <figure class="media-left" v-if="item.coverUrl">
            <router-link :to="{path: '/' + router + '/article/' + item.id}" class="image">
              <img  :src="item.coverUrl" :alt="item.title" />
            </router-link> 
          </figure>
          <div class="media-content">
            <p class="date">
              <time :datetime="item.createTime">{{parseTime(item.createTime)}}</time>
            </p>
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
  </div>
</template>
<script>
import { parseTime } from '@/utils'
export default {
  name: 'ArchiveCard',
  props: ['date', 'articles'],
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
  computed: {
    router() {
      return this.$route.params.router
    }
  }
}
</script>
