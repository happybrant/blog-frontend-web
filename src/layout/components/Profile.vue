<template>
  <div class="card widget" data-type="profile" style="transition: opacity 0.3s ease-out 0s, transform 0.3s ease-out 0s; opacity: 1; transform-origin: center top;">
    <div class="card-content">
      <nav class="level">
        <div class="level-item has-text-centered flex-shrink-1">
          <div>
            <figure class="image is-128x128 mx-auto mb-2">
              <img class="avatar" :src="setting.avatarUrl" :alt="setting.name" onerror="this.src='@/assets/avatar.png';this.οnerrοr=null">
            </figure>
            <p class="title is-size-4 is-block" style="line-height:inherit;">{{setting.name}}</p>
            <p class="is-size-6 is-block">{{setting.title}}</p>
            <p class="is-size-6 is-flex justify-content-center">
              <i class="fa fa-map-marker mr-1" style="line-height:inherit" />
              <span>{{setting.location}}</span>
            </p>
          </div>
        </div>
      </nav>
      <nav class="level is-mobile">
        <div class="level-item has-text-centered is-marginless">
          <div>
            <p class="heading">文章</p>
              <router-link :to="{path:'/' + router + '/archives'}">
                <p class="title">{{articleCount}}</p>
              </router-link>
          </div>
        </div>
        <div class="level-item has-text-centered is-marginless">
          <div>
            <p class="heading">分类</p>
             <router-link :to="{path:'/' + router + '/categories'}">
              <p class="title">{{categoryCount}}</p>
            </router-link>
          </div>
        </div>
        <div class="level-item has-text-centered is-marginless">
          <div>
            <p class="heading">标签</p>
             <router-link :to="{path:'/' + router + '/tags'}">
              <p class="title">{{tagCount}}</p>
            </router-link>
          </div>
        </div>
      </nav>
      <div class="level"><a class="level-item button is-primary is-rounded" href="https://github.com/happybrant" target="_blank" rel="noopener">关注我</a></div>
      <div class="level is-mobile is-multiline">
        <a class="level-item button is-transparent is-marginless" target="_blank" rel="noopener" title="Github" href="https://github.com/happybrant">
         <i class="fa fa-github"></i>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Profile',
  props: ['articleCount', 'categoryCount', 'tagCount', 'setting'],
  computed:{
    router() {
      return this.$route.params.router
    }
  }
}
</script>
<style scoped>
</style>