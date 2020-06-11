<template>
  <div class="feedback">
    <textarea placeholder="老师认真负责" v-model="feedmassage"></textarea>
    <button @click="tofankui">提交</button>
  </div>
</template>

<script>
export default {
  name: "feedback",
  data() {
    return {
      feedmassage: ""
    };
  },
  methods: {
    // 下面浮窗点赞
    tofankui() {
      this.axios
        .post("/api/api/My/fankui", {
          content: this.feedmassage
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$toast("反馈成功");
          } else if (res.data.code == 205) {
            //未登录
            this.$router.push("/login");
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
.feedback {
  flex: 1;
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 1.2rem;
  background: #fff;
  width: 100%;
  z-index: 2;
  display: flex;
  align-items: center;
  flex-direction: column;
  textarea {
    width: 6.9rem;
    height: 3.9rem;
    background: #f8f8f8;
    border: 0.02rem solid #e7e7e7;
    border-radius: 0.2rem;
    display: flex;
    padding: 0.15rem 0.2rem;
    box-sizing: border-box;
    margin: 0.5rem 0;
    color: #333;
    font-size:0.28rem
  }
  button {
    width: 2.8rem;
    height: 0.9rem;
    background: #36b936;
    border-radius: 0.4rem;
    color: #fff;
    font-size: 0.3rem;
  }
}
</style>