<template>
  <div id="main">
    <!--有一些页面组件需要缓存有一些不需要 此时需要做区分-->



      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    <!--下面是不缓存的-->
    <transition name="fade">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
</transition>
  </div>
</template>
<script>

</script>
<style>
.fade-enter {
  opacity:0;
}
.fade-leave{
  opacity:1;
}
.fade-enter-active{
  transition:opacity .2s;
}
.fade-leave-active{
  opacity:0;
  transition:opacity .2s;
}
</style>
