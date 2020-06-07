<!--  -->
<template>
  <div ref="wrapper" class="swiperLeft">
    <ul class="cont" ref="cont">
      <li v-for="(item,index) in recommendList" :key="index" ref="lislide">
        <dl v-if="item.uinfo">
          <dt>
            <img v-if="item.uinfo.a_image" :src="item.uinfo.a_image" />
            <img v-else src="../../assets/feng.jpg" />
            <font></font>
          </dt>
          <dd>{{item.uinfo.a_uname}}</dd>
          <dd>{{item.uinfo.a_title}}</dd>
        </dl>
        <p>
          <span>
            <font>{{item.hinfo.qcount}}</font>
            <font>话题</font>
          </span>
          <span>
            <font>{{item.hinfo.qcount}}</font>
            <font>提问</font>
          </span>
          <span>
            <font>{{item.hinfo.acount}}</font>
            <font>回答</font>
          </span>
        </p>
        <button>问他</button>
      </li>
    </ul>
  </div>
</template>
<script>
import BScroll from "better-scroll";

export default {
  name: "swiperleft",
  data() {
    return {
      recommendList: [],
      len: 0
    };
  },
  watch: {
    recommendList: function() {
      this.$nextTick(function() {
        this.verScroll();
      });
    }
  },
  methods: {
    verScroll() {
      let width = this.len * this.$refs.lislide[0].clientWidth*1.1; // 动态计算出滚动区域的大小，前面已经说过了，产生滚动的原因是滚动区域宽度大于父盒子宽度
      this.$refs.cont.style.width = width + "px"; // 修改滚动区域的宽度
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            startX: 0, // 配置的详细信息请参考better-scroll的官方文档，这里不再赘述
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: "vertical"
          });
        } else {
          this.scroll.refresh(); //如果dom结构发生改变调用该方法
        }
      });
    },
    getTeachList() {
      this.axios.get("/api/api/Ask/Guser").then(res => {
        if (res.data.list) {
          this.recommendList = res.data.list;
          this.len = res.data.list.length;
          console.log(res.data.list)
        }
      });
    }
  },
  mounted() {
    this.getTeachList();
  }
};
</script>

<style lang='less' scoped>
.swiperLeft {
  ul {
    display: flex;
    flex-wrap: nowrap;
    padding: 0.1rem 0 0.2rem;
    li {
      width:3.5rem;
      box-shadow: 0 0 0.2rem rgba(74, 74, 74, 0.18);
      margin:0 0.15rem;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      padding: 0 0 0.2rem;
      font-size: 0.28rem;
      background: #f8f8f8;
      border-radius:0.1rem;
      // overflow: hidden;
      &:last-child {
      }
      dl {
        padding: 0.1rem 0 0.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: #fff;
        width: 100%;
        position: relative;
        &:after {
          content: "";
          position: absolute;
          bottom: 0;
          width: 84%;
          height: 0.02rem;
          left: 8%;
          background: #e7e7e7;
        }
        dt {
          position: relative;
          font {
            position: absolute;
            width: 0.28rem;
            height: 0.28rem;
            border-radius: 50%;
            right: -0.05rem;
            bottom: 0.05rem;
            background: #f1a91e;
          }
          img {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
          }
        }
        dd {
          &:nth-child(3) {
            color: #999;
            font-size: 0.22rem;
          }
        }
      }
      p {
        width: 100%;
        display: flex;
        height: 1rem;
        font-size: 0.22rem;
        align-items: center;
        padding: 0 0.2rem;
        span {
          display: flex;
          flex: 1;
          flex-direction: column;
          align-items: center;
          line-height: 0.35rem;
          font {
            color: #999;
          }
        }
      }
      button {
        width: 2.4rem;
        height: 0.56rem;
        background: #369836;
        border-radius: 0.1rem;
        color: #fff;
        font-size: 0.26rem;
        margin: 0 0.2rem;
      }
    }
  }
}
</style>



