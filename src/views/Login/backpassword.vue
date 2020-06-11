<template>
  <div class="login">
    <h2>找回密码</h2>
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
    <InputGroup type="number" v-model="verifyCode" placeholder="请输入验证码" :error="errors.code" fontclass="font4"/>
    <!-- 第一次输入密码 -->
    <InputGroup type="text" v-model="passwd1" placeholder="请输入6-12位数字和字母组合形式" :error="errors.passwd1"
                fontclass="font2"/>
    <!-- 第二次输入密码 -->
    <InputGroup type="text" v-model="passwd2" placeholder="再次输入密码" :error="errors.passwd2" fontclass="font2"/>
    <!-- 登录按钮 -->
    <div class="login_btn">
      <button @click="handleLogin">确定</button>
    </div>
    <p v-show="successflag">密码设置成功</p>
  </div>
</template>

<script>
    import InputGroup from "@/components/InputGroup";

    export default {
        name: "login",
        data() {
            return {
                phone: "",
                verifyCode: "",
                passwd1: "",
                passwd2: "",
                errors: {},
                btnTitle: "获取验证码",
                disabled: false,
                fontclass: 'fa fa-mobile',
                lock: "fa fa-codepen",
                successflag:false
            };
        },
        computed: {},
        methods: {
            // 确定
            handleLogin() {
                // 发送请求
                if (!this.validatePhone() || !this.validatePassword()) {
                    return false;
                }
                this.axios.post("/api/api/user/Cpasswd", {
                    phone: this.phone,
                    code: this.verifyCode,
                    passwd1: this.passwd1,
                    passwd2: this.passwd2
                }).then(res => {
                        console.log(res)
                        if (res.data.statu == 200) {
                        this.successflag=true;
                            //登录成功
                            setTimeout(()=>{
                                this.$router.push("/login");
                            },1000)
                        } else {
                            this.errors = {
                                passwd2: res.data.msg
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
                        phone: "手机号码不能为空"
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
                if (!this.passwd1) {
                    this.errors = {
                        passwd2: "密码不能为空哦"
                    };
                    return false;
                } else if (!/^[\w]{6,12}$/.test(this.password)) {
                    this.errors = {
                        passwd2: "密码必须由6-12位数字加字母组成哦"
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

<style scoped>
  .login {
    padding-top: 10vh;
    padding: 10vh 0.6rem 0;
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
  .login>P{
    width:3rem;
    background:rgba(0,0,0,0.6);
    height:0.8rem;
    line-height:0.8rem;
    border-radius:0.1rem;
    color:#fff;
    position: fixed;
    top:50%;
    left:50%;
    margin-top:-0.4rem;
    margin-left:-1.5rem;
    text-align: center;
  }
</style>
