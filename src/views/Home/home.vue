<template>
  <div class="content">
    <!-- 搜索框 -->
    <scroller ref="aa" :handleToScroll="handleToScroll">
      <div>
        <div class="searchbody" @tap="tosearch">
          <div class="search">
            <img src="../../assets/search.png" />搜索机构名称
          </div>
        </div>
        <!-- 分类 -->
        <tabNav
          @choose-item="chooseItem"
          :dataArr="dataArr"
          :activeIndexParent="activeIndex"
          :navWH="navWH"
          :scrollMargin="scrollMargin"
          :scrollWay="scrollWay"
          :colorText="colorText"
          :colorBack="colorBack"
          :colorActiveText="colorActiveText"
          :colorActiveBack="colorActiveBack"
        ></tabNav>
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
        <!-- 排名 -->
        <div class="top_body">
          <h3>机构排名</h3>
          <div class="top_list">
            <div class="listitem" v-for="(item,index) in list" :key="index">
              <mechanitem :list="item"></mechanitem>
              <span class="pai">
                <img v-if="index==0" src="../../assets/top1.png" />
                <img v-if="index==1" src="../../assets/top2.png" />
                <img v-if="index==2" src="../../assets/top3.png" />
                <font v-if="index>2&&index<30" class="smalltop">{{index+1}}</font>
              </span>
            </div>
          </div>
          <kong :flag="kongflag"></kong>
        </div>
        <!-- 展开更多 -->
        <p class="more" v-if="pullflag">{{pullDownMsg}}</p>
      </div>
      <router-view></router-view>
    </scroller>
    <Tab />
  </div>
</template>

<script>
import kong from "@/components/kong.vue";
import Tab from "@/components/TabBar";
import mechanitem from "@/components/Home/Mechanism.vue";
import tabNav from "@/components/Home/Centernav.vue";
import Swiper from "../../../static/css/swiper.min";
import "../../../static/css/swiper.min.css";
export default {
  name: "homedd",
  data() {
    return {
      slideList: [], //轮播图容器
      scrollWay: "horizontal", // vertical  horizontal
      //   itemStr: 'title',
      dataArr: [],
      navWH: 0,
      scrollMargin: 0,
      colorText: "#999",
      colorBack: "#fff",
      colorActiveText: "#36b936",
      colorActiveBack: "",
      activeIndex: 0,
      list: [],
      page: 1,
      xuan: 1,
      payload: true,
      pullDownMsg: "",
      pullflag: true,
      kongflag: false
    };
  },
  components: {
    Tab,
    tabNav,
    kong,
    mechanitem
  },
  mounted() {
      this.payload = true;
      this.page = 1;
    this.cc();
    this.getalist();
    //this.getmechanlist(this.xuan, this.page);
  },
  methods: {
    handleToScroll(pos) {
        // console.log(this.payload)
      //上拉加载 总高度>下拉的高度+数值(20仅供参考) 触发加载更多

          // console.log(this.payload)
        this.pullDownMsg = "上拉加载...";
        if (this.$refs.aa.scroll.y <= this.$refs.aa.scroll.maxScrollY + 20) {
          //使用refresh 方法 来更新scroll 解决无法滚动的问题
          this.page++;
          this.$nextTick(() => {
              if (this.payload) {
                 this.getmechanlist(this.xuan, this.page);
              }else{
                  this.pullDownMsg = "精彩课程待更新...";
              }
            this.$refs.aa.scroll.refresh();
          });
        }

    },
    //获取首页分类
    getalist() {
      this.axios.get("/api/api/school/getScate").then(res => {
        if (res.data.code == 200) {
          this.dataArr = res.data.list;
          this.xuan = this.dataArr[0].id;
            this.getmechanlist(this.xuan,this.page);
            // console.log(111);
        }
      });
    },
    // 获取首页列表
    getmechanlist(cid, page) {
      if (this.payload) {
        this.axios
          .get("/api/api/school/getSlist", {
            params: {
              cid: cid,
              p: page
            }
          })
          .then(res => {
            if (res.data.code == 200) {
               this.kongflag=false
              if (res.data.list) {
                res.data.list.forEach(item => {
                  this.list.push(item);
                });
                if (this.page >= 1 && res.data.list.length < 10) {
                  this.pullflag = true;
                  this.pullDownMsg = "精彩课程待更新...";
                }
              }
            }else if(res.data.code==400){
              // this.kongflag=true;
               this.payload = false;
                this.pullflag = true;
            }else{
                this.kongflag=true;
                this.payload = false;
                this.pullflag = false;
            }
          });
      }
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
        touchStartStopPropagation: true
      });
    },
    chooseItem(val) {
      this.page = 1;
      this.payload = true;
      this.list = [];
      this.activeIndex = val[0];
      this.xuan = this.dataArr[this.activeIndex].id;
      this.getmechanlist(this.xuan, this.page);
    },

    //获取轮播图
    cc() {
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
  background: #f8f8f8;
  padding-bottom: 0.2rem;
 
  .searchbody {
    background: #fff;
    padding: 0.3rem 0 0.1rem;
    .search {
      width: 7.1rem;
      height: 0.74rem;
      background: #fff;
      border: 0.02rem solid #d5d5d5;
      border-radius: 0.1rem;
      margin: 0 auto;
      display: flex;
      align-items: center;
      font-size: 0.28rem;
      color: #999;
      img {
        width: 0.3rem;
        margin: 0 0.2rem 0 0.3rem;
      }
    }
  }
  .picbody {
    margin: 0 0.25rem 0.2rem;
    .swiper-container {
      width: 100%;
      height: 2.54rem;
      border-radius: 0.2rem;
      overflow: hidden;
      img {
        width: 100%;
        height: 2.54rem;
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
  .top_body {
    margin: 0.2rem 0.25rem;
    h3 {
      font-size: 0.32rem;
      color: #333;
      font-weight: bold;
      line-height: 0.7rem;
    }
    .listitem {
      position: relative;
    }
    .pai {
      position: absolute;
      top: 0rem;
      right: 0.2rem;
      img {
        width: 0.53rem;
        height: 0.62rem;
      }
      font {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        border: 0.02rem solid #d2d2d2;
        display: block;
        text-align: center;
        line-height: 0.5rem;
        font-size: 0.3rem;
        color: #999999;
        font-weight: bold;
      }
      .smalltop {
        margin-top: 0.2rem;
      }
    }
  }
}

</style>
