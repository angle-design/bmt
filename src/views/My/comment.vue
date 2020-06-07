<template>
  <div class="comment">
        <ul>
          <li v-for="(item,index) in replylist" :key="index">
            <p class="title"><span>评论:</span>{{item.content}}</p>
            <div>
              <span>{{item.hinfo.content}}</span>
            </div>
            <p class="time"><font>{{item.ctime}}</font></p>
          </li>
        </ul>
</div>
</template>

<script>
export default {
  name: "comment",
  data() {
    return {
    replylist:[]
    };
  },
  created(){
    this.axios.get('/api/api/my/getmyreply').then(res=>{
      if(res.data.code==200){
        console.log(res.data)
        this.replylist=res.data.list
      }
    })
  }
};
</script>

<style lang="less" scoped>
.comment {
  flex: 1;
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 1.2rem;
  background: #fff;
  width: 100%;
  z-index:2;
  font-size:0.28rem;
  ul{
    li{
      padding:0.3rem 0.3rem 0.15rem;
      border-bottom:0.02rem solid #e7e7e7;
      line-height:0.4rem;
      .title{
        span{
          color:#999999;
        }
      }
      div{
        display: flex;
        width:6.5rem;
        background:#f8f8f8;
        padding:0.25rem 0.25rem;
        margin-left:0.5rem;
        border-radius:0.15rem;
        box-sizing: border-box;
        align-items: center;
        margin:0.15rem 0 0.15rem 0.4rem;
      }
      .time{
         font-size:0.24rem;
         color:#bfbfbf
      
      }
    }
  }
}
</style>