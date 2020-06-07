<!--  -->
<template>
  <div class="pup" v-if="flag" @click.self="$emit('pupClick')">
    <div class="pup_con">
      <textarea
        type="text"
        v-drop
        @input="descInput"
        placeholder="写评论"
        v-model="comtext"
        maxlength="800"
      ></textarea>
      <P>
        <font>{{remnant}}/800</font>
        <span  @click="$emit('toSend',comtext)">发表</span>
      </P>
    </div>
  </div>
</template>

<script>
import { Popup } from "mint-ui";
export default {
  name: "Input",
  props: {
    flag: Boolean,
  },
  data() {
    return {
      comtext: "",
      remnant: 0
    };
  },
  methods: {
    descInput() {
      var txtVal = this.comtext.length;
      this.remnant = txtVal
    }
  }
};
</script>

<style lang='less' scoped>
.pup {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  .pup_con {
    width: 100%;
    height: 3.04rem;
    background: #fff;
    border-radius: 0;
    position: fixed;
    padding-top: 0.3rem;
    bottom: 0;
    textarea {
      border: 0.02rem solid #ededed;
      width: 7rem;
      height: 2.08rem;
      border-radius: 0.1rem;
      padding: 0.1rem;
      line-height: 0.4rem;
      font-size: 0.28rem;
    }
    p {
      display: flex;
      justify-content: flex-end;
      padding-right: 0.3rem;
      color: #999;
      align-content: flex-start;
      line-height: 0.6rem;
      height: 1rem;
      span {
        color: #3abaf0;
        margin-left: 0.2rem;
      }
    }
  }
}
</style>
