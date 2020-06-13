<template>
  <div class="content">
    <scroller ref="aa" :handleToScroll="handleToScroll">
      <div class="comment">
        <ul>
          <li v-for="(item,index) in replylist" :key="index">
            <p class="title">
              <span>评论:</span>
              {{item.content}}
            </p>
            <div @tap="toDeatils(item.aid)">
              <span>{{item.hinfo.content}}</span>
            </div>
            <p class="time">
              <font>{{item.ctime}}</font>
            </p>
          </li>
        </ul>
        <!-- 展开更多 -->
        <p class="more" v-if="pullflag">{{pullDownMsg}}</p>
      </div>
    </scroller>
  </div>
</template>

<script>
export default {
  name: "comment",
  data() {
    return {
      replylist: [],
      page: 1,
      payload: true,
      pullDownMsg: "",
      pullflag: ""
    };
  },
  mounted() {
    this.getlist();
  },
  methods: {
       //进入详情
    toDeatils(id) {
      this.$router.push("/comment/" + id);
    },
    // 上拉加载更多数据
    handleToScroll() {
      //上拉加载 总高度>下拉的高度+数值(20仅供参考) 触发加载更多
      if (this.payload) {
        if (this.$refs.aa.scroll.y <= this.$refs.aa.scroll.maxScrollY + 50) {
          this.page++;
          this.getlist();
          this.$refs.aa.scroll.refresh();
        }
      }
    },
    getlist() {
      if (this.payload) {
        this.axios
          .get("/api/api/my/getmyreply", {
            params: {
              p: this.page
            }
          })
          .then(res => {
            if (res.data.list) {
              res.data.list.forEach(item => {
                this.replylist.push(item);
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

<style lang="less" scoped>
.content {
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
}

.comment {
  ul {
    li {
      padding: 0.3rem 0.3rem 0.15rem;
      border-bottom: 0.02rem solid #e7e7e7;
      line-height: 0.4rem;
      .title {
        span {
          color: #999999;
        }
      }
      div {
        display: flex;
        width: 6.5rem;
        background: #f8f8f8;
        padding: 0.25rem 0.25rem;
        margin-left: 0.5rem;
        border-radius: 0.15rem;
        box-sizing: border-box;
        align-items: center;
        margin: 0.15rem 0 0.15rem 0.4rem;
      }
      .time {
        font-size: 0.24rem;
        color: #bfbfbf;
      }
    }
  }
}
</style>