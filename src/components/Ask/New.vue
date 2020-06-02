<!--  -->
<template>
  <div class="new_con">
      <scroller ref="aa" :handleToScroll="handleToScroll" >
        <div class="new">
          <Listcon :ListInfo="ListInfo" :flag="flag" @toComment="toComment"/>
           <!-- 展开更多 -->
          <p class="more" v-if="pullflag">{{pullDownMsg}}</p>
        </div>
      </scroller>
  </div>
</template>

<script>
import Listcon from "@/components/Ask/Listcon.vue";
export default {
  name: "new",
  data() {
    return {
      page:1,
      flag:false,
      ListInfo:[],
      payload:true
    };
  },
  mounted(){
    this.getList(this.$route.params.id)
  },

  methods:{
     handleToScroll(pos) {
      //上拉加载 总高度>下拉的高度+数值(20仅供参考) 触发加载更多
        if (this.$refs.aa.scroll.y <= this.$refs.aa.scroll.maxScrollY + 50) {
         this.getMoreList(this.$route.params.id)
        }
    },
    // 第一次获取
  getList(id) {
      this.page = 1;
      // 拉取商家信息
      this.pullflag = true;
      this.pullDownMsg = "上拉加载...";
      this.axios.get('/api/api/Ask/getAlist',{
        params:{
          p:this.page,
          id:id,
          order:1
        }
      }).then(res=>{
        console.log(res.data.list)
          if(res.data.list){
            this.ListInfo=res.data.list
          }
      })
    },
    // 加载更多
    getMoreList(id){
      if (this.payload) {
        this.page++;
        this.axios.get('/api/api/Ask/getAlist',{
        params:{
          p:this.page,
          id:id,
          order:1
        }
      }).then(res=>{
            if (res.data.list) {
              res.data.list.forEach(item => {
                this.ListInfo.push(item);
              });
              if (res.data.list.length < 4) {
                this.payload = false;
                this.pullflag = true;
                this.pullDownMsg = "没有更多内容...";
              }
            } else {
              this.payload = false;
              this.pullflag = true;
              this.pullDownMsg = "没有更多内容...";
            }
          });
      }
    },
    toComment(){
        this.$router.push("/comment");
    }
  },
  components:{
    Listcon
  }
};
</script>

<style lang='less' scoped>
    .new_con{
        flex: 1;
    overflow: auto;
    // margin:0.2rem 0 1.2rem;
    position: relative;
    display: flex;
    flex-direction: column;
    height:100vh;
    
    }
   
</style>
