<template>
<div class="content">
    <scroller ref="aa" :handleToScroll="handleToScroll">
      <div class="lesson">
        <div class="listitem" v-for="(item,index) in lessonlist" :key="index">
          <mechanitem :list="item"></mechanitem>
        </div>
        <!-- 展开更多 -->
        <p class="more" v-if="pullflag">{{pullDownMsg}}</p>

    <kong :flag="kongflag"></kong>
    </div>
  </scroller>
  </div>
</template>
<script>
import kong from "@/components/kong.vue";
import mechanitem from "@/components/Home/Mechanism.vue";
export default {
  data() {
    return {
      lessonlist: [],
      page: 1,
      payload: true,
      pullDownMsg: "",
      pullflag: true,
      kongflag: false
    };
  },
  mounted() {
    this.getlist();
  },
  methods: {
    handleToScroll(pos) {
      //上拉加载 总高度>下拉的高度+数值(20仅供参考) 触发加载更多
      if (this.payload) {
        this.pullDownMsg = "上拉加载...";
        if (this.$refs.aa.scroll.y <= this.$refs.aa.scroll.maxScrollY + 20) {
          //使用refresh 方法 来更新scroll 解决无法滚动的问题
          this.page++;
          this.$nextTick(() => {
            this.getlist();
            this.$refs.aa.scroll.refresh();
          });
        }
      }
    },
    // 获取首页列表
    getlist() {
      if (this.payload) {
        this.axios
          .get("/api/api/my/getMycollect", {
            params: {
              type: 1,
              p: this.page
            }
          })
          .then(res => {
              if(res.data.code==404){
                  this.kongflag=true
              return false;
              }
            if (res.data.list) {
               this.kongflag=false
              res.data.list.forEach(item => {
                this.lessonlist.push(item);
              });
              if (res.data.list.length < 10) {
                this.payload = false;
                this.pullflag = true;
                this.pullDownMsg = "没有更多内容...";
              }
            } else {
              this.payload = false;
              this.pullflag = true;
              this.pullDownMsg = "没有更多内容...";
            }

          });
          
      }
    }
  },
  components: {
    mechanitem,
    kong
  }
};
</script>
<style scoped lang="less">
 .content{
      flex: 1;
  overflow: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 auto 0;
  font-size: 0.3rem;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
    background: #fff;
    padding-top:1rem;
    box-sizing: border-box;
  padding-bottom:0.2rem;
  .mechan {
    background: #f8f8f8;
  }
}
.kong{
  margin-top:40%;
}
</style>