
<template>
  <div class="login">
    <h2>欢迎注册</h2>
    <!-- 手机号 -->
    <InputGroup
      type="number"
      v-model="phone"
      placeholder="手机号"
      :error="errors.phone"
      :fontclass="fontclass"
      :btnTitle="btnTitle"
      @btnClick="getVerifyCode"
    />
    <!-- 验证码 -->
    <InputGroup
      type="number"
      v-model="verifyCode"
      placeholder="请输入验证码"
      :error="errors.code"
      fontclass="font3"
    />
    <!-- 密码 -->
    <InputGroup
      v-model="password"
      placeholder="密码必须由6-12位数字加字母组成"
      :error="errors.password"
      fontclass="font2"
    />
      <!-- 忘记密码 -->
    <router-link tag="p" to="/backpassword" class="forget">忘记密码?</router-link>
    <!-- 登录按钮 -->
    <div class="login_btn">
      <p @click="agreementflag=true">
        <i class="fa fa-check-circle"></i>阅读并同意《报名大厅服务协议》
      </p>
      <button @click="handleLogin">确定</button>
    </div>
    <!-- 协议弹窗 -->
    <div class="pup" v-if="agreementflag" @click.self="agreementflag=false">
      <div class="agreement_con">
        <i class="fa fa-times-circle" @click="agreementflag=false"></i>
        <h3>报名大厅服务协议</h3>
        <p>国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。</p>
        <button @click="agreementflag=false">同意</button>
      </div>
    </div>
  </div>
</template>

<script>
import InputGroup from "@/components/InputGroup";
export default {
  name: "login",
  data() {
    return {
      agreementflag: false, //协议弹窗条件
      flag: true,
      phone: "", //手机
      password: "", //密码
      errors: {}, //错误信息
      verifyCode: "", //验证码
      btnTitle: "获取验证码",
      disabled: false,
      fontclass: "fa fa-user-o",
      lock: "fa fa-unlock-alt",
    };
  },
  computed: {},
  methods: {
    handleLogin() {
      // 发送请求
      if (!this.validatePhone() || !this.validatePassword()) {
        return false;
      }
        this.errors = {};
      this.axios.post("/api/api/user/register", {
          phone: this.phone,
          passwd:this.password,
          code: this.verifyCode
        })
        .then(res => {
          if(res.data.code==200){
          // 检验成功 设置登录状态并且跳转到
            this.$router.push("/login");
          }else{
            this.errors = {
              password: res.data.msg
            };
          }
        })
        .catch(err => {
          // 返回错误信息

        });
    },
    getVerifyCode() {
      if (this.validatePhone()) {
        this.validateBtn();
        // 发送网络请求
        this.axios
          .post("/api/api/user/send_SMS", {
            phone: this.phone
          })
          .then(res => {
            console.log(res);
          })
      }
    },
    validateBtn() {
      let time = 60;
      let timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer);
          this.btnTitle = "获取验证码";
          this.disabled = false;
        } else {
          // 倒计时
          this.btnTitle = time + "秒后重试";
          this.disabled = true;
          time--;
        }
      }, 1000);
    },
    // 验证手机号
    validatePhone() {
      if (!this.phone) {
        this.errors = {
          phone:"手机号码不能为空"
        };
        return false;
      } else if (!/^1[345678]\d{9}$/.test(this.phone)) {
        this.errors = {
          phone: "请填写正确的手机号码"
        };
        return false;
      } else {
        this.errors = {};
        return true;
      }
    },
    // 验证密码
    validatePassword() {
      if (!this.password) {
        this.errors = {
          password: "密码不能为空哦"
        };
        return false;
      } else if (!/^[\w]{6,12}$/.test(this.password)) {
        this.errors = {
          password: "密码必须由6-12位数字加字母组成哦"
        };
        return false;
      } else {
        this.errors = {};
        return true;
      }
    }
  },
  components: {
    InputGroup
  }
};
</script>

<style scoped lang="less">
.pup {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  .agreement_con {
    background: #fff;
    border-radius: 0.2rem;
    padding: 0.5rem 0.2rem 0.2rem;
    width: 6.6rem;
    height: auto;
    position: relative;
    i {
      font-size: 0.6rem;
      position: absolute;
      right: 0.1rem;
      top: 0.1rem;
      color: #666;
    }
    h3 {
      color: #369836;
      font-size: 0.32rem;
      height: 0.7rem;
      border-bottom: 0.02rem dashed #c5c5c5;
      margin-bottom: 0.3rem;
      text-align: center;
    }
    p {
      font-size: 0.26rem;
      line-height: 0.35rem;
    }
    button {
      width: 5.7rem;
      border-radius: 0.2rem;
      margin: 0.5rem auto 0;
      display: block;
    }
  }
}
.login {
  padding-top: 10vh;
  padding: 10vh 0.6rem 0;
}
.forget,
.register {
  font-size: 0.26rem;
  color: #666666;
  line-height: 0.6rem;
  width: 1.4rem;
  float: right;
}
.register {
  font-size: 0.3rem;
  color: #369836;
  width: 100%;
  text-align: right;
  letter-spacing: 0.1rem;
  margin-bottom: 0.3rem;
}
.register span {
  padding: 0.2rem 0.2rem;
}
.login h2 {
  line-height: 0.6rem;
}
.text_group,
.login_des,
.login_btn {
  margin-top: 0.58rem;
}
.login_btn {
  margin-top: 1.5rem;
}

.login_des {
  color: #aaa;
  line-height: 22px;
}
.login_des span {
  color: #4d90fe;
}
.login_btn p {
  line-height: 0.8rem;
  font-size: 0.24rem;
  color: #666;
  padding-left: 0.3rem;
  display: flex;
  align-items: center;
}
.login_btn p i {
  color: #369836;
  margin-right: 0.05rem;
  font-size: 0.34rem;
}
.login_btn button,
.agreement_con button {
  width: 6.3rem;
  height: 0.9rem;
  background-color: #369836;
  border-radius: 0.6rem;
  color: #fff;
  font-size: 0.3rem;
  border: none;
  outline: none;
}
.login_btn span {
  font-size: 0.3rem;
  color: #666666;
  margin-top: 0.1rem;
  display: block;
  padding-left: 0.2rem;
}
.login_btn button[disabled] {
  background-color: #d6d6d6;
}
</style>
