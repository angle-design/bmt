<template>
  <div class="setup">
        <p class="head">
          <img src="../../assets/feng.jpg">
          <span>更换头像</span>
        </p>
        <p>
          <font>用户名</font>
          <input type="text">
          <span>该账户已存在</span>
        </p>
        <p>
          <font>性&nbsp;&nbsp;&nbsp;别</font>
          <input type="text">
        </p>
        <p>
          <font>城&nbsp;&nbsp;&nbsp;市</font>
          <input type="text">
        </p>
        <button>退出账户</button>
</div>
</template>

<script>
export default {
  name: "setup",
  data() {
    return {
    
    };
  }
};
</script>

<style lang="less" scoped>
.setup{
    flex: 1;
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 1.2rem;
  background: #fff;
  width: 100%;
  z-index:2;
  font-size:0.28rem;
  p{
     display: flex;
     align-items: center;
     justify-content: center;
     margin-bottom:0.4rem;
     position: relative;
     font{
       width:1rem;
     }
     input{
       padding:0.15rem 0.2rem;
       border-bottom:0.02rem solid #e7e7e7;
       width:5rem;
     }
     span{
       position: absolute;
       color:#ff0000;
       right:0.8rem;
       top:0rem;
     }
  }
  .head{
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top:0.65rem;
    img{
      width:1.16rem;
      height:1.16rem;
      border-radius:50%;
    }
    span{
      color:#36b936;
      padding:0.1rem 0.2rem;
      position:static
    }
  }
   button{
     width:6.3rem;
     height:0.9rem;
     border:0.02rem solid #36b936;
     border-radius:0.8rem;
     font-size:0.3rem;
     color:#36b936;
     position: absolute;
     bottom:1rem;
     left:50%;
     margin-left:-3.15rem;
   }
}
</style>