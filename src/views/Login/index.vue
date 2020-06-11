<template>
  <div class="login">
    <router-link tag="p" to="/register" class="register">
      <span>注册</span>
    </router-link>
    <h2>欢迎登录</h2>
    <template v-if="flag">
      <InputGroup
        type="text"
        v-model="user"
        placeholder="请输入用户名"
        :error="errors.phone"
        fontclass="font1"
      />
      <!-- 密码 -->
      <InputGroup
        type="password"
        v-model="password"
        placeholder="请输入密码"
        :error="errors.password"
        fontclass="font2"
      />
    </template>
    <template v-else>
      <!-- 手机号 -->
      <InputGroup
        type="number"
        v-model="phone"
        placeholder="手机号"
        :btnTitle="btnTitle"
        :disabled="disabled"
        :error="errors.phone"
        fontclass="font3"
        @btnClick="getVerifyCode"
      />
      <!-- 验证码 -->
      <InputGroup
        type="number"
        v-model="verifyCode"
        placeholder="请输入验证码"
        :error="errors.code"
        fontclass="font4"
      />
    </template>
    <!-- 忘记密码 -->
    <router-link tag="p" to="/backpassword" class="forget">忘记密码?</router-link>
    <!-- 登录按钮 -->
    <div class="login_btn">
      <button @click="handleLogin">登录</button>
      <span v-if="flag" @click="flag=false">验证码登录</span>
      <span v-else @click="flag=true">账号密码登录</span>
    </div>
  </div>
</template>

<script>
import InputGroup from "@/components/InputGroup";
export default {
  name: "login",
  data() {
    return {
      flag: true,
      user: "", //用户名
      phone: "", //手机
      password: "", //密码
      errors: {}, //错误信息
      verifyCode: "", //验证码
      btnTitle: "获取验证码",
      disabled: false,
      fontclass: "fa fa-user-o",
      lock: "fa fa-unlock-alt",
      btnTitle: "获取验证码"
    };
  },
  computed: {},
  methods: {
    // 登录
    handleLogin() {
        if(this.flag){
            this.axios
                .post("/api/api/user/login", {
                    phone: this.user,
                    passwd:this.password
                })
                .then(res => {
                    if (res.data.statu == 200) {
                        //登录成功
                        // 存储登录状态
                        // localStorage.setItem("ele_login", true);
                         this.$router.go(-1);
                    } else {
                        this.errors = {
                            password: res.data.msg
                        };
                    }
                })
                .catch(err => {
                    // 返回错误信息
                });
        }else{
            this.axios
                .post("/api/api/user/Ylogin", {
                    phone: this.phone,
                    code:this.verifyCode
                })
                .then(res => {
                    if (res.data.statu == 200) {
                         // 存储登录状态
                        localStorage.setItem("ele_login", true);
                        this.$router.push("/home");
                    } else {
                        this.errors = {
                            code: res.data.msg
                        };
                    }
                })
                .catch(err => {
                    // 返回错误信息
                });
        }

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
  },
  components: {
    InputGroup
  }
};
</script>

<style scoped>
.login {
  padding-top: 10vh;
  padding: 5vh 0.6rem 0;
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
  margin-top: 2rem;
}

.login_des {
  color: #aaa;
  line-height: 22px;
}
.login_des span {
  color: #4d90fe;
}
.login_btn button {
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
  background-color: #8bda81;
}
</style>
