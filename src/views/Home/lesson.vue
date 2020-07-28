<!--  -->
<template>
  <div class="lesson">
     <scroller>
    <div>
    <div class="lesson_body">
      <div class="lesson_top">
        <div>
          <h4>{{lesson.name}}</h4>
          <p>
            <img src="../../assets/zan.png" />
            <font>{{lesson.cnum}}人</font>参与投票
          </p>
        </div>
        <span>
          <i :class="[collectflag?'fa fa-star':'fa fa-star-o']" @click="toCollect"></i>
          <!-- <i class="fa fa-share-square-o"></i> -->
        </span>
      </div>
      <SwiperLeft
        v-if="lesson.piclist"
        :videolist="lesson.piclist"
        :len="lesson.piclist.length"
        @toVideo="toVideo"
      />
    </div>
    <!-- 列表 -->

    <div class="lesson_con" v-if="dataArr.length">
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
      <!--<div class="item_list" v-if="data2Arr">-->
        <!--<span v-if="c2list"-->
          <!--v-for="(c2list,i) in data2Arr"-->
          <!--:key="i"-->
          <!--:class="c2idindex==i?'active':''"-->
          <!--@click="csidclick(i)"-->
        <!--&gt;{{c2list.name}}</span>-->
      <!--</div>-->
      <ul>
        <li v-for="(lesson,index) in lessonlist" :key="index">
          <lessonitem :list="lesson" :ceflag="true"></lessonitem>
        </li>
      </ul>
    </div>
    <!-- 评价 -->
    <div class="lesson_star">
      <h4>我要评价</h4>
      <ul>
        <li
          v-for="(zan,index) in zanlist"
          :key="index"
          @click="tagzan(index)"
          :class="[zan.check?'active1':'']"
          ref="tagzan"
        >
          {{zan.name}}
          <i class="fa fa-thumbs-up"></i>
        </li>
      </ul>
      <div>
        <p>
          <textarea placeholder="老师认真负责" v-drop v-model="comtext" @input="descInput"></textarea>
          <span>
            还剩
            <font>{{remnant}}</font>字~
          </span>
        </p>
        <button @click="commit">提交</button>
      </div>
    </div>
    <div class="video_pup" v-if="videoflag">
      <video :src="video" controls="controls" autoplay>您的浏览器不支持 video 标签。</video>
      <i class="fa fa-times-circle" @click="videoflag=false"></i>
    </div>
    </div>
     </scroller>
  </div>
</template>

<script>
import SwiperLeft from "@/components/Home/Swipervideo.vue";
import tabNav from "@/components/Home/Centernav.vue";
import lessonitem from "@/components/Home/Lessonitem.vue";

export default {
  name: "",
    inject:['reload'],
  data() {
    return {
      videoflag: false,
      video: "",
      sid: 0,
      comtext: "",
      remnant: 200,
      scrollWay: "horizontal", // vertical  horizontal
      //   itemStr: 'title',
      navWH: 0,
      scrollMargin: 0,
      colorText: "#999",
      colorBack: "#fff",
      colorActiveText: "#36b936",
      colorActiveBack: "",
      activeIndex: 0, //一级分类选中索引
      zanlist: [
        { name: "品牌指数", shu: 0, check: false },
        { name: "课程体系", shu: 0, check: false },
        { name: "教学成果", shu: 0, check: false },
        { name: "服务质量", shu: 0, check: false },
        { name: "师资力量", shu: 0, check: false }
      ],
      lesson: {}, //课程详情
      dataArr: [], //一级分类
      lessonlist: [], //课程列表
      id: 0, //获取二级分类id
      c2idindex: 0, //二级分类index
      data2Arr: [], //二级分类内容
      collectflag: false
    };
  },
  created() {
      this.sid = this.$route.query.id;
      this.getLessonList(this.sid);
      // 看看用户是不是收藏了
      this.axios
          .post("/api/api/school/checkiscollect", {
              type: 1,
              sid: this.$route.query.id
          })
          .then(res => {
              if (res.data.code == 200) {
                  this.collectflag = true;
              }
          });
  },
  // activated(){
  //     this.reload();
  // },
  methods: {
    // 收藏
    toCollect() {
      this.axios
        .post("/api/api/school/schoolCollect", {
          type: 1,
          sid: this.sid
        })
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            if (res.data.list.status ==2) {
              this.collectflag = false;
              return false;
            } else if (res.data.list.status ==1) {
              this.collectflag = true;
              this.$toast("收藏成功");
            }
          } else if (res.data.code == 205) {
            //未登录
            this.$router.push("/login");
          }
        });
    },
    // 点击选中评价
    tagzan(index) {
        var check = this.zanlist[index].check;
        // alert(check);
        var c = check === true ? false : true;
        this.$forceUpdate();
        this.$set(this.zanlist[index],"check",c);
        if (this.zanlist[index].check) {
            this.zanlist[index].shu = 1;
        } else {
            this.zanlist[index].shu = 0;
        }
      window.scroll(0,-1)
    },
    // 评价提交
    commit() {
      this.axios
        .post("/api/api/school/comment", {
          sid: this.$route.query.id,
          pinpai: this.zanlist[0].shu,
          kecheng: this.zanlist[1].shu,
          jiaoxue: this.zanlist[2].shu,
          fuwu: this.zanlist[3].shu,
          shizi: this.zanlist[4].shu,
          dianping: this.comtext
        })
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.$toast("评价提交成功！");
          }else if(res.data.code==205){
            this.$router.push('/login')
          }
        });
    },
    // 视频弹窗
    toVideo(data) {
      this.video = data;
      this.videoflag = true;
    },
    getLessonList(sid) {
      this.axios
        .get("/api/api/school/getSinfo", {
          params: {
            sid: sid
          }
        })
        .then(res => {
          if (res.data.code == 200) {
            this.lesson = res.data.list;
            document.title = res.data.list.name
              if(res.data.list.clist.length>0){
                  this.dataArr = res.data.list.clist;
                  this.id = this.dataArr[this.activeIndex].id;
                  this.getList(sid,this.id,0)
              }
          }
        });
    },
    getList(sid, id, c2id) {
      this.axios
        .get("/api/api/school/getCourse", {
          params: {
            sid: sid,
            cid: id,
            c2id: c2id
          }
        })
        .then(res => {
          if (res.data.code == 200) {
            this.lessonlist = res.data.list;
          }
        });
    },
    csidclick(i) {
      this.c2idindex = i;
      this.c2id = this.lesson.clist[this.activeIndex].c2list[i].id;
      this.getList(this.sid, this.dataArr[this.activeIndex].id, this.c2id);
    },
    chooseItem(val) {
      this.data2Arr=this.dataArr[val[0]].c2list;
      this.activeIndex = val[0];
      this.c2idindex = 0;
      this.getList(this.sid, this.dataArr[this.activeIndex].id,0);
    },
    descInput() {
      var txtVal = this.comtext.length;
      this.remnant = 200 - txtVal;
    }
  },
  components: {
    SwiperLeft,
    tabNav,
    lessonitem
  }
};
</script>

