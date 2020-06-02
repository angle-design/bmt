<template>
  <div id="main">
    <!--有一些页面组件需要缓存有一些不需要 此时需要做区分-->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    <!--下面是不缓存的-->
      <router-view v-if="!$route.meta.keepAlive"></router-view>
     
  </div>
</template>
<script>

</script>
<style>

</style>
