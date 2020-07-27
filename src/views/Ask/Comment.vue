<!--  -->
<template>
  <div class="content">
    <scroller ref="aa" :handleToScroll="handleToScroll">
      <div>
        <div class="list_body">
          <Listcon :listtop="listtop" @toComment="toComment" />
        </div>
        <!-- 回复列表 -->
        <div class="new_bottom">
          <ul>
            <li v-for="(list,i) in fulist" :key="i">
              <div class="list_item">
                <div>
                  <dl v-if="list.uinfo">
                    <dt>
                      <img v-if="list.uinfo.a_image" :src="list.uinfo.a_image" />
                      <img v-else src="../../assets/mohead.png" />
                      <font></font>
                    </dt>
                    <dd>
                      <font>{{list.uinfo.a_uname}}</font>
                      <span>{{list.ctime}}</span>
                    </dd>
                  </dl>
                  <p>
                    <span>
                      <i @click.once="zanlist($event,list.id)"></i>
                      <font>{{list.zan?list.zan:'0'}}</font>
                    </span>
                    <span @click="replaya(list)">
                      <i></i>
                      <font>{{list.countr}}</font>
                    </span>
                  </p>
                </div>
                <p class="new_text new_text_ask">{{list.content}}</p>
              </div>
              <div class="list_item list_itemleft" v-for="(item,j) in list.relist" :key="j">
                <div>
                  <dl v-if="list.uinfo">
                    <dt>
                      <img v-if="list.uinfo.a_image" :src="list.uinfo.a_image" />
                      <img v-else src="../../assets/mohead.png" />
                      <font></font>
                    </dt>
                    <dd>
                      <font>
                        <font>{{item.u_}}</font>回复
                        <font>{{item.fu}}</font>
                      </font>
                      <span>{{list.ctime}}</span>
                    </dd>
                  </dl>
                  <p>
                    <span>
                      <!-- <i class="fa fa-heart-o"></i>
                      <font>{{item.zan}}</font> -->
                    </span>
                    <span @click="replay(item,list.id)">
                      <i></i>
                      <!-- <font>{{item.huifu}}</font> -->
                    </span>
                  </p>
                </div>
                <p class="new_text new_text_ask">{{item.content}}</p>
              </div>
            </li>
          </ul>
        </div>

        <!-- 展开更多 -->
        <p class="more" v-if="pullflag">{{pullDownMsg}}</p>
      </div>
    </scroller>

    <!-- 回复列表 -->
    <div class="fixed_bottom" v-if="replyflag" @click.self="replyflag=false">
      <div>
        <textarea type="text" v-drop placeholder="一起讨论吧" v-model="conmessage" autofocus="autofocus"></textarea>
        <p :class="[conmessage?'lv':'']" @click="tosend">发表</p>
      </div>
    </div>
  </div>
</template>

