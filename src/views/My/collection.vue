<template>
  <div class="collection">
    <div class="collect_top">
      <span :class="[active==1?'active':'']" @click="toggle(1)">机构</span>|
      <span :class="[active==2?'active':'']" @click="toggle(2)">课程</span>
    </div>
    <!-- 机构 -->
    <div class="jigou" v-if="active==1">
      <div class="listitem" v-for="(item,index) in list" :key="index">
        <mechanitem :list="item"></mechanitem>
      </div>
    </div>
    <!-- 课程 -->
    <div class="lesson" v-if="active==2">
      <ul>
        <li v-for="(lesson,index) in lessonlist" :key="index">
          <lessonitem :list="lesson" :ceflag="true"></lessonitem>
        </li>
      </ul>
    </div>
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
      list: [],
      lessonlist: []
    };
  },
  mounted() {
    this.getlist(1);
  },
  methods: {
     toggle(i) {
      this.active = i;
      this.getlist(i)
    },
    getlist(num) {
      this.axios
        .get("/api/api/my/getMycollect", {
          params: {
            type: num
          }
        })
        .then(res => {
          if (res.data.code == 200) {
            if (num == 1) {
              this.list = res.data.list;
            } else if (num == 2) {
              this.lessonlist = res.data.list;
            }
          }
        });
    }
  },
  components: {
    mechanitem,
    lessonitem
  }
};
</script>

<style lang="less" scoped>
.collection {
  flex: 1;
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 1.2rem;
  background: #fff;
  width: 100%;
  z-index: 2;
  padding-top: 1rem;
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
      &.active {
        color: #36b936;
        &:after {
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
  .jigou {
    padding: 0 0.25rem;
    .mechan {
      background: #f8f8f8;
    }
  }
  .lesson {
    ul {
      display: flex;
      flex-wrap: wrap;
      margin-top: 0.4rem;
      padding-bottom: 0.4rem;
      border-bottom: 0.18rem solid #f8f8f8;
      li {
        display: flex;
        width: 3.3rem;
        height: 3.4rem;
        border: 0.02rem solid #e7e7e7;
        border-radius: 0.15rem;
        flex-direction: column;
        overflow: hidden;
        margin-left: 0.23rem;
        margin-bottom: 0.22rem;
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
