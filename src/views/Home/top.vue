<template>
  <div class="detailcontent slide-router-active">
    <div class="ss">
      <scroller ref="aa" :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
        <div>
          <ul>
            <li v-for="(item,index) in toplist" :key="index">
              <h3>{{index+1}}.{{item.title}}</h3>
              <p>
                <span>
                  <font :style="{width:item.chot+'%'}"></font>
                </span>
                <font>{{item.chot}}%</font>
              </p>
            </li>
          </ul>
          <!-- 展开更多 -->
          <p class="more" v-if="pullflag">{{pullDownMsg}}</p>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
import Tab from "@/components/TabBar";
export default {
  name: "top",
  data() {
    return {
      toplist: [],
      page: 1,
      pullDownMsg: "",
      pullflag: "",
      tflag: true
    };
  },
  components: {
    Tab
  },
   mounted() {
    this.getTopList(this.$route.params.cid);
  },
  methods: {
    handleToScroll(pos) {
      //上拉加载 总高度>下拉的高度+数值(20仅供参考) 触发加载更多
      if (this.tflag) {
        if (this.$refs.aa.scroll.maxScrollY - 30 < pos.y) {
          this.pullflag = true;
          this.pullDownMsg = "正在加载....";
          //使用refresh 方法 来更新scroll 解决无法滚动的问题
          this.page++;
          this.$nextTick(() => {
            this.getTopList(this.$route.params.cid);
            this.$refs.aa.scroll.refresh();
          });
        }
      }
    },
    handleToTouchEnd(pos) {},

    getTopList(cid) {
      if (this.tflag) {
        this.axios
          .get("/api/Api/index/gettoplist", {
            params: {
              cid: cid,
              p: this.page
            }
          })
          .then(res => {
            if (res.data.list) {
              res.data.list.forEach(item => {
                this.toplist.push(item);
              });
              if (this.spage > 1 && res.data.list.length < 10) {
                this.tflag = false;
                this.pullflag = true;
                this.pullDownMsg = "没有排名啦...";
              }
              if (this.spage == 1 && res.data.list.length < 10) {
                this.tflag = true;
                this.pullflag = true;
                this.pullDownMsg = "没有排名啦...";
                return false;
              }
            } else {
              this.tflag = false;
              this.pullflag = true;
              this.pullDownMsg = "没有排名啦...";
            }
          });
      }
    }
  },

 
};
</script>
<style scoped lang="less">
.detailcontent {
  flex: 1;
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 1.2rem;
  background: #fff;
  width: 100%;
  z-index: 12;
  .ss {
    height: 100%;
    padding-top: 0;
    position: absolute;
    box-sizing: border-box;
    top: 0;
    padding-bottom: 0.5rem;
    width: 100%;
    bottom: 1.2rem;
    ul {
      width: 6rem;
      margin: 0 auto;
      li {
        margin-top: 0.3rem;
        h3 {
          font-size: 0.28rem;
          color: #333;
          line-height: 0.5rem;
          font-weight: bold;
        }
        p {
          display: flex;
          justify-content: space-between;
          padding: 0.1rem 0;
          align-items: center;
          span {
            display: flex;
            width: 4.98rem;
            height: 0.15rem;
            border: 0.02rem solid #369836;
            border-radius: 0.3rem;
            font {
              display: block;
              width: 30%;
              background: #079256;
              border-radius: 0.3rem;
            }
          }
          font{
            font-size: 0.28rem;
            color: #079256;
          }
        }
      }
    }
  }
}

.return {
  position: absolute;
  top: 0;
  left: 0.2rem;
}
.more {
  width: 4rem;
  margin: 0 auto;
  text-align: center;
  line-height: 0.8rem;
  color: #282828;
  font-size: 0.28rem;
}
.slide-router-active {
  animation: 0.4s slidemove;
}
@keyframes slidemove {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
