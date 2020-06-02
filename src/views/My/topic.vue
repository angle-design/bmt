<template>
  <div class="topic">
       <div class="listitem">
           <p>我是顺风集团董事长郭长亮，关于企业运营大跃进喹右地喹夺地地不右，问我吧！</p>
           <div><font>2020-3-30  12:02</font><p><span>进行中</span><i class="fa fa-close"></i></p></div>
       </div>
        <div class="listitem">
           <p>我是顺风集团董事长郭长亮，关于企业运营大跃进喹右地喹夺地地不右，问我吧！</p>
           <div><font>2020-3-30  12:02</font><p><span  class="active">进行中</span><i class="fa fa-close"></i></p></div>
       </div>
        <div class="listitem">
           <p>我是顺风集团董事长郭长亮，关于企业运营大跃进喹右地喹夺地地不右，问我吧！</p>
           <div><font>2020-3-30  12:02</font><p><span  class="ending">进行中</span><i class="fa fa-close"></i></p></div>
       </div>
</div>
</template>

<script>
export default {
  name: "topic",
  data() {
    return {
    
    };
  }
};
</script>

<style lang="less" scoped>
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