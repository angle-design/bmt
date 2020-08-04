<template>
  <div class="content">
    <scroller ref="aa" :handleToScroll="handleToScroll">
      <div class="topic">
        <div class="listitem" v-for="(item,index) in toplist" :key="index">
          <p @click="toDeatils(item.id)">{{item.h_title}},{{item.h_title2}}</p>
          <div>
            <font>{{item.h_ctime}}</font>
            <p>
              <span v-if="item.h_status==1" style="color:#36b937">进行中</span>
              <span v-else-if="item.h_status==2" style="color:#f1a91f">待审核</span>
              <span v-else style="color:#999999">>已关闭</span>
              <i class="fa fa-close" @click="closepup(item)"></i>
            </p>
          </div>
        </div>
       
        <!-- 展开更多 -->
        <p class="more" v-if="pullflag">{{pullDownMsg}}</p>
        <kong :flag="showflag" :msg="msg"></kong>
      </div>

    </scroller>
     <mt-actionsheet :actions="actions" v-model="sheetVisible" class="sheet"></mt-actionsheet>
  </div>
</template>

<script>
import { Actionsheet, Toast } from "mint-ui";
import kong from "@/components/kong.vue";
export default {
  name: "topic",
  data() {
    return {
      toplist: [],
      actions: [
        {
          name: "删除话题",
          method: this.removetopic
        }
      ],
      sheetVisible: false,
      titem: {},
      page: 1,
      payload: true,
      pullDownMsg: "",
      pullflag: "",
        showflag:false,
        msg:'暂无话题'
    };
  },
    components: {

        kong
    },
  mounted() {
    this.getlist();
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
          .get("/api/api/my/getmyhuati", {
            params: {
              p: this.page
            }
          })
          .then(res => {
            if (res.data.list) {
              res.data.list.forEach(item => {
                this.toplist.push(item);
              });
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
    },
    closepup(item) {
      this.titem = item;
      this.sheetVisible = true;
    },
    removetopic() {
      //删除话题
      //   console.log(this.tid)
      var titem = this.titem;
      console.log(titem);
      this.axios
        .post("/api/api/my/delmyhuati", {
          id: titem.id
        })
        .then(res => {
          if (res.data.code == 200) {
            this.toplist = this.toplist.filter(item => item != titem);
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
.sheet {
  color: #ff0000;
}
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

.topic {
  .listitem {
    border-bottom: 0.15rem solid #f8f8f8;
    padding: 0.25rem 0.2rem;
    & > p {
      padding: 0 0.2rem;
    }
    div {
      display: flex;
      justify-content: space-between;
      margin-top: 0.2rem;
      font-size: 0.24rem;
      align-items: center;
      padding-left: 0.2rem;
      font {
        color: #bfbfbf;
      }
      p {
        span {
          color: #f1a91e;
          &.active {
            color: #36b936;
          }
          &.ending {
            color: #999;
          }
        }
        i {
          padding: 0 0.2rem 0 0.55rem;
          color: #999999;
          font-size: 0.3rem;
        }
      }
    }
  }
}
.kong{
  margin-top:40%;
}
</style>