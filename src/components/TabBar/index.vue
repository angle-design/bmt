<template>
  <footer id="footer">
    <ul>
      <router-link tag="li" to="/home">首页</router-link>
      <router-link tag="li" to="/lesson">课程头条</router-link>
      <router-link tag="li" to="/ask">问吧</router-link>
      <router-link tag="li" to="/mechanism">机构入驻</router-link>
      <router-link tag="li" to="/my">学生留言</router-link>
    </ul>

  </footer>
</template>

<script>
export default {
  name: "Tab"
};
</script>

<style scoped lang="less">
#footer {
  width:7.5rem;
  height: 1.2rem;
  background: #fff;
  position: fixed;
  bottom: 0;
  left:50%;
  margin-left:-3.75rem;
  color: #333;
  z-index:14;
  line-height: 1rem;
  font-size: 0.24rem;
  box-shadow:0.05rem  0 0.16rem rgba(0,0,0,0.13);
  ul {
    display: flex;
    text-align: center;
    align-items: center;
    li {
      flex: 1;
      padding-top: 0.35rem;
      background: url(../../assets/tab_01.png) no-repeat center 0.25rem;
      background-size: 0.32rem 0.34rem;
      &:nth-child(2) {
        background: url(../../assets/tab_02.png) no-repeat center 0.25rem;
          background-size: 0.32rem 0.34rem;
        &.active,
        &.router-link-active {
          background: url(../../assets/tab_02cur.png) no-repeat center 0.25rem;
              background-size: 0.32rem 0.34rem;
        }
      }
      &:nth-child(3) {
        background: url(../../assets/tab_03.png) no-repeat center 0.25rem;
             background-size: 0.32rem 0.34rem;
        &.active,
        &.router-link-active {
          background: url(../../assets/tab_03cur.png) no-repeat center 0.25rem;
              background-size: 0.32rem 0.34rem;
        }
      }
      &:nth-child(4) {
        background: url(../../assets/tab_04.png) no-repeat center 0.25rem;
              background-size: 0.32rem 0.34rem;
        &.active,
        &.router-link-active {
          background: url(../../assets/tab_04cur.png) no-repeat center 0.25rem;
         background-size: 0.32rem 0.34rem;
        }
      }
      &:nth-child(5) {
        background: url(../../assets/tab_05.png) no-repeat center 0.25rem;
          background-size: 0.32rem 0.34rem;
        &.active,
        &.router-link-active {
          background: url(../../assets/tab_05cur.png) no-repeat center 0.25rem;
          background-size: 0.32rem 0.34rem;
        }
      }
      &.active,
      &.router-link-active {
        background: url(../../assets/tab_01cur.png) no-repeat center 0.25rem;
         background-size: 0.36rem 0.38rem;
        color: #369836;
      }
    }
  }
}
</style>
