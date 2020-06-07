<template>
  <div id="main">
    <div class="content">
      <scroller ref="aa" :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
        <div>
          <ul>
            <li v-for="(item,index) in list" :key="index">
              <a :href="item.url">
                <img :src="item.image" alt/>
                <div>
                  <h3>{{item.name}}</h3>
                  <p>{{item.title}}</p>
                </div>
              </a>
            </li>
          </ul>
          <p class="more" v-if="pullflag">{{pullDownMsg}}</p>
        </div>
      </scroller>
      <!-- 展开更多 -->
    </div>
    <Tab/>
  </div>
</template>

<script>
    import Tab from "@/components/TabBar";

    export default {
        name: "movie",
        data() {
            return {
                list: [],
                page: 1,
                pullDownMsg: "",
                pullflag: "",
                payload: true
            };
        },
        activated() {
            this.getList()
        },
        methods: {
            handleToScroll(pos) {
                //上拉加载 总高度>下拉的高度+数值(20仅供参考) 触发加载更多
                if (this.$refs.aa.scroll.y <= (this.$refs.aa.scroll.maxScrollY + 50)) {
                    this.pullflag = true;
                    // this.pullDownMsg = "正在加载中....";
                    //使用refresh 方法 来更新scroll 解决无法滚动的问题
                    this.page++;
                    this.$nextTick(() => {
                        this.getList();
                        this.$refs.aa.scroll.refresh();
                    });
                }
            },
            handleToTouchEnd(pos) {

            },
            getList() {
                if (this.payload) {
                    this.axios.get("/api/Api/index/getNewlist", {
                        params: {
                            p: this.page,
                        }
                    }).then(res => {
                        if (res.data.list.length  > 0) {
                            res.data.list.forEach(item => {
                                this.list.push(item);
                            });
                            if (res.data.list.length < 10) {
                                this.payload = false;
                                this.pullflag = true;
                                this.pullDownMsg = "精彩课程待更新...";
                            }
                        }
                    });
                }
            }

        },
        components: {
            Tab
        }
    };
</script>

<style scoped lang="less">
  .content {
    flex: 1;
    overflow: auto;
    margin-bottom: 1.2rem;
    position: relative;
    display: flex;
    flex-direction: column;
    background: #f8f8f8;

    ul {
      li {

        margin: 0.38rem 0;

        &:last-child {
          margin-bottom: 0;
        }

        a {
          display: flex;
          background: #fff;
          justify-content: space-between;
          padding: 0.2rem 0.3rem;

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
