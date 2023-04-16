<template>
  <div class="card widget" data-type="categories" style="transition: opacity 0.3s ease-out 0s, transform 0.3s ease-out 0s; opacity: 1; transform-origin: center top;">
    <div class="card-content">
      <div class="menu">
        <h3 class="menu-label">分类</h3>
        <ul class="menu-list">
          <li v-for="item in categories" :key="item.id">
            <router-link :to="{path:'/' + router + '/categories/' + item.name}" class="level is-mobile">
              <span class="level-start"><span class="level-item">{{item.name}}</span></span>
              <span class="level-end"><span class="level-item tag">{{item.count}}</span></span>
            </router-link>
            <ul>
              <li v-for="childItem in item.children" :key="childItem.id">
                <router-link :to="{path:'/' + router + '/categories/' + item.name + '/' + childItem.name}" class="level is-mobile" v-if="childItem.count > 0">
                  <span class="level-start"><span class="level-item">{{childItem.name}}</span></span>
                  <span class="level-end"><span class="level-item tag">{{childItem.count}}</span></span>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Category',
  props:['categories'],
  computed:{
    router() {
      return this.$route.params.router
    }
  }
}
</script>