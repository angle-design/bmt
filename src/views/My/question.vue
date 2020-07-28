<template>
  <div class="content">
    <scroller ref="aa" :handleToScroll="handleToScroll">
      <div class="question">
        <ul>
          <li v-for="(item,index) in quesctionlist" :key="index">
            <p class="title">
              <span>提问:</span>
              {{item.content}}
            </p>
            <div @click="toDeatils(item.hinfo.id)">
              <p>
                <img v-if="item.hinfo.a_image" :src="item.hinfo.a_image" />
                <img v-else src="../../assets/mohead.png" />
              </p>
              <span>{{item.hinfo.h_title}},{{item.hinfo.h_title2}}</span>
            </div>
            <p class="time">
              <font>{{item.time}}</font>
              <span v-if="item.status==1" style="color:#36b937">专家已答</span>
              <span v-else  style="color:#f1a91f">待回答</span>
            </p>
          </li>
        </ul>
        <!-- 展开更多 -->
        <p class="more" v-if="pullflag">{{pullDownMsg}}</p>
        <kong :flag="kongflag" :msg="msg"></kong>
      </div>
    </scroller>
  </div>
</template>

<script>
    import kong from "@/components/kong.vue";
export default {
  name: "question",
  data() {
    return {
      quesctionlist: [],
      page: 1,
      payload: true,
      pullDownMsg: "",
      pullflag: "",
        kongflag:false,
        msg:'暂无提问'
    };
  },
  mounted() {
    this.getlist();
  },
    components: {

        kong
    },
  methods: {
     //进入详情
    toDeatils(id) {
      this.$router.push("/askdetails/" + id);
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
          .get("/api/api/my/getmyask", {
            params: {
              p: this.page
            }
          })
          .then(res => {

            if (res.data.list) {

                var list = res.data.list;
                for (var i in list){
                    this.quesctionlist.push(list[i]);
                }

              if (res.data.list.length < 10) {
                this.payload = false;
                this.pullflag = true;
                this.pullDownMsg = "没有更多内容...";
              }
            }else if(this.page==1){
                this.showflag = true;
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
.question {
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
        p {
          width: 0.75rem;
          height: 0.75rem;
          img {
            width: 0.7rem;
            height: 0.7rem;
            border-radius: 50%;
          }
        }
        span {
          width: 5.1rem;
          margin-left: 0.2rem;
        }
      }
      .time {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.24rem;
        font {
          color: #bfbfbf;
        }
        span {
          color: #f1a91e;
          &.da {
            color: #7bcc7b;
          }
        }
      }
    }
  }
}
.kong{
  margin-top:40%;
}
</style>