<template>
  <div class="text_group">
    <!-- 组件结构 -->
    <!-- 组件容器 -->
    <div class="input_group" :class="{'is-invalid':error}">
      <!-- 小图标 -->
      <i  :class="fontclass" v-if="fontclass"></i>
       <!-- fa-unlock-alt -->
      <!-- 输入框 -->
      <input
        :type="type"
        :value="value"
        :placeholder="placeholder"
        :name="name"
        @input="$emit('input',$event.target.value)"
        v-drop
      >
      <!-- 输入框后面的按钮 -->
      <button v-if="btnTitle" :disabled="disabled" @click="$emit('btnClick')">{{btnTitle}}</button>
    </div>
    <!-- 错误提醒 -->
    <div v-if="error" class="invalid-feedback">{{error}}</div>
  </div>
</template>

<script>
export default {
  name: "inputGroup",
  props: {
    type: {
      type: String,
      default: "text"
    },
    value: String,
    fontclass:String,
    placeholder: String,
    name: String,
    btnTitle: String,
    disabled: Boolean,
    error: String
  }
};
</script>

<style scoped lang="less">
.input_group {
  border: 1px solid #cdcdcd;
  border-radius:0.4rem;
  padding:0.15rem 0.2rem;
  height:0.88rem;
  display: flex;
  flex-direction: row;
  // justify-content: space-between;
  box-sizing: border-box;
  align-items: center;
  position: relative;
 
}

 i{
    color:#cdcdcd;
    font-size:0.4rem;
    width:0.4rem;
  }
.input_group input{
  height: 100%;
  width: 90%;
  outline: none;
  font-size:0.3rem;
  margin-left:0.2rem;
}
.input_group input::-webkit-input-placeholder{/*Webkit browsers*/
  color:#cdcdcd;
  font-size:0.26rem;
}
.input_group button {
  border: none;
  outline: none;
  color:#369836;
  position: absolute;
  right:0.2rem;
  top:0;
  height:100%;
  width:2rem;
  font-size:0.26rem
}
.input_group button[disabled] {
  color: #aaa;
}
.is-invalid {
  // border: 1px solid red;
}
.invalid-feedback {
  color: red;
  padding-top:0.1rem;
  font-size:0.26rem;
  padding-left:0.1rem;
  width:4rem;
  float: left;
}
</style>
