
<template>
    <div class="lessonitem">
          <img :src="list.image" @click="toDetails(list.id)"/>
          <h4>{{list.name}}</h4>
          <span>适用人群：{{list.objects}}</span>
          <p>
            <span>￥<font>{{list.price}}</font></span>
            <button v-if="ceflag" @click="handlemessage(list.sid,list.id)">立即报名</button>
          </p>
    </div>
</template>
<script>
export default {
  name: "lessonitem",
  props:{
      list:Object,
      ceflag:Boolean,
  },
  data() {
    return {
     
    };
  },
  created(){
    console.log(this.list)
  },
  methods:{
     // 进入立即注册
     handlemessage(id,cid) {
      this.$router.push({name:'signup2',query:{id:id,cid:cid}});
    },
    toDetails(id){
      this.$router.push({name:'lessondetails',query:{id:id}})
    }
  }
}
</script>

<style lang='less' scoped>
  .lessonitem {
        display: flex;
        flex-direction: column;
        img {
          width: 3.3rem;
          height: 1.68rem;
        }
        h4 {
          font-size: 0.28rem;
          color: #333;
          margin-top: 0.1rem;
          line-height: 0.45rem;
          padding: 0 0.1rem;
        }
        span {
          font-size: 0.24rem;
          color: #999;
          padding: 0 0.1rem;
        }
        p {
          display: flex;
          justify-content: space-between;
          height: 0.5rem;
          align-items: center;
          margin-top: 0.2rem;
          padding: 0 0.08rem;
          span {
            font-size: 0.24rem;
            color: #ff610f;
            font {
              font-size: 0.34rem;
            }
          }
          button {
            width: 1.28rem;
            height: 0.5rem;
            border: 0.02rem solid #36b936;
            color: #36b936;
            border-radius: 0.1rem;
            font-size: 0.24rem;
          }
        }
      }
</style>



