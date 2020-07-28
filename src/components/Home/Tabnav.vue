<template>
  <div class="" id="topnav">
      <div class="scrollBarWrapper" :style="scrollBarWrapperStyle"  ref="navv">
    <div
      class="scrollBarContent"
      :class="direction === 'y' ? 'directionY' : 'directionX'"
      ref="scrollBarContent"
    >
      <slot></slot>
    </div>
  </div>
  </div>
</template>

<script>
    import Bscroll from 'better-scroll'
export default {
        name:"nav",
  props: {
    direction: {
      type: String,
      default: "x",
      validator(value) {
        return value === "x" || value === "y";
      }
    },
    activeIndex: {
      type: Number,
      default: 0,
      validator(value) {
        return value >= 0;
      }
    }
  },
  watch: {
    activeIndex(newVal, oldVal) {
      this.handleChange();
    }
  },
  computed: {
    scrollBarWrapperStyle() {
      return this.direction === "y"
        ? {
            height: "100%"
          }
        : {
            width: "100%"
          };
    }
  },
  mounted(){

  },
  created(){
      this.$nextTick(() => {
          var scroll_=new Bscroll(this.$refs.navv,{
              tap:true,
              click: true, //better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件，我们会给派发的 event 参数加一个私有属性 _constructed，值为 true。
              probeType: 2, //这个属性设置之后可以监听得到了
              mouseWheel: true,
              stopPropagation:true,
              scrollX:true,
              scrollY:false,
              bounce:false,
              eventPassthrough: 'horizontal',
          });

      })

  },
  activated() {


    this.initItemDisplay();
    this.handleChange();
  },
  methods: {
    initItemDisplay() {
      const content = this.$refs.scrollBarContent;
      const contentItem = content.children;
      [].forEach.call(contentItem, item => {
        if (this.direction === "y") {
          item.style.display = "block";
        } else {
          item.style.display = "inline-block";
        }
      });
    },
    handleChange() {
      this.$nextTick(() => {
        const content = this.$refs.scrollBarContent; // 发生滑动的元素
        const activeItem = content.children[this.activeIndex]; // 当前选中的元素
        if(!activeItem) return false;

        const scrollOption = {
          top: 0,
          left: 0,
          behavior: "smooth"
        };

        if (this.direction === "y") {
          const contentHeight = content.offsetHeight;
          const activeItemHeight = activeItem.offsetHeight;
          const activeItemTop = activeItem.offsetTop;
          const offset = activeItemTop - (contentHeight - activeItemHeight) / 2; // 需要移动的位置
          scrollOption.top = offset;
        } else {
          const contentWidth = content.offsetWidth; // 发生滑动元素的宽
          const activeItemWidth = activeItem.offsetWidth; // 当前元素的宽
          const activeItemLeft = activeItem.offsetLeft; // 当前元素的到他父盒子左侧的距离
          const offset = activeItemLeft - (contentWidth - activeItemWidth) / 2; // 需要移动的位置
          scrollOption.left = offset;
          console.log(scrollOption.left)
        }

        content.scrollTo(scrollOption);
      });
    }
  }
};
</script>

<style lang="less" scoped>
#topnav{
   display: flex;
  overflow: hidden;
  height:0.7rem;
  box-shadow: 0 0.2rem 0.14rem rgba(214,214,214,0.4);
  // justify-content: center;
  margin-bottom:0.2rem;
  background: #fff;
}
.scrollBarWrapper {
  position: relative;
  overflow: hidden;
  user-select: none;
  vertical-align: middle;

  .scrollBarContent {
    width: 100%;
    white-space: nowrap;
    word-break: keep-all;
    -webkit-overflow-scrolling: touch;

    &.directionX {
      overflow-x: scroll;
      overflow-y: hidden;
    }

    &.directionY {
      overflow-x: hidden;
      overflow-y: scroll;
      height: 100%;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>