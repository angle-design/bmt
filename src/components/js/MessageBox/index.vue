<template>
    <div class="messagebox">
      <h2>{{title}}</h2>
      <p>{{content}}</p>
      <div>
        <div @touchstart="handleCancel">{{cancel}}</div>
        <div @touchstart="handleOk">{{ok}}</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "messagebox"
    }
</script>

<style scoped lang="less">
  .messagebox{
    width:4rem;
    height:3rem;
    background:#fff;
    box-shadow: 0.06rem 0.06rem 0.06rem 0.06rem #ccc;
    border:0.02rem solid #ccc;
    border-radius: 0.08rem;
    position: fixed;
    top:50%;
    left:50%;
    margin-top:-1.5rem;
    margin-left:-2rem;
    text-align: center;
    box-sizing: border-box;
    padding-top:0.2rem;
    h2{
      height:0.8rem;
      line-height:0.8rem;
    }
    p{
      height:1rem;
      line-height:1rem;

    }
    div{
      display: flex;
      height:1rem;
      border-top:0.02rem solid #ccc;
      div{
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        border-right:0.02rem solid #ccc;
        &:last-child{
          border-right:none;
        }
      }
    }
  }
</style>
