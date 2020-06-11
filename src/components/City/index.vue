<template>
  <div>
    <div>
      <div class="right r">
        <div class="city" @click="toAddress">
          <!-- {{city}} -->
          <span>{{a[0]}}</span>
          <span>{{a[1]}}</span>
          <span>{{a[2]}}</span>
          
        </div>
      </div>
    </div>
    <v-distpicker type="mobile" @selected="selected" v-show="addInp"></v-distpicker>
    <div class="mask" v-show="mask" @click="close"></div>
  </div>
</template>

<script>
import VDistpicker from "v-distpicker";
export default {
  name: "city",
  //定义data数据
  data() {
    return {
      city: "请选择",
      addInp: false,
      mask: false,
      a:['北京市','北京城区','朝阳区']
    };
  },
  props:["Data"],
  methods: {
    toAddress() {
      this.mask = true;
      this.addInp = true;
    },
    close() {
      this.mask = false;
      this.addInp = false;
    },
    selected(data) {
      this.mask = false;
      this.addInp = false;
      this.a =[data.province.value,data.city.value,data.area.value]
    }
  },
  components: { VDistpicker }
};
</script>

<style scoped lang="less">
.city {
  display: flex;
  flex-wrap: wrap;
   width: 4.45rem;
  span {
    background: #f1f1f1 url(../../../static/images/jiantou.png) no-repeat 90%
      center;
    background-size: 0.14rem 0.07rem;
    border: 0.02rem solid #d6d6d6;
    border-radius: 0.15rem;
    padding:0 0.2rem;
  margin:0;
    height: 0.7rem;
    line-height:0.7rem;
    
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 0.3rem;
    width:2.15rem;
    &:nth-child(1) {
    width: 4.45rem;
    margin-bottom:0.1rem;
    }
        &:nth-child(2) {
    margin-right:0.15rem;
    }
  }
}
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.5);
  z-index: 20;
}
.distpicker-address-wrapper{
  background-color: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  height: 6rem;
  z-index: 40;
  color: #333;

 
}
</style>
