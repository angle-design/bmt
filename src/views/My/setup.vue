<template>
  <div class="setup">
    <p class="head" @click="changeimge">
      <img v-if="userinfo.a_image" :src="userinfo.a_image" />
      <img v-else src="../../assets/mohead.png" />
      <span>更换头像</span>
    </p>
    <p>
      <font>用户名</font>
      <input type="text" v-model="uname" @blur="tosend"/>
      <span v-if="aflag">该账户已存在</span>
    </p>
    <p @click="sheetVisible=true">
      <font>性&nbsp;&nbsp;&nbsp;别</font>
      <input type="text" :value="sex" readonly/>
    </p>
    <button @click="loginout">退出账户</button>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
  </div>
</template>

<script>
export default {
  name: "setup",
  data() {
    return {
      userinfo: {},
      sex:'',
      uname:'',
      aflag:false,
      actions: [
              {
                name:"男",
                method:this.setsex
             },
              {
                name:"女",
                method:this.setsex
             }
      ],
      sheetVisible:false
    };
  },
  created() {
    this.axios.get("/api/api/my/getUinfo").then(res => {
      // console.log(res.data);
      if (res.data.code == 205) {
        this.$router.push("/login");
      } else if (res.data.code == 200) {
        this.userinfo = res.data.list;
        this.uname=this.userinfo.a_uname;
        console.log(res.data.list)
        if(this.userinfo.a_sex=1){
          this.sex='男'
        }else if(this.userinfo.actions=2){
          this.sex='女'
        }
      }
    });
  },
  methods: {
    setsex(e){
      // console.log(e);
      this.sex=e.name
    },
    loginout() {
      this.axios.get("/api/api/user/logout").then(res => {
        console.log(res.data);
        if (res.data.statu == 200) {
          this.$router.push("/login");
        }
      });
    },
    changeimge() {
      this.$router.push("/imgcai");
    },
    tosend(){
      this.axios.post('/api/api/my/setMyinfo',{
        auname:this.uname,
        sex:this.sex
      }).then(res=>{
        // if(res.data.code==202){
        //   // alert(1)
        //    this.aflag=true;
        // }
      })
    }
  },
   watch: {
            sex(newval) {
                this.tosend()
            }
        },
};
</script>

<style lang="less" scoped>
.setup {
  flex: 1;
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 1.2rem;
  background: #fff;
  width: 100%;
  z-index: 2;
  font-size: 0.28rem;
  p {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.4rem;
    position: relative;
    font {
      width: 1rem;
    }
    input {
      padding: 0.15rem 0.2rem;
      border-bottom: 0.02rem solid #e7e7e7;
      width: 5rem;
    }
    span {
      position: absolute;
      color: #ff0000;
      right: 0.8rem;
      top: 0rem;
    }
  }
  .head {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 0.65rem;
    img {
      width: 1.16rem;
      height: 1.16rem;
      border-radius: 50%;
    }
    span {
      color: #36b936;
      padding: 0.1rem 0.2rem;
      position: static;
    }
  }
  button {
    width: 6.3rem;
    height: 0.9rem;
    border: 0.02rem solid #36b936;
    border-radius: 0.8rem;
    font-size: 0.3rem;
    color: #36b936;
    position: absolute;
    bottom: 1rem;
    left: 50%;
    margin-left: -3.15rem;
  }
}
</style>