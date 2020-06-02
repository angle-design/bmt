<!--  -->
<template>
  <div ref="wrapper" class="swiperLeft">
    <ul class="cont" ref="cont">
      <li v-for="(item,index) in videolist" :key="index" ref="lislide">
            <p><img :src="item"><span><img src="../../assets/bo.png"></span></p>
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
      videolist: [
          'https://zgnstatic.oss-cn-beijing.aliyuncs.com/zgnimage/20200519/f8104b454aac5c2862d0b6fa43a09e72.jpg',
          'https://zgnstatic.oss-cn-beijing.aliyuncs.com/zgnimage/20200506/e53237cf8d3f3e08de3d2626246fbb6d.png',
           'https://zgnstatic.oss-cn-beijing.aliyuncs.com/zgnimage/20200519/f8104b454aac5c2862d0b6fa43a09e72.jpg',
          'https://zgnstatic.oss-cn-beijing.aliyuncs.com/zgnimage/20200506/e53237cf8d3f3e08de3d2626246fbb6d.png',
           'https://zgnstatic.oss-cn-beijing.aliyuncs.com/zgnimage/20200519/f8104b454aac5c2862d0b6fa43a09e72.jpg',
          'https://zgnstatic.oss-cn-beijing.aliyuncs.com/zgnimage/20200506/e53237cf8d3f3e08de3d2626246fbb6d.png',
          ],
      len: 6
    };
  },
mounted(){
  this.verScroll()
},
  methods: {
    verScroll() {
      console.log(this.$refs.lislide[0].clientWidth)
      let width = this.len * this.$refs.lislide[0].clientWidth*1.07; // 动态计算出滚动区域的大小，前面已经说过了，产生滚动的原因是滚动区域宽度大于父盒子宽度
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
   
  },

};
</script>

<style lang='less' scoped>
.swiperLeft {
  width:100%;
  overflow:hidden;
   height:1.96rem;
   margin:0.3rem 0 0 0.2rem; 

  ul {
    display: flex;
    flex-wrap: nowrap;
    li {
      width:3.05rem;
      height:1.96rem;
      margin:0 0.1rem;
      border-radius:0.15rem;
      display: flex;
     
      p{
         width:3.05rem;
        height:1.96rem;
        //  overflow: hidden;
        position: relative;
      &>img{
        width:3.05rem;
        height:1.96rem;
        display: block;
        border-radius:0.15rem;
          }
          span{
            position: absolute;
            width:0.69rem;
            height:0.69rem;
            top:50%;
            left:50%;
            margin-top:-0.35rem;
            margin-left:-0.35rem;
          }
      }
    
    }
  }
}
</style>



