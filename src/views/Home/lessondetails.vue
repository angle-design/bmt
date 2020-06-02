<!--  -->
<template>
  <div class="content">
    <div class="details_top">
      <img
        src="https://zgnstatic.oss-cn-beijing.aliyuncs.com/zgnimage/20200519/f8104b454aac5c2862d0b6fa43a09e72.jpg"
      />
      <p>
        <span>
          课程少儿英语提高班
          <span>￥<font>188</font></span>
        </span>
        <i class="fa fa-star-o"></i>
      </p>
    </div>
    <div class="details_con">
      <div>
        <h3>适用对象</h3>
        <p>中小学生</p>
      </div>
      <div>
        <h3>课程特色</h3>
        <p>微商微信商学院导师讲师课程表讲课海报宣传介绍图 朋友圈封面-淘宝网</p>
      </div>
      <div>
        <h3>课程简介</h3>
        <p>微商微信商学院导师讲师课程表讲课海报宣传介绍图 朋友圈封面-淘宝网</p>
      </div>
    </div>
    <div class="fix_bottom">
        <button>立即注册</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {},
  components: {}
};
</script>

<style lang='less' scoped>
.content {
  flex: 1;
  overflow: auto;
  margin-bottom: 1.2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 0.2rem;
  overflow-x: hidden;
  .details_top {
    border-bottom: 0.18rem solid #f8f8f8;
    img {
      height: 3.8rem;
      width: 100%;
    }
    p {
      display: flex;
      justify-content: space-between;
      padding: 0.2rem 0.3rem;
      font-size: 0.3rem;
      color: #333;
      align-items: center;
      span {
        span {
          margin-top: 0.1rem;
          display: block;
          color: #ff610f;
          font-size: 0.24rem;
          font {
            font-size: 0.4rem;
          }
        }
      }
      i {
        color: #9a9a9a;
        font-size: 0.4rem;
      }
    }
  }
  .details_con{
    margin:0 0.3rem 0;
    div{
      margin-top:0.3rem;
    h3{
      padding-left:0.2rem;
      font-size:0.28rem;
      color:#333;
      position: relative;
      font-weight:600;
      &:after{
        content:'';
        position: absolute;
        left:0;
        top:50%;
        margin-top:-0.09rem;
        width:0.06rem;
        height:0.17rem;
        background:#ffbc00;
        border-radius:0.3rem;
      }
    }
    p{
      font-size:0.28rem;
      color:#666666;
      padding:0.1rem 0.2rem 0;
    }
    }
  }
  .fix_bottom{
    position: fixed;
    bottom:0;
    left:0;
    height:1.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width:100%;
    box-shadow: 0.03rem 0 0.13rem rgba(41,41,41,0.15);
    button{
      width:6.3rem;
      height:0.9rem;
      border-radius:0.6rem;
      background:#36b936;
      color:#fff;
    }
  }
}
</style>
