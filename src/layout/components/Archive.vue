<template>
  <div
    class="card widget"
    data-type="archives"
    style="
      transition: opacity 0.3s ease-out 0s, transform 0.3s ease-out 0s;
      opacity: 1;
      transform-origin: center top;
    "
  >
    <div class="card-content">
      <div class="menu">
        <h3 class="menu-label">归档</h3>
        <ul class="menu-list">
          <li v-for="(item,index) in archives" :key=index>
            <router-link :to="{path:'/' + router + '/archives/' + index.split('-')[0] + '/' + index.split('-')[1]}" class="level is-mobile">
              <span class="level-start">
                <span class="level-item">{{transferDate(index)}}</span>
              </span>
              <span class="level-end">
                <span class="level-item tag">{{item}}</span>
              </span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { int2chineseNum } from '@/utils'
export default {
  name: 'Archive',
  props: ['archives'],
  methods:{
    transferDate(date) {
      return int2chineseNum(date.split('-')[1]) + "月 " + date.split('-')[0]
    }
  },
  computed:{
    router() {
      return this.$route.params.router
    }
  }
};
</script>
