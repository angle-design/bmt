<!--  -->
<template>
  <div class="new">
    <div class="list_body">
      <div class="list_item">
        <div>
          <dl v-if="listtop.uinfo">
            <dt>
              <img v-if="listtop.uinfo.a_image"  :src="listtop.uinfo.a_image" />
               <img v-else src="../../assets/mohead.png" />
              <font v-if="listtop.isvip"></font>
            </dt>
            <dd>
              <font>{{listtop.uinfo.a_uname}}</font>
              <span>{{listtop.time}}</span>
            </dd>
          </dl>
          <p>
            <span>
              <i @click.once="zan($event,listtop.id)" class="fa fa-heart-o"></i>
              <font>{{listtop.zan?listtop.zan:'0'}}</font>
            </span>
            <span @click="$emit('toComment',listtop.id)">
              <i class="fa fa-commenting-o"></i>
              <font>{{listtop.huifu}}</font>
            </span>
          </p>
        </div>
        <p class="new_text">{{listtop.content}}</p>
      </div>
      <div class="jieda" v-if="listtop.isq" @click="$emit('toaswer',listtop)"><i class="fa fa-star-o"></i>解答问题</div>
      <!-- 答 -->
      <div class="list_item" v-if="listtop.qlist">
        <div>
          <dl v-if="listtop.qlist.uinfo">
            <dt>
              <img v-if="listtop.qlist.uinfo.a_image" :src="listtop.qlist.uinfo.a_image" />
               <img v-else src="../../assets/mohead.png" />
              <font v-if="listtop.isvip"></font>
            </dt>
            <dd>
              <font>{{listtop.qlist.uinfo.a_uname}}</font>
              <span>{{listtop.time}}</span>
            </dd>
          </dl>
          <p>
            <span>
              <i @click.once="zan($event,listtop.id)" class="fa fa-heart-o"></i>
              <font>{{listtop.qlist.zan?listtop.qlist.zan:'0'}}</font>
            </span>
            <span @click="$emit('toComment',listtop.id)">
              <i class="fa fa-commenting-o"></i>
              <font>{{listtop.qlist.huifu}}</font>
            </span>
          </p>
        </div>
        <p class="new_text new_text_ask">{{listtop.qlist.content}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "new",
  props: {
    listtop: Object,
    flag: Boolean
  },
  data() {
    return {
      // zanflag:false
    };
  },
  methods: {
    zan(event, id) {
      this.axios
        .post("/api/api/Ask/addzan", {
          aid: id
        })
        .then(res => {
          if (res.data.code == 200) {
            event.target.className = "fa fa-heart";
            event.path[1].childNodes[2].innerText =
              parseInt(event.path[1].childNodes[2].innerText) + 1;
          } else if (res.data.code == 205) {
            //未登录
            this.$router.push("/login");
          }
        });
    }
  }
};
</script>

<style lang='less' scoped>
.new {
  .jieda{
    color:#369836;
    padding:0.1rem 0;
    margin-top:0.2rem;
    display: block;
    text-align: right;
    i{
      margin-right:0.05rem;
    }
  }
  .list_body {
    position: relative;
    padding: 0.3rem 0 0.2rem;
    .new_bottom {
      margin-left: 1.1rem;
      padding-top: 0.3rem;
      .new_text {
        background: none;
        padding-left: 0;
      }
    }
    .list_item {
      &:nth-child(2) {
        padding-top: 0.2rem;
        div {
          position: relative;
        }
      }
      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        dl {
          display: flex;
          dt {
            position: relative;
            img {
              width: 0.7rem;
              height: 0.7rem;
              border-radius: 50%;
            }
            font {
              position: absolute;
              background: #f1a91e;
              border-radius: 50%;
              display: flex;
              width: 0.28rem;
              height: 0.28rem;
              right: -0.1rem;
              bottom: 0rem;
            }
          }
          dd {
            display: flex;
            flex-direction: column;
            margin-left: 0.4rem;
            font-size: 0.28rem;
            line-height: 0.4rem;
            font {
              font {
                color: #369836;
                &:nth-child(1) {
                  margin-right: 0.1rem;
                }
                &:nth-child(2) {
                  margin-left: 0.1rem;
                }
              }
            }
            & > span {
              color: #bfbfbf;
              font-size: 0.24rem;
            }
          }
        }
        p {
          display: flex;
          font-size: 0.24rem;
          color: #666666;
          span {
            margin-left: 0.3rem;
            i {
              margin-right: 0.06rem;
              color: #bfbfbf;
              font-size: 0.3rem;
            }
          }
        }
      }
    }
    .new_text {
      margin-top: 0.1rem;
      background: url(../../assets/wen_01.png) no-repeat 0.2rem 0.05rem;
      background-size: 0.4rem 0.4rem;
      font-size: 0.3rem;
      padding-left: 1rem;
      padding-bottom:0.2rem;
      position: relative;
      &:after{
        position: absolute;
        bottom:0rem;
        content:'';
        height:0.02rem;
        background:#f4f4f4;
        right:0;
        left:1rem;
      }
      &.new_text_ask {
        background: url(../../assets/wen_03.png) no-repeat 0.2rem 0.05rem;
        background-size: 0.4rem 0.4rem;
      }
    }
  }
}
ul {
  li {
    padding: 0 0.3rem;
    border-bottom: 0.1rem solid #f4f4f4;
    padding-bottom: 0.1rem;
  }
}
i.fa-heart {
  color: #ffb72c !important;
}
</style>
