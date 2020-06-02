<template>
  <div id="main">
    <div class="content">
      <!-- <scroller> -->
      <div>
        <div>
          <span>
            <font>*</font>姓名
          </span>
          <input type="text" v-drop v-model="name" />
          <font v-if="nameflag">你还没有填此项</font>
        </div>
        <div>
          <span>
            <font>*</font>电话
          </span>
          <input type="text" v-drop v-model="phone" />
          <font v-if="phoneflag">你还没有填此项</font>
        </div>
        <div class="place">
          <span>地区</span>
          <div class="placebody">
            <City ref="cityData" />
            <input type="text" v-drop v-model="dizhi" />
          </div>
        </div>
        <div>
          <span>性质</span>
          <select v-model="xingzhi">
           <option>线下课程</option>
              <option>线上课程</option>
              <option>国际学校</option>
              <option>其他</option>
          </select>
        </div>
        <div class="message">
          <span>留言</span>
          <textarea type="text" cols="5" v-drop v-model="liuyan" />
        </div>
        <button @click="toSummit">提交</button>
        <p>
          咨询电话：
          <a href="tel:13810087890">13810087890</a>
        </p>
      </div>
      <!-- </scroller> -->
    </div>
    <Tab />
    <div class="pup" v-show="pupflage">
      <div class="pup_con">
        <p>报名成功</p>
        <button @touchstart="close()">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import Tab from "@/components/TabBar";
import City from "@/components/City";
export default {
  name: "movie",
  data() {
    return {
      name: "",
      nameflag: false,
      phone: "",
      phoneflag: false,
      xingzhi: "线下课程",
      dizhi: "",
      liuyan: "",
      pupflage: false
    };
  },
  watch: {
    name(newval) {
      if (newval != "") {
        this.nameflag = false;
      }
    },
    phone(newval) {
      if (newval != "") {
        this.phoneflag = false;
      }
    }
  },
  mounted() {
    console.log(this.$refs.cityData.a);
  },
  methods: {
    close() {
      this.$router.push("/home");
      this.pupflage = false;
    },
    toSummit() {
      this.axios
        .post(
          "/api/api/index/addLy",
          this.qs.stringify({
            name: this.name.trim(),
            phone: this.phone.trim(),
            sheng: this.$refs.cityData.a[0],
            shi: this.$refs.cityData.a[1],
            xian: this.$refs.cityData.a[0],
            dizhi: this.dizhi.trim(),
            xingzhi: this.xingzhi.trim(),
            liuyan: this.liuyan.trim()
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(res => {
          if (this.name == "") {
            this.nameflag = true;
          }
          if (this.phone == "") {
            this.phoneflag = true;
          }
          if (res.data.code == 200) {
            this.pupflage = true;
          }
        });
    }
  },
  components: {
    Tab,
    City
  }
};
</script>

<style scoped lang="less">
.content {
  flex: 1;
  overflow: auto;
  // margin-bottom: 1.2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  widows: 6.45rem;
  margin: 0 auto 0.5rem;
  font-size: 0.3rem;
  padding: 0.4rem 0 1.2rem 0;
  box-sizing: border-box;
  div {
    div {
      height: 0.7rem;
      display: flex;
      justify-content: space-between;
      padding: 0 0 0.4rem;
      align-items: center;
      position: relative;
      span {
        display: flex;
        justify-content: flex-end;
        margin-right: 0.2rem;
        width: 1.78rem;
        height: 0.7rem;
        align-items: center;
        font {
          color: #f60909;
          margin-right: 0.1rem;
                position: static;
            display: inline;
            width:auto;
        }
      }
      input,
      select,
      textarea {
        width: 4.45rem;
        height: 0.7rem;
        background: #f1f1f1;
        border: 0.02rem solid #d6d6d6;
        border-radius: 0.15rem;
        padding: 0.2rem;
        box-sizing: border-box;
        font-size: 0.3rem;
      }
      select {
        appearance: none;
        padding: 0 0.2rem;
        /*在选择框的最右侧中间显示小箭头图片*/
        background: #f1f1f1 url("../../../static/images/jiantou.png") no-repeat
          calc(100% - 10px) center;
        /*为下拉小箭头留出一点位置，避免被文字覆盖*/
        padding-right: 0.25rem;
        background-size: 0.14rem 0.07rem;
        &::-ms-expand {
          display: none;
        }
      }
      font {
        font-size: 0.24rem;
        color: #f60909;
        position: absolute;
        bottom: 0.05rem;
        right: 0;
        width: 4.45rem;
      }

      &.message {
        height: auto;
        align-items: flex-start;
        span {
          align-items: center;
        }
        textarea {
          height: 2rem;
        }
      }
      &.place {
        height: auto;
        padding: 0 0 0.4rem;
        align-items: flex-start;
        span {
          align-items: center;
          line-height: 0.7rem;
          margin-top: 0.2rem;
        }
        .placebody {
          display: flex;
          flex-wrap: wrap;
          width: 4.45rem;
          height: auto;
          padding: 0;
          div {
            padding: 0;
            height: auto;
          }
          input {
            margin-top: 0.1rem;
          }
        }
      }
    }
    button {
      width: 100%;
      height: 0.84rem;
      background: #ffbc00;
      color: #fff;
      line-height: 0.84rem;
      text-align: center;
      border-radius: 0.15rem;
      font-size: 0.36rem;
      font-weight: bold;
      margin-top: 0.2rem;
    }
    p {
      color: #666;
      text-align: center;
      line-height: 0.7rem;
      margin: 0.2rem 0 0rem;
      a {
        color: #666;
      }
    }
  }
}
</style>
