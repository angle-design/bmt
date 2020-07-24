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
              <i @click.once="zan($event,listtop.id)" ></i>
              <font>{{listtop.zan?listtop.zan:'0'}}</font>
            </span>
            <span @click="$emit('toComment',listtop.id)">
              <i></i>
              <font>{{listtop.huifu}}</font>
            </span>
          </p>
        </div>
        <p class="new_text" @click="$emit('toComment',listtop.id)">{{listtop.content}}</p>
      </div>
      <div class="jieda" v-if="listtop.isq" @click="$emit('toaswer',listtop)"><img src="../../assets/bi.png">解答问题</div>
      <!-- 答 -->
      <div class="list_item list_answer" v-if="listtop.qlist">
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
            <span >
              <i  @click.once="zan($event,listtop.id)"></i>
              <font>{{listtop.qlist.zan?listtop.qlist.zan:'0'}}</font>
            </span>
            <span @click="$emit('toComment',listtop.id)">
              <i></i>
              <font>{{listtop.qlist.huifu}}</font>
            </span>
          </p>
        </div>
        <p class="new_text new_text_ask" @click="$emit('toComment',listtop.id)">{{listtop.qlist.content}}</p>
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
          if (res.data.code == 200){
            event.target.className = "active";
            event.target.nextElementSibling.innerHTML =
                  parseInt(event.target.nextElementSibling.innerHTML) + 1;
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
    display: flex;
    text-align: right;
    position: relative;
    margin-left:1rem;
align-items: center;
justify-content: flex-end;
    img{

      width:0.24rem;
      height:0.26rem;
      margin-right:0.1rem;

    }
     &:after{
       position: absolute;
       top:0rem;
       content:'';
       height:0.01rem;
       background:#f4f4f4;
       right:0;
       left:0rem;
     }
  }
  .list_body {
    position: relative;
    padding: 0.3rem 0 0.1rem;
    .new_bottom {
      margin-left: 1.1rem;
      padding-top: 0.3rem;
      .new_text {
        background: none;
        padding-left: 0;
      }
    }
    .list_item {
      &.list_answer{
        padding-top: 0.2rem;
        position: relative;
            &:after{
              position: absolute;
              top:0rem;
              content:'';
              height:0.01rem;
              background:#f4f4f4;
              right:0;
              left:1rem;
            }                     
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
            display: flex;
            i {
              //     padding: 0.1rem 0.06rem;
              // color: #bfbfbf;
              // font-size: 0.3rem;
              display: flex;
              width:0.36rem;
              height:0.26rem;
              background:url(http://bmdt.zgn365.com/Public/aa.png) no-repeat;
              background-position:0 -4.41rem;
              background-size:0.36rem auto;
              padding-right:0.05rem;
              &.active{
                background-position: 0 -4.73rem;
              }
            }
            &:nth-child(2){
              i{
                 background-position:0 -5.08rem;
              }
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
