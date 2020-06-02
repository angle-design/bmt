
<template>
    <div class="mechan">
        <!-- 每个机构 -->
        <img src="https://zgnstatic.oss-cn-beijing.aliyuncs.com/zgnimage/20200519/f8104b454aac5c2862d0b6fa43a09e72.jpg">
        <div>
            <h4>{{list.name}}</h4>
            <p class="itemlesson">
                <span>优势课程：</span>
                <font v-for="(lesson,i) in list.lesson" :key="i">
                    {{lesson}}
                </font>
            </p>
            <p class="itemzan"><img src="../../assets/zan.png"><font>{{list.zanpeople}}人</font>参与投票</p>
        </div>   
    </div>
</template>
<script>
export default {
  name: "mechan",
  props:{
      list:Object
  },
  data() {
    return {
     
    };
  },
}
</script>

<style lang='less' scoped>
  .mechan{
            display: flex;
            padding:0 0.7rem 0 0.2rem;
            height:2.06rem;
            align-items: center;
            background: #fff;
            border-radius:0.2rem;
            margin-top:0.15rem;
            position: relative;
            img{
                width:1.38rem;
                height:1.38rem;
                border-radius:0.15rem;
                margin-right:0.27rem;
            }
            div{
                h4{
                  font-size:0.32rem;  
                  line-height:0.5rem;
                }
                .itemlesson{
                    font-size:0.26rem;
                     overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    color: #333;
                     height:0.76rem;
                     line-height:0.38rem;
                    span{
                        color:#73b073;
                    }
                    font{
                        margin-right:0.1rem;
                    }
                }
                .itemzan{
                    display: flex;
                    font-size:0.24rem;
                    color:#aeaeae;
                    margin-top:0.05rem;
                    img{
                        width:0.32rem;
                        height:0.32rem;
                        margin-right:0.05rem;
                    }
                    font{
                        color:#ffae00
                    }
                }
            }
        }
</style>



