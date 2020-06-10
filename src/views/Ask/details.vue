<!--  -->
<template>
  <div id="main">
    <div class="content">
      <scroller ref="aa" :handleToScroll="handleToScroll">
        <div class="askdetails">
          <div class="details_top" :style="{'background': 'url('+hinfo.h_image+') no-repeat'}">
            <div>
              <p>{{hinfo.h_title}},{{hinfo.h_title2}}</p>
              <span>
                {{time}} |
                <font v-if="hinfo.isnow==1">提问进行时</font>
                <font v-if="hinfo.isnow==2">提问已完成</font>
              </span>
            </div>
          </div>
          <div class="details_text">
            <dl v-if="hinfo.uinfo">
              <dt>
                <img v-if="hinfo.uinfo.a_image" :src="hinfo.uinfo.a_image" />
                <img v-else src="../../assets/mohead.png" />
                <font></font>
              </dt>
              <dd>
                <font>{{hinfo.uinfo.a_uname}}</font>
                <span>{{hinfo.uinfo.a_title}}</span>
              </dd>
            </dl>
            <p>
              <span :class="{'heightauto':contentflag}">{{hinfo.h_content}}</span>
              <font v-if="contentflag" @tap="contentflag=false">查看完整简介</font>
              <font v-else @tap="contentflag=true">收起内容</font>
            </p>
          </div>
          <!-- 提问 -->
          <div class="question">
            <!-- tab -->
            <div class="question_tab">
              <p>
                <font>共{{count.acount}}个回答</font>
                <font>{{count.qcount}}个提问</font>
              </p>
              <p>
                <span @tap="toNew" :class="order==1?'active':''">最新</span>
                <span @tap="toHot" :class="order==2?'active':''">最热</span>
              </p>
            </div>
            <!-- 内容 -->
            <!-- 全部 -->
            <div class="new">
              <ul>
                <li v-for="(listitem,index) in ListInfo" :key="index">
                  <Listcon :listtop="listitem" @toComment="toComment" @toaswer="toaswer" />
                </li>
              </ul>
              <!-- 展开更多 -->
              <p class="more" v-if="pullflag">{{pullDownMsg}}</p>
            </div>
          </div>
        </div>
      </scroller>
      <!-- 底部 -->
      <Input :flag="flag" @pupClick="flag=false" @toSend="toSend($event)" />
      <!-- 解答问题弹窗 -->
      <Input :flag="awflag" @pupClick="awflag=false" @toSend="toquaswer($event)" />
      <div class="fixed_bottom">
        <!-- <p>
          <i class="fa fa-share-square-o"></i>分享
        </p>-->
        <p @click="toquestion">
          <i class="fa fa-question-circle-o"></i>提问
        </p>
        <p @click.once="togreat">
          <i :class="[zanflag?'fa fa-heart':'fa fa-heart-o']"></i>点赞
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Listcon from "@/components/Ask/Listcon.vue";
import Input from "@/components/Ask/Input.vue";
export default {
  name: "adetails",
  data() {
    return {
      awflag: false,
      flag: false,
      hinfo: {},
      time: "",
      uid: "",
      contentflag: true,
      aflag: false,
      ListInfo: [],
      payload: true,
      pullDownMsg: "",
      pullflag: "",
      page: 1,
      order: 0,
      count: {},
      comtext: "",
      zanflag: false,
      awitem: {} //解答某一项
    };
  },
  mounted() {
    this.uid = this.$route.params.id;
    this.getInfo(this.uid);
    this.getList(this.uid);
  },
  methods: {
    // 下面浮窗点赞
    togreat() {
      this.axios
        .post("/api/api/Ask/haddzan", {
          aid: this.uid
        })
        .then(res => {
          if (res.data.code == 200) {
            this.zanflag = true;
          } else if (res.data.code == 205) {
            //未登录
            this.$router.push("/login");
          }
        });
    },
    // 提问
    toquestion() {
      var self = this;
      var login = this.common.Login(self).then(res => {
        if (res) {
          this.flag = true;
        }
      });
    },
    // 提交提问
    toSend(data) {
      this.comtext = data;
      //点击发表评论
      if (this.comtext) {
        this.axios
          .post("/api/Api/Ask/addask", {
            hid: this.uid,
            content: this.comtext
          })
          .then(res => {
            if (res.data.code == 200) {
              //提问成功
              this.flag = false;
              this.$router.go(0);
            }
          });
      }
    },
    // 进入回复详情
    toComment(id) {
      this.$router.push("/comment/" + id);
    },
    toquaswer(data) {
      this.comtext = data;
      // 提交解答
      this.axios
        .post("/api/api/ask/addq", {
          hid: this.awitem.hid,
          pid: this.awitem.id,
          content: this.comtext
        })
        .then(res => {
          if (res.data.code == 200) {
            //提问成功
            this.awflag = false;
            this.$toast('您也成功解答~')
             //成功，刷新当前页面
              window.location.reload();
          }
        });
    },
    toaswer(data) {
      this.awitem = data;
      var self = this;
      var login = this.common.Login(self).then(res => {
        if (res) {
          this.awflag = true;
        }
      });
    },
    // 获取头部
    getInfo(id) {
      this.$refs.aa.scroll.refresh();
      this.axios
        .get("/api/api/Ask/Hinfo", {
          params: {
            id: id
          }
        })
        .then(res => {
          if (res.data) {
            this.hinfo = res.data.list;
            this.time = this.hinfo.h_etime.split(" ")[0];
          }
        });
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
    // 最新数据渲染
    toNew() {
      this.ListInfo = [];
      this.payload = true;
      this.order = 1;
      this.getList(this.uid, this.order);
      this.handleToScroll();
    },
    // 最热数据渲染
    toHot() {
      this.ListInfo = [];
      this.order = 2;
      this.payload = true;
      this.getList(this.uid, this.order);
      this.handleToScroll();
    },
    // 第一次获取
    getList(id, order) {
      this.page = 1;
      // 拉取商家信息
      this.pullflag = true;
      this.pullDownMsg = "上拉加载...";
      this.axios
        .get("/api/api/Ask/getAlist", {
          params: {
            p: this.page,
            id: id,
            order: order
          }
        })
        .then(res => {
          console.log(res.data.list);
          if (res.data.list) {
            this.count = res.data.count;
            this.ListInfo = res.data.list;
          }
        });
    },
    // 加载更多
    getMoreList(id, order) {
      if (this.payload) {
        this.page++;
        this.axios
          .get("/api/api/Ask/getAlist", {
            params: {
              p: this.page,
              id: id,
              order: order
            }
          })
          .then(res => {
            if (res.data.list) {
              res.data.list.forEach(item => {
                this.ListInfo.push(item);
              });
              if (res.data.list.length < 4) {
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
    Input,
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
  margin: 0 auto 1rem;
  font-size: 0.3rem;
  box-sizing: border-box;
  .details_top {
    width: 7.5rem;
    height: 2.95rem;
    background-size: 7.5rem 2.95rem;
    color: #fff;
    div {
      width: 7.5rem;
      height: 2.95rem;
      background: rgba(0, 0, 0, 0.6);
      box-sizing: border-box;
      padding: 0 0.4rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      p {
        font-size: 0.34rem;
        line-height: 0.5rem;
        font-weight: 500;
      }
      span {
        padding: 0.1rem 0.2rem;
        border: 0.02rem solid #fff;
        border-radius: 0.1rem;
        font-size: 0.26rem;
        display: block;
        margin-top: 0.4rem;
        font {
          color: #48e248;
        }
      }
    }
  }
  .details_text {
    margin: 0.2rem 0.3rem 0.5rem;
    dl {
      display: flex;
      align-items: center;
      dt {
        margin-right: 0.25rem;
        position: relative;
        font {
          width: 0.32rem;
          height: 0.32rem;
          background: #f1a91e;
          border-radius: 50%;
          position: absolute;
          right: -0.1rem;
          bottom: 0.1rem;
        }
        img {
          width: 1.1rem;
          height: 1.1rem;
          border-radius: 50%;
        }
      }
      dd {
        font-size: 0.26rem;
        color: #999;
        font {
          display: block;
          color: #333;
          font-size: 0.34rem;
        }
      }
    }
    p {
      font-size: 0.26rem;
      line-height: 0.4rem;
      margin-top: 0.2rem;
      span {
        &.heightauto {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
        }
      }
      font {
        color: #f1a91e;
        display: block;
        text-align: center;
        padding-top: 0.05rem;
      }
    }
  }
  .question {
    .question_tab {
      display: flex;
      justify-content: space-between;
      height: 0.9rem;
      background: #f4f4f4;
      padding: 0 0.3rem;
      align-items: center;
      p {
        &:nth-child(1) {
          font-size: 0.26rem;
          color: #999999;
          font {
            margin-right: 0.2rem;
          }
        }
        &:nth-child(2) {
          display: flex;

          font-size: 0.3rem;
          span {
            font-weight: bold;
            padding: 0.2rem 0.15rem;
            &.active,
            &.router-link-active {
              color: #369836;
            }
          }
        }
      }
    }
  }
  .fixed_bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 1rem;
    display: flex;
    align-items: center;
    width: 100%;
    background: #eff0ef;
    p {
      display: flex;
      font-size: 0.3rem;
      flex: 1;
      justify-content: center;
      align-items: center;
      i {
        color: #369836;
        font-size: 0.4rem;
        margin-right: 0.1rem;
      }
      &:nth-child(2) {
        // margin: 0 0.8rem;
      }
    }
  }
}
.more {
  width: 4rem;
  margin: 0 auto;
  text-align: center;
  line-height: 0.8rem;
  color: #282828;
  font-size: 0.28rem;
}
.content ul li {
  padding: 0 0.2rem;
  border-bottom: 0.1rem solid #f4f4f4;
}
</style>
