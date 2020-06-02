<template>
  <div class="question">
        <ul>
          <li>
            <p class="title"><span>提问:</span>回答的很精彩？</p>
            <div>
              <p><img src="../../assets/feng.jpg"></p>
              <span>中国好青年超20个省份明确高校开学时间份明确高校开学时间?</span>
            </div>
            <p class="time"><font>2020-3-30  12:02</font><span>待回答</span></p>
          </li>
           <li>
            <p class="title"><span>提问:</span>回答的很精彩？</p>
            <div>
              <p><img src="../../assets/feng.jpg"></p>
              <span>中国好青年超20个省份明确高校开学时间份明确高校开学时间?</span>
            </div>
            <p class="time"><font>2020-3-30  12:02</font><span class="da">专家已答</span></p>
          </li>
        </ul>
</div>
</template>

<script>
export default {
  name: "question",
  data() {
    return {
    
    };
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
  bottom: 1.2rem;
  background: #fff;
  width: 100%;
  z-index:2;
  font-size:0.28rem;
  ul{
    li{
      padding:0.3rem 0.3rem 0.15rem;
      border-bottom:0.02rem solid #e7e7e7;
      line-height:0.4rem;
      .title{
        span{
          color:#999999;
        }
      }
      div{
        display: flex;
        width:6.5rem;
        background:#f8f8f8;
        padding:0.25rem 0.25rem;
        margin-left:0.5rem;
        border-radius:0.15rem;
        box-sizing: border-box;
        align-items: center;
        margin:0.15rem 0 0.15rem 0.4rem;
        p{
            width:0.75rem;
            height:0.75rem;
            img{
               width:0.7rem;
              height:0.7rem;
              border-radius:50%;
            }
        }
        span{
          width:5.1rem;
          margin-left:0.2rem;
        }
      }
      .time{
        display: flex;
        justify-content: space-between;
        align-items: center;
         font-size:0.24rem;
        font{
         
          color:#bfbfbf
        }
        span{
          color:#f1a91e;
          &.da{
            color:#7bcc7b
          }
        }
      }
    }
  }
}
</style>