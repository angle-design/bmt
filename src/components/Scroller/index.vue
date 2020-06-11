<template>
    <div class="wrapper" ref="wrapper">
      <slot></slot>
    </div>
</template>

<script>
  import Bscroll from 'better-scroll'
    export default {
      name: "scroller",
      props:{
        handleToScroll:{
          type:Function,
          default:function(){}
        },
        handleToTouchEnd:{
          type:Function,
          default:function(){}
        }
      },
      mounted(){
          var scroll=new Bscroll(this.$refs.wrapper,{
            tap:true,
           click: true, //better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件，我们会给派发的 event 参数加一个私有属性 _constructed，值为 true。
            probeType: 3, //这个属性设置之后可以监听得到了
            mouseWheel: true
          });
          this.scroll=scroll;
          scroll.on('scroll',(pos)=>{
            this.handleToScroll(pos)
          });
          scroll.on('touchEnd',(pos)=>{
            this.handleToTouchEnd(pos)
          })
            // scroll.addEventListener('touchstart', (e) => { 
            //         e.stopPropagation();
            //     });
      },
      methods:{
        toScrollTop(y){
            this.scroll.scrollTo(0,y)
        }
      }
    }
</script>

<style scoped lang="less">
  .wrapper{
    height:100%;
  }
</style>
