<template>
  <div class="kong" v-if="flag">
      <img src="../assets/kong.png" />
      <p>{{msg}}</p>
  </div>
</template>
<script>
export default {
  name: "kong",
  props: {
    flag: Boolean,
      msg: {
          type: String,
          default: "暂无数据"
      },
  }
};
</script>
<style scoped>
.kong {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  color:#999;
  font-size:0.26rem;
}
.kong img{
  width:3.87rem;
}
</style>