<!--  -->
<template>
  <div class="content">
    <div class="lesson_body">
      <div class="lesson_top">
        <div>
          <h4>尚德机构</h4>
          <p>
            <img src="../../assets/zan.png" />
            <font>5000人</font>参与投票
          </p>
        </div>
        <span>
          <i class="fa fa-star-o"></i>
          <i class="fa fa-share-square-o"></i>
        </span>
      </div>
      <SwiperLeft />
    </div>
    <!-- 列表 -->
    <div class="lesson_con">
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
      <div class="item_list">
        <span class="active">数学</span>
        <span>数学</span>
        <span>数学</span>
        <span>数学</span>
        <span>数学</span>
      </div>
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
        <li v-for="(zan,index) in zanlist" :key="index" class="active">
          {{zan}}
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
        <button>提交</button>
      </div>
    </div>
  </div>
</template>

<script>
import SwiperLeft from "@/components/Home/Swipervideo.vue";
import tabNav from "@/components/Home/Centernav.vue";
import lessonitem from "@/components/Home/Lessonitem.vue";
export default {
  name: "",
  data() {
    return {
      comtext: "",
      remnant: 0,
      scrollWay: "horizontal", // vertical  horizontal
      //   itemStr: 'title',
      dataArr: [
        "小学",
        "初中",
        "少儿英语",
        "高中",
        "小学",
        "初中",
        "大学",
        "研究生",
        "初中"
      ],
      navWH: 0,
      scrollMargin: 0,
      colorText: "#999",
      colorBack: "#fff",
      colorActiveText: "#36b936",
      colorActiveBack: "",
      activeIndex: 0,
      zanlist: ["品牌指数", "课程体系", "教学成果", "服务质量", "师资力量"],
      lessonlist:
        [
          {
            'img':
              "https://zgnstatic.oss-cn-beijing.aliyuncs.com/zgnimage/20200519/f8104b454aac5c2862d0b6fa43a09e72.jpg",
            'title': "1小学数学思维训练",
            'scholl': "适用人群：小学",
            'price': 188
          },
         {
            'img':
              "https://zgnstatic.oss-cn-beijing.aliyuncs.com/zgnimage/20200519/f8104b454aac5c2862d0b6fa43a09e72.jpg",
            'title': "2小学数学思维训练",
            'scholl': "适用人群：小学",
            'price': 188
          },
         {
            'img':
              "https://zgnstatic.oss-cn-beijing.aliyuncs.com/zgnimage/20200519/f8104b454aac5c2862d0b6fa43a09e72.jpg",
            'title': "3小学数学思维训练",
            'scholl': "适用人群：小学",
            'price': 188
          },
        ] 
    };
  },
  methods: {
    chooseItem(val) {
      this.activeIndex = val[0];
    },
    descInput() {
      var txtVal = this.comtext.length;
      this.remnant = 200 - txtVal;
      console.log(200 - txtVal);
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
.content {
  flex: 1;
  overflow: auto;
  margin-bottom: 1.2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 0.2rem;
  overflow-x: hidden;
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
        }
      }
    }
  }
  .lesson_con {
    padding-top: 0.2rem;
    .item_list {
      display: flex;
      justify-content: center;
      padding: 0 0.3rem;
      span {
        padding: 0.1rem 0.25rem;
        border-radius: 0.2rem;
        background: #f7f7f7;
        font-size: 0.26rem;
        color: #999;
        margin: 0 0.1rem;
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
        background: #ccc;
        font-size: 0.28rem;
        border-radius: 0.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        &.active {
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
          padding: 0 0.2rem;
          width: 5.7rem;
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
        border-radius: 0.4rem;
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
