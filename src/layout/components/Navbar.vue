<template>
  <nav
    class="navbar navbar-main"
    style="
      transition: opacity 0.3s ease-out 0s, transform 0.3s ease-out 0s;
      opacity: 1;
      transform: translateY(0px);
    "
  >
    <div class="container navbar-container">
      <div class="navbar-brand justify-content-center">
        <a class="navbar-item navbar-logo" href="/"
          ><img src="@/assets/logo.png" alt="Hexo" height="28"
        /></a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" active-class="is-active" :to="{path:'/' + router + '/articles'}">主页</router-link>
          <router-link class="navbar-item" active-class="is-active" :to="{path:'/' + router + '/archives'}">归档</router-link>
          <router-link class="navbar-item" active-class="is-active" :to="{path:'/' + router + '/categories'}">分类</router-link>
          <router-link class="navbar-item" active-class="is-active" :to="{path:'/' + router + '/tags'}">标签</router-link>
          <router-link class="navbar-item" active-class="is-active" :to="{path:'/' + router + '/about'}">关于我</router-link>
        </div>
        <div class="navbar-end">
            <a class="navbar-item search" title="搜索" href="javascript:;" @click="openSearchBox">
              <i class="fa fa-search"></i
          ></a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  name:"Navbar",
  methods:{
    openSearchBox() {
      this.$store.state.searchBoxOpen = true
    }
  },
  computed:{
    router() {
      return this.$route.params.router
    }
  }
};
</script>

