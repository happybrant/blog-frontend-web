<template>
  <div
    class="card widget"
    data-type="tags"
    style="
      transition: opacity 0.3s ease-out 0s, transform 0.3s ease-out 0s;
      opacity: 1;
      transform-origin: center top;
    "
  >
    <div class="card-content">
      <div class="menu">
        <h3 class="menu-label">标签</h3>
        <div class="field is-grouped is-grouped-multiline">
          <div class="control" v-for="(item,index) in tags" :key="index">
            <router-link :to="{path:'/' + router + '/tags/' + index}" class="tags has-addons">
              <span class="tag">{{index}}</span><span class="tag">{{item}}</span>
            </router-link>
          </div>   
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Tag',
  props: ['tags'],
  computed:{
    router() {
      return this.$route.params.router
    }
  }
};
</script>
