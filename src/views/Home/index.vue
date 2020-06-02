<template>
    <div class="content">
      <!-- 搜索框 -->
      <scroller
        ref="aa"
        :handleToScroll="handleToScroll"
        :handleToTouchEnd="handleToTouchEnd"
      >
        <div>
          <div class="searchbody" @tap="tosearch">
            <div class="search">
              <img src="../../assets/search.png" />搜索
            </div>
          </div>
          <!-- 轮播图 -->
          <div class="picbody">
            <div class="swiper-container pic_container" ref="piccontainer">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in slideList" :key="index">
                  <a :href="item.url">
                    <img :src="item.image" />
                  </a>
                </div>
              </div>
              <!-- 如果需要分页器 -->
              <div class="swiper-pagination pic-pagination" ref="picpagination"></div>
            </div>
          </div>
          <!-- 图标轮播 -->
          <div class="iconbody">
            <div class="swiper-container icon_container" ref="iconcontainer">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in list" :key="index">
                  <p
                    v-for="(lessonitem,index) in item"
                    :key="index"
                    @tap="tablist(lessonitem.id)"
                    :class="tabindex==lessonitem.id?'active':''"
                  >
                    <span>
                      <img :src="lessonitem.image2" v-if="tabindex==lessonitem.id" />
                      <img :src="lessonitem.image1" v-else />
                    </span>
                    <font>{{lessonitem.name}}</font>
                  </p>
                </div>
              </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination icon-pagination" ref="iconpagination"></div>
          </div>
          <!-- 内容区 -->
          <div class="list">
            <ul>
              <li v-for="(item,index) in itemList" :key="index">
                <a :href="item.url">
                  <img :src="item.image" />
                  <font>{{item.content}}</font>
                </a>
                <p>
                  <span @tap.once="zan($event,item.id)" class>{{item.hot}}</span>
                  <button @tap="handlemessage(item.id)">立即报名</button>
                </p>
              </li>
            </ul>
          </div>
          <!-- 展开更多 -->
          <p class="more" v-if="pullflag">{{pullDownMsg}}</p>
          <!-- 排行榜 -->
          <div class="topbody" @tap="handleTop(tabindex)">查看课程排行榜</div>
        </div>
        <router-view />
      </scroller>
      <Tab/>
    </div>

</template>

<script>
import Tab from "@/components/TabBar";
import Swiper from "../../../static/css/swiper.min";
import "../../../static/css/swiper.min.css";
export default {
  name: "homedd",
  data() {
    return {
      list: [],
      tabindex: "",
      itemList: [],
      page: 1,
      pullDownMsg: "上拉加载...",
      pullflag:true,
      slideList: [],
      flag: true,
      aflag: true,
       payload: true,
    };
  },
  components: {
    Tab
  },
  mounted() {
    this.getList();
    this.$nextTick(function() {
      this.cc();
    });
  },
  watch: {
    // '$route':'routeChange'
  },
  methods: {
    zan(event, id) {
      console.log(event);
      this.axios
        .get("/Api/index/zan", {
          params: {
            id: id
          }
        })
        .then(res => {
          if (res.data.code == 200) {
            event.target.className = "active";
            event.target.innerHTML = parseInt(event.target.innerText) + 1;
          }
        });
    },
    // routeChange:function(){
    //   this.$refs.aa.scroll.refresh();
    // },
    handleToScroll(pos) {
      //上拉加载 总高度>下拉的高度+数值(20仅供参考) 触发加载更多
       if (this.payload) {
      if (this.$refs.aa.scroll.y <= this.$refs.aa.scroll.maxScrollY + 20) {
        //使用refresh 方法 来更新scroll 解决无法滚动的问题
        this.page++;
        this.$nextTick(() => {
          this.getList(this.tabindex);
          this.$refs.aa.scroll.refresh();
        });
      }
       }
    },
    handleToTouchEnd(pos) {},
    swiperInit() {
      var mySwiper1 = new Swiper(this.$refs.iconcontainer, {
        loop: false,
        pagination: {
          el: this.$refs.iconpagination
        }
      });
    },
    swipertwoInit() {
      var mySwiper = new Swiper(this.$refs.piccontainer, {
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: this.$refs.picpagination
        },
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
        touchStartStopPropagation: true,
        on: {
          touchStart: function(event) {
            this.aflag = false;
          },
          touchEnd: function(event) {
            this.aflag = true;
          }
        }
      });
    },
    // 进入排行榜
    handleTop(cid) {
      if (!cid) {
        cid = 0;
      }
      this.$router.push("/home/top/" + cid);
    },
    // 点击tab切换列表
    tablist(index) {
      if (this.aflag) {
        this.itemList = [];
        this.tabindex = index;
        this.page = 1;
         this.payload = true;
        this.$nextTick(function() {
          this.getList(this.tabindex);
        });
      }
    },
    cc() {
      this.axios.get("/api/Api/index/getPcate").then(res => {
        if (res.data.code == 200) {
          for (var i = 0; i < res.data.list.length; i += 10) {
            this.list.push(res.data.list.slice(i, i + 10));
          }
          this.tabindex = res.data.list["id"];
        }
        this.$nextTick(function() {
          this.swiperInit();
          return false;
        });
      });
      this.axios.get("/api/api/index/getSlider").then(res => {
        if (res.data.code == 200) {
          this.slideList = res.data.list;
        }
        this.$nextTick(function() {
          this.swipertwoInit();
          return false;
        });
      });
    },
    getList(cid) {
      if (this.payload) {
      this.axios
        .get("/api/Api/index/getPlist", {
          params: {
            cid: cid,
            p: this.page
          }
        })
        .then(res => {
           if (res.data.list) {
              res.data.list.forEach(item => {
                this.itemList.push(item);
              });
              if (this.page > 1 && res.data.list.length < 10) {
                this.payload = false;
                this.pullflag = true;
              this.pullDownMsg = "精彩课程待更新...";
              }
            } else {
              this.payload = false;
              this.pullflag = true;
              this.pullDownMsg = "精彩课程待更新...";
            }
        });
      }
    },
    // 进入我要报名
    handlemessage(name) {
      this.$router.push("/signup/" + name);
    },
    tosearch() {
      this.$router.push("/home/search");
    }
  }
};
</script>

