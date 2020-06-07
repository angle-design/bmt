<template>
  <div class="lesson">
           <ul>
        <li v-for="(lesson,index) in lessonlist" :key="index">
          <lessonitem :list="lesson" :ceflag="false"></lessonitem>
        </li>
      </ul>
</div>
</template>

<script>
import lessonitem from "@/components/Home/Lessonitem.vue";
export default {
  name: "topic",
  data() {
    return {
      lessonlist:
        [
          {
            'img':
              "https://zgnstatic.oss-cn-beijing.aliyuncs.com/zgnimage/20200519/f8104b454aac5c2862d0b6fa43a09e72.jpg",
            'title': "1小学数学思维训练",
            'scholl': "适用人群：小学",
            'price': 188
          },
         {
            'img':
              "https://zgnstatic.oss-cn-beijing.aliyuncs.com/zgnimage/20200519/f8104b454aac5c2862d0b6fa43a09e72.jpg",
            'title': "2小学数学思维训练",
            'scholl': "适用人群：小学",
            'price': 188
          },
         {
            'img':
              "https://zgnstatic.oss-cn-beijing.aliyuncs.com/zgnimage/20200519/f8104b454aac5c2862d0b6fa43a09e72.jpg",
            'title': "3小学数学思维训练",
            'scholl': "适用人群：小学",
            'price': 188
          },
        ] 
    };
  },
  components:{
      lessonitem
  }
};
</script>

<style lang="less" scoped>
.lesson {
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
  ul {
      display: flex;
      flex-wrap: wrap;
      margin-top: 0.4rem;
      padding-bottom: 0.4rem;
      border-bottom: 0.18rem solid #f8f8f8;
      li {
        display: flex;
        width: 3.3rem;
        height: 3.4rem;
        border: 0.02rem solid #e7e7e7;
        border-radius: 0.15rem;
        flex-direction: column;
        overflow: hidden;
        margin-left: 0.23rem;
        margin-bottom: 0.22rem;

      }
  }

}
  .lessonitem p button{display: none!important;}
</style>