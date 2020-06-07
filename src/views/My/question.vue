<template>
  <div class="question">
    <ul>
      <li v-for="(item,index) in quesctionlist" :key="index">
        <p class="title">
          <span>提问:</span>
          {{item.content}}
        </p>
        <div>
          <p>
            <img v-if="item.hinfo.a_image" :src="item.hinfo.a_image" />
            <img v-else src="../../assets/mohead.png" />
          </p>
          <span>{{item.hinfo.h_title}},{{item.hinfo.h_title2}}</span>
        </div>
        <p class="time">
          <font>{{item.time}}</font>
          <span v-if="item.status==1">专家已答</span>
          <span v-else>待回答</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "question",
  data() {
    return {
      quesctionlist: []
    };
  },
  created() {
    this.axios.get("/api/api/my/getmyask").then(res => {
      if (res.data.code == 200) {
        this.quesctionlist = res.data.list;
      }
    });
  }
};
</script>

<style lang="less" scoped>
.question {
  flex: 1;
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  width: 100%;
  z-index: 2;
  font-size: 0.28rem;
  padding-bottom: 0.3rem;
  box-sizing: border-box;
  height: 100%;
  ul {
    li {
      padding: 0.3rem 0.3rem 0.15rem;
      border-bottom: 0.02rem solid #e7e7e7;
      line-height: 0.4rem;
      .title {
        span {
          color: #999999;
        }
      }
      div {
        display: flex;
        width: 6.5rem;
        background: #f8f8f8;
        padding: 0.25rem 0.25rem;
        margin-left: 0.5rem;
        border-radius: 0.15rem;
        box-sizing: border-box;
        align-items: center;
        margin: 0.15rem 0 0.15rem 0.4rem;
        p {
          width: 0.75rem;
          height: 0.75rem;
          img {
            width: 0.7rem;
            height: 0.7rem;
            border-radius: 50%;
          }
        }
        span {
          width: 5.1rem;
          margin-left: 0.2rem;
        }
      }
      .time {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.24rem;
        font {
          color: #bfbfbf;
        }
        span {
          color: #f1a91e;
          &.da {
            color: #7bcc7b;
          }
        }
      }
    }
  }
}
</style>