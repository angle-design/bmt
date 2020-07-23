<template>
  <div
    class="scroll-nav"
    ref="scrollNav"
    :style="scrollWay == 'vertical' ? {'height': (navWH == 0 ? '100%' : navWH + 'px'),'background-color': colorBack,'color': colorText,'justify-content': scrollWH < navWH ? 'center' : ''} : {'width': (navWH == 0 ? '100%' : navWH + 'px'),'background-color': colorBack,'color': colorText,'justify-content': scrollWH < navWH ? 'center' : ''}"
  >
    <div
      class="scroll-box"
      ref="scrollBox"
      :style="scrollWay == 'vertical' ? {'transform': 'translate3d(0px,' + xyScroll + 'px,0px)','height': scrollWH + 'px','flex-direction': 'column'} : {'transform': 'translate3d(' + xyScroll + 'px,0px,0px)','width': scrollWH + 'px','flex-direction': 'row'}"
    >
      <div
        class="scroll-item"
        @click="chooseItem($event,index)"
        :class="index == activeIndex ? 'item-active' : ''"
        v-for="(item,index) in dataArr"
        :key="index"
        :style="scrollWay == 'vertical' ? {'margin': scrollMargin + 'px' + ' 0','padding': itemPadding,'color': index == activeIndex ? colorActiveText : '','background-color': index == activeIndex ? colorActiveBack : ''} : {'margin': '0 ' + scrollMargin + 'px','padding': itemPadding,'color': index == activeIndex ? colorActiveText : '','background-color': index == activeIndex ? colorActiveBack : ''}"
      v-clickdown="index"
      >{{item.name}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "tabNav",
  data() {
    return {
      dataNum: [],
      deviceWH: 0,
      xyScroll: 0,
      oldxyScroll: 0,
      scrollWH: 0,
      scrollNav: {},
      scrollBox: {},
      scrollItemArr: [],
      startPointer: 0,
      movePointer: 0,
      endPointer: 0,
      useNavWH: 0,
      initinval: {},
      stepIntval: {},
      activeIndex: this.activeIndexParent
    };
  },
  directives: {
           
        },
  props: {
    activeIndexParent: {
      type: Number,
      required: false,
      default: 0
    },
    colorText: {
      type: String,
      required: false,
      default: '#222'
    },
    colorBack: {
      type: String,
      required: false,
      default: 'whitesmoke'
    },
    colorActiveText: {
      type: String,
      required: false,
      default: '#fff'
    },
    colorActiveBack: {
      type: String,
      required: false,
      default: '#999'
    },
    dataArr: {
      type: Array,
      required: true
    },
    navWH: {
      type: Number,
      required: false,
      default: 0
    },
    scrollMargin: {
      type: Number,
      required: false,
      default: 0
    },
    scrollWay: {
      type: String,
      required: false,
      default: "horizontal"
    },
    itemPadding: {
      type: String,
      required: false,
      default: "0 10px"
    },
    // itemStr: {
    //   type: String,
    //   required: false,
    //   default: ""
    // }
  },
  watch: {
    dataArr: function(newValue, oldValue) {
      if (newValue != oldValue) {
        this.refresh();
      }
    },
    scrollWay: function(newValue, oldValue) {
      if (newValue != oldValue) {
        this.refresh();
      }
    },
    navWH: function(newValue, oldValue) {
      if (newValue != oldValue) {
        this.refresh();
      }
    },
    scrollMargin: function(newValue, oldValue) {
      if (newValue != oldValue) {
        this.refresh();
      }
    },
    itemPadding: function(newValue, oldValue) {
      if (newValue != oldValue) {
        this.refresh();
      }
    }
  },
 
  beforeMount() {},
  mounted() {
    this.deviceWH =
      this.scrollWay == "vertical"
        ? document.body.clientHeight
        : document.body.clientWidth;
    this.useNavWH = this.navWH == 0 ? this.deviceWH : this.navWH;
    this.scrollNav = this.$refs.scrollNav;
    this.scrollBox = this.$refs.scrollBox;
    this.scrollItemArr = document.querySelectorAll(".scroll-item");
    window.onresize = () => {
      return (() => {
        this.deviceWH =
          this.scrollWay == "vertical"
            ? document.body.clientHeight
            : document.body.clientWidth;
        this.useNavWH = this.navWH == 0 ? this.deviceWH : this.navWH;
      })();
    };
    this.scrollItemArr.forEach(val => {
      if (this.scrollWay == "vertical") {
        this.scrollWH += val.offsetHeight + this.scrollMargin * 2;
      } else {
        this.scrollWH += val.offsetWidth + this.scrollMargin * 2;
      }
    });
    this.scrollBox.addEventListener("touchstart", e => {
      this.scrollStart(e);
    });
    this.scrollBox.addEventListener("touchmove", e => {
      this.scrollMove(e);
    });
    this.scrollBox.addEventListener("touchend", e => {
      this.scrollEnd(e);
    });
  },

  methods: {
    refresh() {
      this.deviceWH =
        this.scrollWay == "vertical"
          ? document.body.clientHeight
          : document.body.clientWidth;
      this.useNavWH = this.navWH == 0 ? this.deviceWH : this.navWH;
      this.scrollNav = this.$refs.scrollNav;
      this.scrollBox = this.$refs.scrollBox;
      this.scrollItemArr = document.querySelectorAll(".scroll-item");
      this.scrollItemArr.forEach(val => {
        if (this.scrollWay == "vertical") {
          this.scrollWH += val.offsetHeight + this.scrollMargin * 2;
        } else {
          this.scrollWH += val.offsetWidth + this.scrollMargin * 2;
        }
      });
    },
    chooseItem(e, val) {
      if (this.scrollWay == "vertical") {
        this.activeIndex = val;
        if (this.useNavWH < this.scrollWH) {
          if (
            e.target.offsetTop + e.target.offsetHeight / 2 >
            this.useNavWH / 2
          ) {
            if (
              this.scrollWH - (e.target.offsetTop + e.target.offsetHeight / 2) >
              this.useNavWH / 2
            ) {
              let num =
                this.useNavWH / 2 -
                (e.target.offsetTop + e.target.offsetHeight / 2) -
                this.xyScroll;
              this.animateScroll(num);
              // this.xyScroll = this.useNavWH/2 - (e.target.offsetTop + e.target.offsetHeight/2);
            } else {
              let num = this.useNavWH - this.scrollWH - this.xyScroll;
              this.animateScroll(num);
              // this.xyScroll = this.useNavWH - this.scrollWH;
            }
          } else {
            let num = 0 - this.xyScroll;
            this.animateScroll(num);
            // this.xyScroll = 0;
          }
        }
      } else {
        this.activeIndex = val;
        if (this.useNavWH < this.scrollWH) {
          if (
            e.target.offsetLeft + e.target.offsetWidth / 2 >
            this.useNavWH / 2
          ) {
            if (
              this.scrollWH - (e.target.offsetLeft + e.target.offsetWidth / 2) >
              this.useNavWH / 2
            ) {
              let num =
                this.useNavWH / 2 -
                (e.target.offsetLeft + e.target.offsetWidth / 2) -
                this.xyScroll;
              this.animateScroll(num);
              // this.xyScroll = this.useNavWH/2 - (e.target.offsetLeft + e.target.offsetWidth/2);
            } else {
              let num = this.useNavWH - this.scrollWH - this.xyScroll;
              this.animateScroll(num);
              // this.xyScroll = this.useNavWH - this.scrollWH;
            }
          } else {
            let num = 0 - this.xyScroll;
            this.animateScroll(num);
            // this.xyScroll = 0;
          }
        }
      }
      this.$emit("update: activeIndexParent", val);
      let newArr = [val,this.dataArr[val]];
      this.$emit('choose-item', newArr);
    },
    animateScroll(steps) {
      if (JSON.stringify(this.stepIntval) != "{}") {
        clearInterval(this.stepIntval);
      }
      this.scrollBox.style.transitionDuration = '500ms';
      this.scrollBox.style.transitionTimingFunction = 'ease';
      this.xyScroll = this.xyScroll + steps;
      setTimeout(()=>{
        this.scrollBox.style.transitionDuration = '';
        this.scrollBox.style.transitionTimingFunction = '';
      },500);
    },
    scrollStart(e) {
      if (this.scrollWH == 0) {
        this.refresh();
      }
      if (this.scrollWay == "vertical") {
        this.startPointer = e.changedTouches[0].clientY;
        this.oldxyScroll = JSON.parse(JSON.stringify(this.xyScroll));
      } else {
        this.startPointer = e.changedTouches[0].clientX;
        this.oldxyScroll = JSON.parse(JSON.stringify(this.xyScroll));
      }
    },
    scrollMove(e) {
      if (this.scrollWay == "vertical") {
        if (this.useNavWH < this.scrollWH) {
          this.movePointer = e.changedTouches[0].clientY - this.startPointer;
          if (
            this.oldxyScroll + this.movePointer <
            this.useNavWH - this.scrollWH
          ) {
            let overWidth =
              this.useNavWH -
              this.scrollWH -
              (this.oldxyScroll + this.movePointer);
            this.xyScroll =
              this.useNavWH - this.scrollWH - Math.sqrt(overWidth * 6);
          } else if (this.oldxyScroll + this.movePointer > 0) {
            let overWidth = this.oldxyScroll + this.movePointer;
            this.xyScroll = 0 + Math.sqrt(overWidth * 6);
          } else {
            this.xyScroll = this.oldxyScroll + this.movePointer;
          }
        }
      } else {
        if (this.useNavWH < this.scrollWH) {
          this.movePointer = e.changedTouches[0].clientX - this.startPointer;
          if (
            this.oldxyScroll + this.movePointer <
            this.useNavWH - this.scrollWH
          ) {
            let overWidth =
              this.useNavWH -
              this.scrollWH -
              (this.oldxyScroll + this.movePointer);
            this.xyScroll =
              this.useNavWH - this.scrollWH - Math.sqrt(overWidth * 6);
          } else if (this.oldxyScroll + this.movePointer > 0) {
            let overWidth = this.oldxyScroll + this.movePointer;
            this.xyScroll = 0 + Math.sqrt(overWidth * 6);
          } else {
            this.xyScroll = this.oldxyScroll + this.movePointer;
          }
        }
      }
    },
    scrollEnd(e) {
      if (this.scrollWay == "vertical") {
        if (this.useNavWH < this.scrollWH) {
          if (JSON.stringify(this.initinval) != "{}") {
            clearInterval(this.initinval);
          }
          if (this.xyScroll < this.useNavWH - this.scrollWH) {
            let overNum = parseInt(
              this.xyScroll - (this.useNavWH - this.scrollWH)
            );
            this.initinval = setInterval(() => {
              if (overNum > 0) {
                if (overNum == 0) {
                  clearInterval(this.initinval);
                }
                this.xyScroll = this.xyScroll + 1;
                overNum = overNum - 1;
              } else {
                if (overNum == 0) {
                  clearInterval(this.initinval);
                }
                this.xyScroll = this.xyScroll + 1;
                overNum = overNum + 1;
              }
            }, 5);
          } else if (this.xyScroll > 0) {
            let overNum = parseInt(JSON.parse(JSON.stringify(this.xyScroll)));
            this.initinval = setInterval(() => {
              if (overNum > 0) {
                if (overNum == 0) {
                  clearInterval(this.initinval);
                }
                this.xyScroll = this.xyScroll - 1;
                overNum = overNum - 1;
              } else {
                if (overNum == 0) {
                  clearInterval(this.initinval);
                }
                this.xyScroll = this.xyScroll - 1;
                overNum = overNum + 1;
              }
            }, 5);
          }
        }
        this.endPointer = e.changedTouches[0].clientY;
      } else {
        if (this.useNavWH < this.scrollWH) {
          if (JSON.stringify(this.initinval) != "{}") {
            clearInterval(this.initinval);
          }
          if (this.xyScroll < this.useNavWH - this.scrollWH) {
            let overNum = parseInt(
              this.xyScroll - (this.useNavWH - this.scrollWH)
            );
            this.initinval = setInterval(() => {
              if (overNum > 0) {
                if (overNum == 0) {
                  clearInterval(this.initinval);
                }
                this.xyScroll = this.xyScroll + 1;
                overNum = overNum - 1;
              } else {
                if (overNum == 0) {
                  clearInterval(this.initinval);
                }
                this.xyScroll = this.xyScroll + 1;
                overNum = overNum + 1;
              }
            }, 5);
          } else if (this.xyScroll > 0) {
            let overNum = parseInt(JSON.parse(JSON.stringify(this.xyScroll)));
            this.initinval = setInterval(() => {
              if (overNum > 0) {
                if (overNum == 0) {
                  clearInterval(this.initinval);
                }
                this.xyScroll = this.xyScroll - 1;
                overNum = overNum - 1;
              } else {
                if (overNum == 0) {
                  clearInterval(this.initinval);
                }
                this.xyScroll = this.xyScroll - 1;
                overNum = overNum + 1;
              }
            }, 5);
          }
        }
        this.endPointer = e.changedTouches[0].clientX;
      }
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
.scroll-nav {
  display: flex;
  overflow: hidden;
  height:0.7rem;
  box-shadow: 0 0.2rem 0.14rem rgba(214,214,214,0.4);
  // justify-content: center;
  margin-bottom:0.2rem;
  .scroll-box {
    display: flex;
    white-space: nowrap;
    height:0.7rem;
    width:100%!important;
     transition-duration:0.5s;
    // justify-content: flex-start;
    .scroll-item {
      cursor: pointer;
      font-size:0.28rem;
      height:0.7rem;
      line-height:0.75rem;
    }
    .item-active {
      font-size:0.32rem;
      font-weight:bold;
      position: relative;
      &:after{
        content:'';
        position: absolute;
        bottom:0rem;
        left:50%;
        width:0.3rem;
        margin-left:-0.15rem;
        border-radius:0.3rem;
        height:0.08rem;
        background: #36b936;
      }
    }
  }
}

</style>