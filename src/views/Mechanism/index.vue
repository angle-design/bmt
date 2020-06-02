<template>
  <div id="main">
    <div class="content">
      <scroller>
        <div>
          <div>
            <span>
              <font>*</font>机构名称
            </span>
            <input type="text" v-model="name" v-drop />
            <font v-if="nameflag">你还没有填此项</font>
          </div>
          <div>
            <span>
              <font>*</font>主打课程
            </span>
            <input type="text" v-model="kecheng" v-drop />
            <font v-if="kechengflag">你还没有填此项</font>
          </div>
          <div>
            <span>
              <font>*</font>性质
            </span>
            <select v-model="xingzhi">
            <option>线下课程</option>
              <option>线上课程</option>
              <option>国际学校</option>
              <option>其他</option>
            </select>
          </div>
          <div>
            <span>
              <font>*</font>机构联系人
            </span>
            <input type="text" v-drop v-model="lianxiren" />
            <font v-if="lianxirenflag">你还没有填此项</font>
          </div>
          <div>
            <span>
              <font>*</font>职务
            </span>
            <input type="text" v-model="zhiwu" v-drop />
            <font v-if="zhiwuflag">你还没有填此项</font>
          </div>
          <div>
            <span>
              <font>*</font>手机
            </span>
            <input type="number" v-model="phone" v-drop />
            <font v-if="phoneflag">你还没有填此项</font>
          </div>
          <div>
            <span>机构网站</span>
            <input type="text" v-model="wangzhan" v-drop />
          </div>
          <div>
            <span>微信号</span>
            <input type="text" v-model="weixin" v-drop />
          </div>
          <div>
            <span>地址</span>
            <input type="text" v-model="dizhi" v-drop />
          </div>
          <div class="message">
            <span>留言</span>
            <textarea type="text" v-model="liuyan" cols="5" v-drop />
          </div>
          <button @tap="toSummit()">提交</button>
          <p>
            咨询电话：
            <a href="tel:13810087890">13810087890</a>
          </p>
        </div>
      </scroller>
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
export default {
  name: "mechanism",
  data() {
    return {
      name: "",
      nameflag: false,
      kecheng: "",
      kechengflag: false,
      xingzhi: "线下课程",
      lianxiren: "",
      lianxirenflag: false,
      zhiwu: "",
      zhiwuflag: false,
      phone: "",
      phoneflag: false,
      wangzhan: "",
      weixin: "",
      dizhi: "",
      liuyan: "",
      pupflage: false
    };
  },
  components: {
    Tab
  },
  mounted() {
    // console.log(this.xingzhi)
  },
  watch: {
    name(newval) {
      if (newval != "") {
        this.nameflag = false;
      }
    },
    kecheng(newval) {
      if (newval != "") {
        this.kechengflag = false;
      }
    },
    lianxiren(newval) {
      if (newval != "") {
        this.lianxirenflag = false;
      }
    },
    zhiwu(newval) {
      if (newval != "") {
        this.zhiwuflag = false;
      }
    },
    phone(newval) {
      if (newval != "") {
        this.phoneflag = false;
      }
    }
  },
  methods: {
    close() {
       this.$router.push("/home");
      this.pupflage = false;
    },
    toSummit() {
      this.axios
        .post(
          "/api/api/index/addJg",
          this.qs.stringify({
            name: this.name.trim(),
            kecheng: this.kecheng.trim(),
            xingzhi: this.xingzhi.trim(),
            lianxiren: this.lianxiren.trim(),
            zhiwu: this.zhiwu.trim(),
            phone: this.phone.trim(),
            wangzhan: this.wangzhan.trim(),
            weixin: this.weixin.trim(),
            dizhi: this.dizhi.trim(),
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
          if (this.kecheng == "") {
            this.kechengflag = true;
          }
          if (this.zhiwu == "") {
            this.zhiwuflag = true;
          }
          if (this.lianxiren == "") {
            this.lianxirenflag = true;
          }
          if (this.phone == "") {
            this.phoneflag = true;
          }
          if (res.data.code == 200) {
            this.pupflage = true;
          }
        });
    }
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
  width: 6.45rem;
  margin: 0 auto 1.2rem;
  font-size: 0.3rem;
  // padding: 0.4rem 0 1.2rem 0;
  box-sizing: border-box;
  div {
    div {
      padding-top: 0.5rem;
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
        font {
          font-size: 0.24rem;
          color: #f60909;
          position: absolute;
          bottom: 0.05rem;
          right: 0;
          width: 4.45rem;
        }
        select {
          appearance: none;
          padding: 0 0.2rem;
          background: #f1f1f1 url("../../../static/images/jiantou.png")
            no-repeat calc(100% - 10px) center;
          padding-right: 0.25rem;
          background-size: 0.14rem 0.07rem;
          &::-ms-expand {
            display: none;
          }
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
        margin: 0.2rem 0 0.4rem;
        padding-bottom: 0.2rem;
        a {
          color: #666;
        }
      }
    }
  }
}
</style>
