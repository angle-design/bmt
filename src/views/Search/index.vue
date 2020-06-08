<template>
  <div id="main">
    <div class="content">
      <div class="search_input">
        <div class="search_input_wrapper">
          <input type="text" v-model="message" autofocus="autofocus"/>
        </div>
      </div>
      <scroller
        ref="sa"
        :handleToScroll="shandleToScroll"
        :handleToTouchEnd="shandleToTouchEnd"
      >
        <div class="search_body slide-router-active">

          <div class="search_result">
            <div class="ss">
              <div>
                <ul>
                  <li v-for="(item,index) in movieList" :key="index">
                    <mechanitem :list="item"></mechanitem>
                  </li>
                </ul>
                <!-- 展开更多 -->
                <p class="more" v-if="spullflag">{{spullDownMsg}}</p>
              </div>

            </div>
          </div>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
import mechanitem from "@/components/Home/Mechanism.vue"
    export default {
        name: "search",
        data() {
            return {
                message: "",
                movieList: [],
                spage: 1,
                spullDownMsg: "",
                spullflag: "",
                sLoad: true
            };
        },
        components: {
            mechanitem
        },

        methods: {
            shandleToScroll(pos) {
                //上拉加载 总高度>下拉的高度+数值(20仅供参考) 触发加载更多
                if (this.sLoad&&this.message) {
                    if (this.$refs.sa.scroll.y <= (this.$refs.sa.scroll.maxScrollY + 50)) {
                        //使用refresh 方法 来更新scroll 解决无法滚动的问题
                        this.spage++;
                        this.$nextTick(() => {
                            this.search(this.message);
                            this.$refs.sa.scroll.refresh();
                        });
                }
                }
            },
            shandleToTouchEnd(pos) {

            },
            search(aa) {
                if (this.sLoad&&this.message) {
                    this.axios
                        .get("/api/api/school/getSearchSchool", {
                            params: {
                                p: this.spage,
                                key: aa
                            }
                        })
                        .then(res => {
                            if (res.data.list) {
                                res.data.list.forEach(item => {
                                    this.movieList.push(item);
                                });
                                if (this.spage>1&&res.data.list.length<10) {
                                    this.sLoad=false;
                                    this.spullflag = true;
                                    this.spullDownMsg = "没有更多内容啦...";
                                }
                                if(this.spage==1&&res.data.list.length<10){
                                    this.sLoad=true;
                                    this.spullflag = true;
                                    this.spullDownMsg = "没有更多内容啦...";
                                    return false;
                                }
                            } else {
                                this.sLoad=false;
                                this.spullflag = true;
                                this.spullDownMsg = "没有更多内容啦...";
                                return false;
                            }
                        });
                }

            }
        },
        deactivated () {
            this.$destroy(true)
        },
        watch: {
            message(newval) {
                this.spage = 1;
                this.movieList = [];
                this.sLoad=true;
                this.search(newval);
            }
        },
        // beforeRouteEnter(to, from, next) {
        //     next(vm => {
        //         vm.page = 1;
        //         vm.movieList = [];
        //         vm.message=''
        //     });
        // }
    };
</script>

<style scoped lang="less">
  .content {
    flex: 1;
    overflow: auto;
    position: relative;
    display: flex;
    flex-direction: column;
    background: #f9f9f9;
    padding-top: 0.7rem;
    .mechan{
      padding-right:0.2rem;
    }
  }

  .search_input {
    width: 100%;
    box-sizing: border-box;
    padding: 0.16rem 0.2rem;
    background: #f5f5f5;
    border-bottom: 0.02rem solid #e5e5e5;
    z-index: 2;
    position: fixed;
    top: 0;

    .search_input_wrapper {
      padding: 0 0.2rem;
      border: 0.02rem solid #e6e6e6;
      border-radius: 0.15rem;
      background: #fff;

      input {
        width: 100%;
        border: none;
        font-size: 0.26rem;
        color: #333;
        padding: 0.2rem 0 0.2rem 0.5rem;
        outline: none;
        background: url("../../assets/search.png") no-repeat 0.1rem center;
        background-size: 0.3rem auto;
        box-sizing: border-box;
      }
    }
  }

  .search_body {
    background: #f9f9f9;
    z-index: 12;
    padding-top: 0.3rem;

    .search_result {

      ul {
        padding: 0.2rem;

        li {
          padding:0 0.1rem 0;

          &:last-child {
            padding-bottom: 0;
          }

          a {
            display: flex;
            background: #fff;
            justify-content: space-between;

            margin: 0;
            border-bottom: 0.02rem solid #f9f9f9;

            img {
              width: 2.2rem;
              height: 1.63rem;
            }

            div {
              width: 4.4rem;

              h3 {
                font-size: 0.28rem;
                font-weight: bold;
                padding: 0.08rem 0;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                color: #333;
              }

              p {
                font-size: 0.24rem;
                color: #666666;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
            }
          }
        }
      }

    }
  }

  .return {
    position: absolute;
    top: 0;
    left: 0.2rem;
  }

  .slide-router-active {
    animation: 0.4s slidemove;
  }

  @keyframes slidemove {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0);
    }
  }

  .more {
    width: 4rem;
    margin: 0 auto;
    text-align: center;
    line-height: 0.8rem;
    color: #282828;
    font-size: 0.28rem;
    padding-bottom: 0.3rem;
  }
</style>
