<template>
  <div class="card widget" id="toc" data-type="toc" style="transition: opacity 0.3s ease-out 0s, transform 0.3s ease-out 0s; opacity: 1; transform-origin: center top;">
    <div class="card-content">
      <div class="menu" id="catalogue">
        <h3 class="menu-label">目录</h3>
        <MenuList  :catalogues="catalogues"/>
      </div>
    </div>
  </div>
</template>

<script>
import MenuList from  './MenuList'
export default {
  name:'Catalogue',
  props:['catalogues'],
  components:{MenuList}
}
</script>
<style scoped>
    #toc .menu-list>li>a.is-active+.menu-list {
      display: block;
    }

    #toc .menu-list>li>a+.menu-list {
      display: none;
    }
</style>