<template>
  <div class="card" style="
      transition: opacity 0.3s ease-out 0s, transform 0.3s ease-out 0s;
      opacity: 1;
      transform-origin: center top;
    ">
    <div class="card-content">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <router-link :to="{path:'/' + router + '/' + type.path}" class="level is-mobile">{{type.name}}</router-link>
          </li>
          <!-- 如果有两级，则第一级可跳转，否则不可跳转 -->
          <li v-if="secondParam != undefined || secondParam != null">
            <router-link :to="{path: '/' + router + '/' + type.path + '/' + firstParam}" class="level is-mobile">{{firstParam}}
            </router-link>
          </li>
          <li v-else class="is-active">
            <a href="#" aria-current="page">{{firstParam}}</a>
          </li>
          <li class="is-active" v-if="secondParam != undefined || secondParam != null">
            <a href="#" aria-current="page">{{secondParam}}</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BreadcrumbCard',
  props: ['firstParam', 'secondParam', 'type'],
  computed: {
    router() {
      return this.$route.params.router
    }
  }
}
</script>
