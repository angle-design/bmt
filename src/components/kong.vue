<template>
  <div class="kong" v-if="flag">
      <img src="../assets/kong.png" />
      <p>暂无数据</p>
  </div>
</template>
<script>
export default {
  name: "kong",
  props: {
    flag: Boolean
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
  color:#999
}
</style>