<script>
import Listcon from "@/components/Ask/Listcon.vue";
export default {
  name: "new",
  data() {
    return {
      listtop: {},
      fulist: [],
      page: 1,
      payload: true,
      pullDownMsg: "",
      pullflag: "",
      replyflag: false, //评论输入框隐藏
      conmessage: "",
      replaydata: {}
    };
  },
  mounted() {
    this.getListInfo();
    this.getfulist();
  },
  methods: {
    // 问答回复
    toComment() {
      this.replaydata = [this.listtop.id];
      this.getlogin();
    },
    // 点赞
    zanlist(event, id) {
      this.axios
        .post("/api/api/Ask/readdzan", {
          aid: id
        })
        .then(res => {
          if (res.data.code == 200) {
            // console.log(event)
            event.target.className = "active";
            event.target.nextElementSibling.innerHTML =
              parseInt(event.target.nextElementSibling.innerHTML) + 1;
          } else if (res.data.code == 205) {
            //未登录
            this.$router.push("/login");
          }
        });
    },

    //提交回复
    tosend() {
      if (this.conmessage) {
        this.replyflag = false;
        this.axios
          .post("/api/api/Ask/addreply", {
            aid: this.replaydata[0],
            rid: this.replaydata[1],
            ffid: this.replaydata[2],
            fuid: this.replaydata[3],
            content: this.conmessage
          })
          .then(res => {
            if (res.data.code == 200) {
              //成功，刷新当前页面
               this.$toast('提交成功~')
              // window.location.reload();
                this.getfulist();
            } else if (res.data.code == 205) {
              //未登录
              this.$router.push("/login");
            }
          });
      }
    },
    // 二次回复
    replaya(item) {
      this.replaydata = [item.aid, item.id, item.id, item.uid];
      this.getlogin();
    },
    getlogin() {
      var self = this;
      var login = this.common.Login(self).then(res => {
        if (res) {
          self.replyflag = true;
        }
      });
    },
    // 三次回复
    replay(item, id) {
      this.replaydata = [item.aid, item.id, id, item.uid];
      this.getlogin();
    },
    // 上拉加载更多数据
    handleToScroll() {
      //上拉加载 总高度>下拉的高度+数值(20仅供参考) 触发加载更多
      if (this.payload) {
        if (this.$refs.aa.scroll.y <= this.$refs.aa.scroll.maxScrollY + 50) {
          this.getMoreList(this.uid, this.order);
          this.$refs.aa.scroll.refresh();
        }
      }
    },
    getListInfo() {
      this.axios
        .get("/api/api/Ask/getreplyinfo", {
          params: {
            aid: this.$route.params.id
          }
        })
        .then(res => {
          // console.log(res.data);
          if (res.data.list) {
            this.listtop = res.data.list;
          }
        });
    },
    // 第一次获取
    getfulist() {
      this.page = 1;
      // 拉取商家信息
      this.pullflag = true;
      // this.pullDownMsg = "上拉加载...";
      this.axios
        .get("/api/api/Ask/getreply", {
          params: {
            aid: this.$route.params.id,
            p: this.page
          }
        })
        .then(res => {
          if (res.data.list) {
            this.fulist = res.data.list;
          }
        });
    },
    // getfulist() {
    //   this.axios
    //     .get("/api/api/Ask/getreply", {
    //       params: {
    //         aid: this.$route.params.id,
    //         p: this.page
    //       }
    //     })
    //     .then(res => {
    //       if (res.data.list) {
    //         this.fulist = res.data.list;
    //       }
    //     });
    // },
    // 加载更多
    getMoreList(id, order) {
      if (this.payload) {
        this.page++;
        this.axios
          .get("/api/api/Ask/getreply", {
            params: {
              aid: this.$route.params.id,
              p: this.page
            }
          })
          .then(res => {
            if (res.data.list) {
              res.data.list.forEach(item => {
                this.fulist.push(item);
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
    Listcon
  }
};
</script>

<style lang='less' scoped>
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
}
.fixed_bottom {
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  div {
    display: flex;
    align-items: center;
    height: 1.2rem;
    background: #eff0ef;
    width: 100%;
    textarea {
      border: 0.02rem solid #ccc;
      background: #fff;
      height: 0.4rem;
      line-height: 0.4rem;
      border-radius: 0.2rem;
      color: #333;
      margin-left: 0.1rem;
      padding: 0.15rem 0.1rem;
      width: 5.9rem;
      font-size: 0.28rem;
    }
    p {
      color: #999;
      padding: 0 0.2rem;
      &.lv {
        color: #369836;
      }
    }
  }
}
.content {
  .new_bottom {
    padding-top: 0.3rem;
    .new_text {
      background: none;
    }
  }
  .list_body,
  .new_bottom {
    border-bottom: 0.1rem solid #f4f4f4;
    position: relative;
    padding: 0.3rem 0.3rem 0.3rem;
  }
}
.new_bottom {
  padding: 0 0 0 !important;
  ul {
    li {
      padding: 0.3rem 0.3rem;
      border-bottom: 0.1rem solid #f4f4f4;
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
.new_text {
  margin-top: 0.2rem;
  background: url(../../assets/wen_01.png) no-repeat 0.2rem 0.05rem;
  background-size: 0.4rem 0.4rem;
  font-size: 0.3rem;
  padding-left: 1rem;
  position: relative;
  &.new_text_ask {
    background: url(../../assets/wen_03.png) no-repeat 0.2rem 0.05rem;
    background-size: 0.4rem 0.4rem;
  }
}
.list_itemleft {
  margin-left: 1rem;
  padding-top: 0.2rem;
  margin-top: 0.2rem;
  &::after {
    content: "";
    height: 0.02rem;
    width: 6rem;
    position: absolute;
    top: 0rem;
    left: 1rem;
    background: #f4f4f4;
  }
  dl {
    dd {
      margin-left: 0.3rem !important;
    }
  }
  .new_text {
    background: none;
    padding-left: 0;
  }
}
.list_item {
  &.list_item2 {
    padding-top: 0.2rem;
    div {
      padding-top: 0.2rem;
      position: relative;
      &::after {
        content: "";
        height: 0.02rem;
        width: 6rem;
        position: absolute;
        top: 0rem;
        left: 1rem;
        background: #f4f4f4;
      }
    }
  }
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    dl {
      display: flex;
      dt {
        position: relative;
        height: 0.76rem;
        img {
          width: 0.7rem;
          height: 0.7rem;
          border-radius: 50%;
        }
        font {
          position: absolute;
          background: #f1a91e;
          border-radius: 50%;
          display: flex;
          width: 0.28rem;
          height: 0.28rem;
          right: -0.1rem;
          bottom: 0rem;
        }
      }
      dd {
        display: flex;
        flex-direction: column;
        margin-left: 0.4rem;
        font-size: 0.28rem;
        line-height: 0.4rem;
        font {
          font {
            color: #369836;
            &:nth-child(1) {
              margin-right: 0.1rem;
            }
            // &:nth-child(2) {
            //   margin-left: 0.1rem;
            // }
          }
        }
        & > span {
          color: #bfbfbf;
          font-size: 0.24rem;
        }
      }
    }
    p {
      display: flex;
      font-size: 0.24rem;
      color: #666666;

      span {
        margin-left: 0.3rem;
        display: flex;

        i {
              //     padding: 0.1rem 0.06rem;
              // color: #bfbfbf;
              // font-size: 0.3rem;
              display: flex;
              width:0.36rem;
              height:0.26rem;
              background:url(http://bmdt.zgn365.com/Public/aa.png) no-repeat;
              background-position:0 -4.41rem;
              background-size:0.36rem auto;
              padding-right:0.1rem;
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
}

</style>
