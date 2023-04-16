<template>
  <nav class="pagination" role="navigation" aria-label="pagination" style="transition: opacity 0.3s ease-out 0s, transform 0.3s ease-out 0s; opacity: 1; transform-origin: center top;">
    <div class="pagination-previous" v-if="pager.current != 1"><a @click="getPagerData(pager.current - 1)">前一页</a></div>
    <ul class="pagination-list is-hidden-mobile">
      <li><a :class="linkClass(1)"  @click="getPagerData(1)">1</a></li>
      <li v-if="pager.pages > 7 && pager.current > 4"><span class="pagination-ellipsis has-text-black-ter">…</span></li>
      <li v-for="(item,index) in pageLength" :key=index ><a :class="linkClass(index + startIndex)" @click="getPagerData(index + startIndex)" >{{index + startIndex}}</a></li>
      <li v-if="pager.pages > 7 && pager.current < pager.pages - 3"><span class="pagination-ellipsis has-text-black-ter">…</span></li>
      <li v-if="pager.pages > 1"><a :class="linkClass(pager.pages)" @click="getPagerData(pager.pages)">{{pager.pages}}</a></li>
    </ul>
    <div class="pagination-next" v-if="pager.current != pager.pages"><a @click="getPagerData(pager.current + 1)">后一页</a></div>
  </nav>
</template>
<script>
export default {
  name: 'Pagination',
  props: ['pager','getPagerData'],
  computed: {
    startIndex() {
      if (this.pager.pages <= 7 || this.pager.current <= 4) {
        return 2
      } else if (this.pager.current > this.pager.pages - 3){
        return this.pager.pages - 5
      }
      else {
        return this.pager.current - 2
      }
    },
    pageLength() {
      if(this.pager && this.pager.pages > 2) {
        return this.pager.pages >= 7 ? 5 : this.pager.pages - 2
      }
      return 0
    },
    router() {
      return this.$route.params.router
    }
  },
  methods: {
    linkClass(index) {
      if(index == this.pager.current) {
        return 'pagination-link is-current'
      }
      else {
        return 'pagination-link'
      }
    }
  }
}
</script>