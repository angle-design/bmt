<!--  -->
<template>
  <div class="ask_body">
    <div class="ask_item" @tap="$emit('toDeatils',item.id)" v-for="(item,index) in list" :key="index">
      <div class="ask_img">
        <img :src="item.h_image" />
        <span v-if="item.ishot==2">置顶</span>
        <div>
          <dl v-if="item.uinfo">
            <dt>
              <img v-if="item.uinfo.a_image" :src="item.uinfo.a_image" />
              <img v-else src="../../assets/mohead.png" />
              <font></font>
            </dt>
            <dd>{{item.uinfo.a_uname}}</dd>
          </dl>
          <font>{{item.tagname.name}}</font>
        </div>
      </div>
      <p>{{item.h_title}},{{item.h_title2}}</p>
      <div class="ask_text">
        <font v-if="item.isnow==1">提问进行时</font>
        <font v-if="item.isnow==2" style="color:#999;">提问已关闭</font>
        <p>
          <span>
            <i></i>
            <font>{{item.zan?item.zan:0}}</font>
          </span>
          <span>
            <i></i>
            <font>{{item.huifu?item.huifu:0}}</font>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "new",
  props: {
    list: Array
  }
};
</script>
<style lang='less' scoped>
  .ask_body {
    margin: 0.2rem 0.2rem;
    .ask_item {
      background: #f8f8f8;
      border: 0.02rem solid #eeeeee;
      border-radius: 0 0 0.2rem 0.2rem;
      padding-bottom: 0.1rem;
      margin-bottom: 0.16rem;
      .ask_img {
        width: 7.1rem;
        height: 2.48rem;
        position: relative;
        overflow: hidden;
        span {
          font-size: 0.2rem;
          position: absolute;
          top: 0.1rem;
          left: 0.1rem;
          background: #e60012;
          color: #fff;
          border-radius: 0.15rem;
          padding: 0.05rem 0.2rem;
        }
        div {
          height: 1.1rem;
          width: 100%;
          left: 0;
          position: absolute;
          bottom: 0;
          display: flex;
          justify-content: space-between;
          padding: 0 0.1rem;
          box-sizing: border-box;
          align-items: center;
          dl {
            display: flex;
            position: relative;
            z-index: 1;
            align-items: center;
            dt {
              position: relative;
              img {
                width: 0.94rem;
                height: 0.94rem;
                border-radius: 50%;
                background: #fff;
              }
              font {
                position: absolute;
                background: #f1a91e;
                border-radius: 50%;
                display: flex;
                width: 0.28rem;
                height: 0.28rem;
                right: -0.1rem;
                bottom: 0.1rem;
              }
            }
            dd {
              padding-top: 0.45rem;
              font-size: 0.28rem;
              color: #ffffff;
              margin-left: 0.25rem;
            }
          }
          & > font {
            margin-top: 0.45rem;
            font-size: 0.2rem;
            position: relative;
            z-index: 1;
            padding: 0.01rem 0.2rem;
            color: #fff;
            border: 0.02rem solid #fff;
            border-radius: 0.1rem;
          }
          &:after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 0.65rem;
            background: rgba(0, 0, 0, 0.6);
            z-index: 0;
          }
        }
      }
      .ask_text {
        height: 0.6rem;
        display: flex;
        justify-content: space-between;
        padding: 0 0 0 0.3rem;
        font-size: 0.26rem;
        align-items: center;
        & > font {
          color: #369836;
        }
        p {
          display: flex;
          font-size: 0.24rem;
          color: #666666;
          span {
            margin-left: 0.3rem;
            display: flex;
            align-items: center;
            i {

              display: flex;
              width:0.36rem;
              height:0.26rem;
              background:url(http://bmdt.zgn365.com/Public/aa.png) no-repeat;
              background-position:0 -4.41rem;
              background-size:0.36rem auto;
              padding-right:0.05rem;
              &.active{
                background-position: 0 -4.73rem;
              }
            }
            &:nth-child(2){
              i{
                 background-position:0 -5.08rem;
              }
            }
          }
        }
      }
      p {
        font-size: 0.32rem;
        color: #333;
        text-align: center;
        padding: 0.1rem 00.3rem;
        line-height: 0.45rem;
        font-weight: bold;
      }
    }
  }
</style>