<style lang='less' scoped>
.scroll-nav {
  box-shadow: none !important;
  justify-content: center !important;
}
.scroll-box {
  justify-content: center !important;
}
.video_pup {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  video {
    width: 7rem;
    height: 6rem;
  }
  i {
    font-size: 0.8rem;
    color: #fff;
    margin-top: 0.3rem;
  }
}
.lesson {
  flex: 1;
  overflow: auto;
  // position: fixed;
  top: 0;
  left: 0;
bottom:0;
padding-bottom:0.3rem;
  background: #fff;
  // width: 100%;
  z-index: 12;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  .lesson_body {
    background: #f4f4f4;
    padding: 0.3rem 0;
    .lesson_top {
      display: flex;
      justify-content: space-between;
      padding: 0 0.3rem;
      & > div {
        h4 {
          font-size: 0.4rem;
        }
        p {
          font-size: 0.24rem;
          color: #aeaeae;
          margin-top: 0.2rem;
          display: flex;
          img {
            width: 0.32rem;
            height: 0.32rem;
            margin-right: 0.05rem;
          }
          font {
            color: #ffae00;
          }
        }
      }
      & > span {
        color: #9a9a9a;
        font-size: 0.4rem;
        padding-top: 0.1rem;
        i {
          margin: 0 0.15rem;
          &.fa-star {
            color: #ffae00;
          }
        }
      }
    }
  }
  .lesson_con {
    padding-top: 0.2rem;
    .item_list {
      display: flex;
      /*justify-content: center;*/
      flex-wrap:wrap;
      padding: 0 0.3rem;
      span {
        padding: 0.1rem 0.25rem;
        border-radius: 0.2rem;
        background: #f7f7f7;
        font-size: 0.26rem;
        color: #999;
        margin: 0 0.05rem 0.2rem;
        &.active {
          color: #36b936;
          background: #f0fbf0;
        }
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      margin-top: 0.4rem;
      padding-bottom: 0.4rem;
      border-bottom: 0.18rem solid #f8f8f8;
      li {
        display: flex;
        width: 3.3rem;
        height: 3.4rem;
        border: 0.02rem solid #e7e7e7;
        border-radius: 0.15rem;
        flex-direction: column;
        overflow: hidden;
        margin-left: 0.3rem;
        margin-bottom: 0.22rem;
      }
    }
  }
  .lesson_star {
    margin: 0.2rem 0.3rem;
    h4 {
      font-size: 0.32rem;
      line-height: 0.7rem;
    }
    ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        margin: 0.35rem 0.2rem 0;
        width: 2.8rem;
        height: 0.8rem;
        background: #f8f8f8;
        // background: #ccc;
        font-size: 0.28rem;
        border-radius: 0.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        &.active1 {
          background: #fef8e9;
          i {
            color: #ffbc00;
          }
        }
        i {
          color: #dadada;
          margin-left: 0.2rem;
          font-size: 0.4rem;
        }
      }
    }
    div {
      p {
        width: 6.1rem;
        height: 2.6rem;
        background: #f8f8f8;
        border: 0.02rem solid #e7e7e7;
        border-radius: 0.2rem;
        margin: 0.4rem auto 0.5rem;
        position: relative;
        textarea {
          height: 2rem;
          line-height: 0.4rem;
          padding:0.15rem 0.2rem 0;
          width: 5.7rem;
          font-size:0.26rem;
        }
        span {
          position: absolute;
          right: 0.06rem;
          bottom: 0.06rem;
          font-size: 0.24rem;
          color: #999;
          font {
            color: #ffbc00;
            margin: 0 0.05rem;
          }
        }
      }
      button {
        width: 2.7rem;
        height: 0.9rem;
        background: #36b936;
        border-radius: 0.8rem;
        font-size: 0.3rem;
        color: #fff;
        display: flex;
        margin: 0 auto 0;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
