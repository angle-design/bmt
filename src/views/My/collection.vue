<template>
  <div class="collection">
    <div class="collect_top">
      <router-link tag="span" to="/my/collection/jigou">机构</router-link>
      <router-link tag="span" to="/my/collection/lesson">课程</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import lessonitem from "@/components/Home/Lessonitem.vue";
import mechanitem from "@/components/Home/Mechanism.vue";
export default {
  name: "collection",
  data() {
    return {
      active: 1,
      list: []
    };
  },
  mounted() {},
  methods: {},
  components: {}
};
</script>

<style lang="less" scoped>
.collection {
  flex: 1;
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  width: 100%;
  z-index: 2;
  // padding-top: 1rem;
  height: 100%;
  box-sizing: border-box;
  overflow-x: hidden;

  .collect_top {
    display: flex;
    align-items: center;
    padding: 0 0.4rem 0;
    color: #efeeee;
    position: absolute;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    background: #fff;
    box-sizing: border-box;
    span {
      display: flex;
      justify-content: center;
      flex: 1;
      position: relative;
      font-size: 0.3rem;
      color: #999999;
      padding: 0.2rem 0.4rem 0.3rem;
      &.router-link-active {
        color: #36b936;
        &.router-link-active:after {
          content: "";
          position: absolute;
          width: 0.3rem;
          height: 0.08rem;
          // background:#efeeee;
          background: #36b936;
          bottom: 0.1rem;
          border-radius: 0.3rem;
          left: 50%;
          margin-left: -0.15rem;
        }
      }
    }
  }
}
</style>

<!--<template>
  <div id="app">
    <ul>
      <li v-for="(tab,index) in tabs" @click="toggle(index,tab.view)" :class="{active:active==index}">
        {{tab.type}}
      </li>
    </ul>
    :is实现多个组件实现同一个挂载点
    <component :is="currentView"></component>
  </div>
</template>

<script>
import tab1 from './components/tabs/tab1.vue'
import tab2 from './components/tabs/tab2.vue'
export default {
  name: 'app',
  data(){
    return {
      active:0,
      currentView:'tab1',
      tabs:[
        {
          type:'tab1',
          view:'tab1'
        },
        {
          type:'tab2',
          view:'tab2'
        }
      ]
    }
  },
  methods:{
    toggle(i,v){
      this.active=i;
      this.currentView=v;
    }
  },
  components:{
    tab1,
    tab2
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
ul{
  width:200px;
  display:flex;
}
ul li{
  width:100px;
  height:40px;
  background: #ccc;
  display: inline-flex;
  border-right:1px solid #ddd;
  justify-content: center;
  align-items: center;  cursor:pointer
}
ul li.active{
 background:#333;
}
</style>
