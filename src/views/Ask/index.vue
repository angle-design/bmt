<template>
  <div id="main">
    <div class="content">
      <scroller ref="aa" :handleToScroll="handleToScroll">
        <div>
          <!--    前三条-->
          <Item :list="topList" @toDeatils="toDeatils" />

          <SwiperLeft />

          <!--      后面的内容-->
          <Item :list="list" @toDeatils="toDeatils" />
          <!-- 展开更多 -->
          <p class="more" v-if="pullflag">{{pullDownMsg}}</p>
        </div>
      </scroller>
    </div>
    <!--    创建问吧 浮窗-->
    <p class="fileask" @click="toAskfile">
      <img src="../../assets/wen.png" alt />
    </p>
    <Tab></Tab>
  </div>
</template>

  <script>
import { Loadmore } from "mint-ui";
import Tab from "@/components/TabBar";
import Item from "@/components/Ask/Item.vue";
import SwiperLeft from "@/components/Ask/SwiperLeft.vue";
export default {
  name: "Ask",
  data() {
    return {
      topList: [],
      list: [],
      page: 1,
      pullDownMsg: "",
      pullflag: "",
      payload: true
    };
  },
  mounted() {
    this.getList();
  },

  components: {
    Tab,
    SwiperLeft,
    Item
  },
  methods: {
    //进入详情
    toDeatils(id) {
      this.$router.push("/askdetails/" + id);
    },
    toAskfile() {
      var self = this;
      var login = this.common.Login(self).then(res => {
        if (res) {
          this.$router.push("/askfile");
        }
      });
    },
    handleToScroll(pos) {
      //上拉加载 总高度>下拉的高度+数值(20仅供参考) 触发加载更多
      if (this.payload) {
        if (this.$refs.aa.scroll.y <= this.$refs.aa.scroll.maxScrollY + 50) {
          this.getMoreList();
          this.$refs.aa.scroll.refresh();
        }
      }
    },
    getList() {
      this.page = 1;
      // 拉取商家信息
      this.pullflag = true;
      this.pullDownMsg = "上拉加载...";
      this.axios
        .get("/api/api/Ask/Glist", {
          params: {
            p: this.page
          }
        })
        .then(res => {
          if (res.data.list) {
            this.topList = res.data.list.slice(0,3);
            this.list = res.data.list.slice(3)
            console.log(this.list)
          }
        });
    },
    getMoreList() {
      if (this.payload) {
        this.page++;
        this.axios
          .get("/api/api/Ask/Glist", {
            params: {
              p: this.page
            }
          })
          .then(res => {
            if (res.data.list) {
              res.data.list.forEach(item => {
                this.list.push(item);
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
  }
};
</script>

  <style scoped lang="less">
.content {
  flex: 1;
  overflow: auto;
  margin: 0.2rem 0 1.2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  background: #f9f9f9;
}
.fileask {
  width: 1.48rem;
  height: 1.48rem;
  position: fixed;
  top:73%;
  right: 0;
  z-index: 10;
}
</style>
