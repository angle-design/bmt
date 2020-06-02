<template>
  <div class="login">
    <h2>设置新密码</h2>
    <InputGroup type="text" v-model="prevpassword" placeholder="6-12位由数字、字母、符号任意两种组合形式" :error="errors.code" />
    <!-- 验证码 -->
    <InputGroup type="number" v-model="nextpassword" placeholder="再次输入密码" :error="errors.nextpassword"/>

    <!-- 忘记密码 -->
    <router-link tag="p" to="/backpassword" class="forget">忘记密码?</router-link>
    <!-- 登录按钮 -->
    <div class="login_btn">
      <button>确认</button>
    </div>
  </div>
</template>

<script>
import InputGroup from "@/components/InputGroup";
export default {
  name: "login",
  data() {
    return {
      prevpassword:"",
      nextpassword: "",
      errors: {},
      disabled: false,
    };
  },
  computed: {
   
  },
  methods: {
  
  },
  components: {
    InputGroup
  }
};
</script>

<style scoped>
.login{
    padding-top:10vh;
    padding:10vh 0.6rem 0;
}
.forget,.register{
    font-size:0.26rem;
    color:#666666;
    line-height:0.6rem;
    width:1.4rem;
    float: right;
}
.register{
    font-size:0.3rem;
    color:#369836;
    width:100%;
    text-align: right;
    letter-spacing: 0.1rem;
    margin-bottom:0.3rem;
}
.register span{
    padding:0.2rem 0.2rem;
}
.login h2{
    line-height:0.6rem;
}
.text_group,
.login_des,
.login_btn {
  margin-top:0.58rem;
}
.login_btn{
    margin-top:2rem;
}

.login_des {
  color: #aaa;
  line-height: 22px;
}
.login_des span {
  color: #4d90fe;
}
.login_btn button {
  width:6.3rem;
  height:0.9rem;
  background-color: #369836;
  border-radius:0.6rem;
  color: #fff;
  font-size: 0.3rem;
  border: none;
  outline: none;
}
.login_btn span{
    font-size:0.3rem;
    color:#666666;
    margin-top:0.1rem;
    display: block;
    padding-left:0.2rem;
}
.login_btn button[disabled] {
  background-color: #8bda81;
}
</style>
