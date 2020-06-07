<template>
  <div class="topic">
       <div class="listitem" v-for="(item,index) in toplist" :key="index"> 
           <p>{{item.h_title}},{{item.h_title2}}</p>
           <div>
               <font>{{item.h_ctime}}</font>
               <p>
                   <span v-if="item.h_status==1" >进行中</span>
                   <span v-else-if="item.h_status==2">待审核</span>
                   <span v-else>>已关闭</span>
                   <i class="fa fa-close" @click="closepup(item)"></i>
                </p>
            </div>
       </div>
       <mt-actionsheet :actions="actions" v-model="sheetVisible" class="sheet"></mt-actionsheet>
</div>
</template>

<script>
import { Actionsheet, Toast } from "mint-ui";
export default {
  name: "topic",
  data() {
    return {
        toplist:[],
         actions:[
             {
                name:"删除话题",
                method:this.removetopic
             }
         ],
         sheetVisible: false,
         titem:{},
    };
  },
  created(){
      this.axios.get('/api/api/my/getmyhuati').then(res=>{
          if(res.data.code==200){
            this.toplist=res.data.list;
          }
      })
  },

  methods:{
      closepup(item){
          this.titem=item;
          this.sheetVisible=true;
      },
      removetopic(){    
          //删除话题
        //   console.log(this.tid)
        var titem=this.titem;
        console.log(titem)
          this.axios.post('/api/api/my/delmyhuati',{
            id:titem.id
          }).then(res=>{
                if(res.data.code==200){
                 this.toplist=this.toplist.filter(item=>item!=titem);
                }
          })
      }
  }
};
</script>

<style lang="less" scoped>
.sheet{
    color:#ff0000;
}
.topic {
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
    .listitem{
        border-bottom:0.15rem solid #f8f8f8;
        padding:0.25rem 0.2rem;
        &>p{
                padding:0 0.2rem;
            }
        div{
            display: flex;
            justify-content: space-between;
            margin-top:0.2rem;
            font-size:0.24rem;
            align-items: center;
            padding-left:0.2rem;
            font{
                color:#bfbfbf;
            }
            p{
                span{
                    color:#f1a91e;
                    &.active{
                        color:#36b936;
                    }
                    &.ending{
                        color:#999;
                    }
                }
                i{
                    padding:0 0.2rem 0 0.55rem;
                    color:#999999;
                    font-size:0.3rem;
                }
            }
        }
    }
}
</style>