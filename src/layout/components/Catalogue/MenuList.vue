<template>
  <ul class="menu-list">
  <li v-for="(item, index) in catalogues" :key="index">
    <a class="level is-mobile" href="javascript:;" data-href="#color" @click="goTotop(item.id)">
      <span class="level-left">
        <span class="level-item">{{item.name}}</span>
      </span>
    </a>
    <MenuList v-if="item.children != null && item.children.length > 0" :catalogues="item.children" />
  </li>
</ul>
</template>

<script>
export default {
  name:'MenuList',
  props:['catalogues'],
  methods: {
     goTotop(id){
       var _targetTop = document.getElementById(id).offsetTop;//获取位置
       window.scroll({ top: _targetTop + 88, behavior: 'smooth' })
    }
  }
}
</script>

<style>

</style>