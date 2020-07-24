<!--  -->
<template>
  <div class="content">
    <div class="details_top">
      <img :src="lesson.image" />
      <p>
        <span>
          {{lesson.name}}
          <span>
            ￥
            <font>{{lesson.price}}</font>
          </span>
        </span>
        <i :class="[collectflag?'fa fa-star':'fa fa-star-o']" @click="toCollect"></i>
      </p>
    </div>
    <div class="details_con">
      <div>
        <h3>适用对象</h3>
        <p v-html="lesson.objects"></p>
      </div>
      <div>
        <h3>课程特色</h3>
        <p v-html="lesson.features"></p>
      </div>
      <div>
        <h3>课程简介</h3>
        <p v-html="lesson.content"></p>
      </div>
    </div>
    <div class="fix_bottom">
      <button @click="handlemessage(lesson.sid,lesson.id)" v-if="signupflag">立即报名</button>
      <button v-else>已报名</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      lesson: {},
      collectflag: false,
      signupflag:''
    };
  },
  mounted() {
    this.getDetails();
  },
  created() {
    // 看看用户是不是收藏了
    this.axios
      .post("/api/api/school/checkiscollect", {
        type: 2,
        sid: this.$route.query.id
      })
      .then(res => {
        if (res.data.code == 200) {
          this.collectflag = true;
        }
      });
    this.axios
      .get("/api/api/school/checkmycourse", {
        params:{
          cid: this.$route.query.id
        }
        
      })
      .then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.signupflag = false;
        }else{
           this.signupflag = true;
        }
      });
  },
  methods: {
    // 收藏
    toCollect() {
      this.axios
        .post("/api/api/school/schoolCollect", {
          type: 2,
          sid: this.$route.query.id
        })
        .then(res => {
          // console.log(res.data.list.status);
          if (res.data.code == 200) {
            if (res.data.list.status == 2) {
              this.collectflag = false;
              return false;
            } else if (res.data.list.status == 1) {
              this.collectflag = true;
              this.$toast("收藏成功");
            }
          } else if (res.data.code == 205) {
            //未登录
            this.$router.push("/login");
          }
        });
    },
    // 进入立即注册
    handlemessage(id, cid) {
      this.$router.push({ name: "signup2", query: { id: id, cid: cid } });
    },
    getDetails() {
      this.axios
        .get("/api/api/school/getCinfo", {
          params: {
            courseid: this.$route.query.id
          }
        })
        .then(res => {
          // console.log(res.data)
          if (res.data.code == 200) {
            this.lesson = res.data.list;
            document.title = this.lesson.name
          }
        });
    }
  },
  components: {}
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
  .details_top {
    border-bottom: 0.18rem solid #f8f8f8;
    img {
      height: 3.8rem;
      width: 100%;
    }
    p {
      display: flex;
      justify-content: space-between;
      padding: 0.2rem 0.3rem;
      font-size: 0.3rem;
      color: #333;
      align-items: center;
      span {
        span {
          margin-top: 0.1rem;
          display: block;
          color: #ff610f;
          font-size: 0.24rem;
          font {
            font-size: 0.4rem;
          }
        }
      }
      i {
        color: #9a9a9a;
        font-size: 0.4rem;
        &.fa-star {
          color: #ffae00;
        }
      }
    }
  }
  .details_con {
    margin: 0 0.3rem 0;
    div {
      margin-top: 0.3rem;
      h3 {
        padding-left: 0.2rem;
        font-size: 0.28rem;
        color: #333;
        position: relative;
        font-weight: 600;
        &:after {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          margin-top: -0.09rem;
          width: 0.06rem;
          height: 0.17rem;
          background: #ffbc00;
          border-radius: 0.3rem;
        }
      }
      p {
        font-size: 0.28rem;
        color: #666666;
        padding: 0.1rem 0.2rem 0;
      }
    }
  }
  .fix_bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    box-shadow: 0.03rem 0 0.13rem rgba(41, 41, 41, 0.15);
    button {
      width: 6.3rem;
      height: 0.9rem;
      border-radius: 0.6rem;
      background: #36b936;
      color: #fff;
      font-size: 0.32rem;
    }
  }
}
</style>