<style scoped lang="less">
.content {
  flex: 1;
  overflow: auto;
  margin-bottom: 1.2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  background: #f9f9f9;
  padding-bottom:0.2rem;
  .searchbody {
    background: #eeeeee;
    padding: 0.3rem 0;
    .search {
      width: 7.1rem;
      height: 0.74rem;
      background: #fff;
      border: 0.02rem solid #d5d5d5;
      border-radius: 0.1rem;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.28rem;
      color: #999;
      img {
        width: 0.3rem;
        margin: 0 0.1rem;
      }
    }
  }
  .picbody {
    .swiper-container {
      width: 100%;
      height: 3.2rem;
      img {
        width: 100%;
        height: 3.2rem;
      }
      .swiper-pagination {
        bottom: 0.1rem;
        .swiper-pagination-bullet {
          width: 0.14rem;
          height: 0.14rem;
        }
      }
    }
  }
  .iconbody {
    margin: 0;
    height: 4.2rem;
    background: #fff;
    .swiper-container {
      height: auto;
      margin: 0 0.2rem;
      .swiper-slide {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: flex-start;
        p {
          width: 1.38rem;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          margin-top: 0.3rem;
          font-size: 0.28rem;
          &.active {
            color: #2fad2f;
            span {
              background: #2fad2f;
              border-color: #2fad2f;
            }
          }
          font {
            height: 0.4rem;
            overflow: hidden;
            text-align: center;
          }
          span {
            display: flex;
            width: 0.93rem;
            height: 0.93rem;
            border: 0.02rem solid #999999;
            border-radius: 50%;
            justify-content: center;
            align-items: center;
            margin-bottom: 0.1rem;

            img {
              width: 0.36rem;
              height: 0.36rem;
            }
          }
        }
      }
    }
    .icon-pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 7.1rem;
      margin-top: 0.3rem;
      .swiper-pagination-bullet {
        width: 3rem;
        height: 1rem;
      }
    }
  }
  .list {
    width: 100%;
    padding: 0.3rem 0.2rem;
    border-top: 0.02rem solid #eee;

    box-sizing: border-box;
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        width: 3.4rem;
        margin: 0.2rem 0;
        height: 3.9rem;
        box-shadow: 0 0.1rem 0.18rem rgba(0, 0, 0, 0.16);
        border-radius: 0.15rem;
        overflow: hidden;
        font-size: 0.28rem;
        img {
          width: 3.4rem;
          height: 2.2rem;
        }
        font {
          margin: 0.1rem 0.15rem 0.16rem;
          line-height: 0.4rem;
          text-align: left;
          width: 3.1rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          color: #333;
        }
        p {
          display: flex;
          justify-content: space-between;
          font-size: 0.22rem;
          color: #666;
          height: 0.5rem;
          align-items: center;
          padding: 0 0.1rem;
          span {
            display: flex;
            align-items: center;
            height: 0.5rem;
            padding-top: 0.05rem;
            padding-right: 0.3rem;
            background: url(../../assets/chushi.png) no-repeat left center;
            background-size: 0.36rem 0.36rem;
            padding-left: 0.4rem;
            &.active {
              background: url(../../assets/xuanzhong.png) no-repeat left center;
              background-size: 0.36rem 0.36rem;
            }
          }
          button {
            width: 1.42rem;
            height: 0.5rem;
            background: #ffbc00;
            border-radius: 0.15rem;
            font-size: 0.26rem;
            color: #fff;
          }
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
  .topbody {
    width: 5rem;
    height: 0.9rem;
    line-height: 0.9rem;
    color: #367838;
    font-size: 0.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0.02rem solid #367838;
    border-radius: 0.9rem;
    margin: 0.2rem auto 0.8rem;
    margin-bottom: 0.3rem;
  }
}
</style>
