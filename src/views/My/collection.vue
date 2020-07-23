<template>
  <div class="collection">
    <div class="collect_top">
      <router-link tag="span" to="/my/collection/jigou">机构</router-link>
      <router-link tag="span" to="/my/collection/lesson">课程</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import lessonitem from "@/components/Home/Lessonitem.vue";
import mechanitem from "@/components/Home/Mechanism.vue";
export default {
  name: "collection",
  data() {
    return {
      active: 1,
      list: []
    };
  },
  mounted() {},
  methods: {},
  components: {}
};
</script>

<style lang="less" scoped>
.collection {
  flex: 1;
  overflow: auto;
  // position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  // width: 100%;
  z-index: 2;
  // padding-top: 1rem;
  height: 100%;
  box-sizing: border-box;
  overflow-x: hidden;

  .collect_top {
    display: flex;
    align-items: center;
    padding: 0 0.4rem 0;
    color: #efeeee;
    position: absolute;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    background: #fff;
    box-sizing: border-box;
    span {
      display: flex;
      justify-content: center;
      flex: 1;
      position: relative;
      font-size: 0.3rem;
      color: #999999;
      padding: 0.2rem 0.4rem 0.3rem;
      &.router-link-active {
        color: #36b936;
        &.router-link-active:after {
          content: "";
          position: absolute;
          width: 0.3rem;
          height: 0.08rem;
          // background:#efeeee;
          background: #36b936;
          bottom: 0.1rem;
          border-radius: 0.3rem;
          left: 50%;
          margin-left: -0.15rem;
        }
      }
    }
  }
}
</style>
