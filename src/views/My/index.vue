<template>
  <div class="content">
    <!-- 首页 -->
    <div class="my">
      <p class="my_head">
         <img v-if="showflag" src="../../assets/mohead.png" />
        <img v-else :src="userinfo.a_image?userinfo.a_image:'../../assets/mohead.png'" />
       
        <span v-if="showflag" @click="$router.push('/login')">点击登录或注册</span>
        <span v-else>{{userinfo.a_uname}}</span>
      </p>
      <div class="my_hua">
        <router-link tag="p" :to="showflag?'/login':'/my/topic'"><img src="../../assets/hua.png">我的话题</router-link>
        <router-link tag="p" :to="showflag?'/login':'/my/lesson'"><img src="../../assets/ke.png">已报名课程</router-link>
      </div>
      <ul class="my_list">
        <router-link tag="li" :to="showflag?'/login':item.routeto" v-for="(item,i) in mylist" :key="i">
          <p>
           <font></font>
            {{item.name}}
          </p>
          <i class="fa fa-angle-right"></i>
        </router-link>
      </ul>
    </div>
    <!-- <router-view /> -->
    <Tab></Tab>
  </div>
</template>

<script>
import Tab from "@/components/TabBar";
export default {
  name: "my",
  data() {
    return {
      userinfo: {},
      showflag:false,
      mylist: [
        { name: "提问", classname: "fa fa-star-o", routeto: "/my/quection" },
        { name: "评论", classname: "fa fa-star-o", routeto: "/my/comment" },
        { name: "收藏", classname: "fa fa-star-o", routeto: "/my/collection" },
        { name: "反馈", classname: "fa fa-star-o", routeto: "/my/feedback" },
        { name: "设置", classname: "fa fa-star-o", routeto: "/my/setup" }
      ]
    };
  },
  created() {
    this.axios.get("/api/api/my/getUinfo").then(res => {
      console.log(res.data);
      if (res.data.code == 205) {
        //  this.showflag=true;
        
        // this.$router.push("/login");
      }
       if (res.data.code == 200) {
           this.showflag = false;
           this.userinfo = res.data.list;
       }else{
          this.showflag = true;
       }
    });
  },
  components: {
    Tab
  }
};
</script>

<style lang="less" scoped>
[v-cloak] { display: none } 
.content {
  flex: 1;
  overflow: auto;
  margin-bottom: 1.2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 0.2rem;
  background: #fff url(../../assets/top.png) no-repeat top center;
  background-size: 7.5rem 3.27rem;
  .my {
    margin: 0 0.4rem;
    .my_head {
      margin: 0.7rem 0 0.6rem;
      display: flex;
      height: 1.18rem;
      align-items: center;
      img {
        width: 1.18rem;
        height: 1.18rem;
        border-radius: 50%;
        margin-right: 0.2rem;
      }
      span {
        font-size: 0.34rem;
      }
    }
    .my_hua {
      width: 6.7rem;
      height: 1.2rem;
      margin: 0 auto;
      box-shadow: 0 0 0.16rem rgba(0, 0, 0, 0.07);
      display: flex;
      border-radius: 0.2rem;
      p {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        font-size: 0.3rem;
        img{
          width:0.37rem;
          height:0.37rem;
          margin-right:0.1rem;
        }
      }
    }
    .my_list {
      margin-top: 0.3rem;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 0.9rem;
        font-size: 0.28rem;
        p {
          display: flex;
          align-items: center;
          font{
            width:0.36rem;
            height:0.36rem;
            background:url(http://bmdt.zgn365.com/Public/aa.png) no-repeat;
            background-size:0.36rem auto;
            background-position: 0 0 ;
            margin-right:0.1rem;
          }
        }
        i {
          color: #a2a2a2;
          font-size: 0.32rem;
        }
        &:nth-child(2){
          p
          font{
            background-position: 0 -0.42rem ;
            height:0.3rem;
          }
        }
         &:nth-child(3){
          font{
            background-position: 0 -0.76rem ;
            height:0.32rem;
          }
        }
         &:nth-child(4){
          font{
            background-position: 0 -1.14rem ;
            height:0.3rem;
          }
        }
         &:nth-child(5){
          font{
            background-position: 0 -1.48rem ;
            height:0.38rem;
          }
        }
      }
    }
  }
}
</style>