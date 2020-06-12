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
    export default {
        name: "",
        created() {
            let loading = document.getElementById('app');
            if(loading !=null){
                document.getElementById('app').style.display = 'block';
                document.getElementById('appLoading').style.display = 'none';
            }
        }
    }
</script>
<style>
.fade-enter {
  opacity: 0;
}
.fade-leave {
  opacity: 1;
}
.fade-enter-active {
  transition: opacity 0.2s;
}
.fade-leave-active {
  opacity: 0;
  transition: opacity 0.2s;
}
</style>
