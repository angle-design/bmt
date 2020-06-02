<!--  -->
<template>
  <div class="new">
    <Listcon :ListInfo="ListInfo" :flag="flag" @toComment="toComment"/>
  </div>
</template>

<script>
import Listcon from "@/components/Ask/Listcon.vue";
export default {
  name: "new",
  data() {
    return {
      flag:false,
      ListInfo:[
        {
          "img":"https://bkimg.cdn.bcebos.com/pic/9f2f070828381f30001d8815a8014c086e06f002?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2U4MA==,xp_5,yp_5",
          "name":"hot崔建洪1",
          "isvip":false,
          "date":"2020-03-20 15:30",
          "a":'532',
          "b":"444",
          "text":"11最新中国好青年超20个省份明确高校开学时间份明确高校开学时间",
          "con":{
            "img":"https://bkimg.cdn.bcebos.com/pic/9f2f070828381f30001d8815a8014c086e06f002?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2U4MA==,xp_5,yp_5",
            "c":"路人甲",
            "d":"路人2",
            "date":"2020-03-20 15:30",
            "a":'331',
            "b":"333",
            "text":"112最新中国好青年超20个省份明确高校开学时间份明确高校开学时间"
          }
        },
         {
          "img":"https://bkimg.cdn.bcebos.com/pic/9f2f070828381f30001d8815a8014c086e06f002?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2U4MA==,xp_5,yp_5",
          "name":"hot崔建洪1",
          "date":"2020-03-20 15:30",
          "a":'532',
          "b":"444",
           "isvip":true,
          "text":"22最新中国好青年超20个省份明确高校开学时间份明确高校开学时间",
          "con":{
            "img":"https://bkimg.cdn.bcebos.com/pic/9f2f070828381f30001d8815a8014c086e06f002?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2U4MA==,xp_5,yp_5",
            "c":"路人甲",
            "d":"路人2",
            "date":"2020-03-20 15:30",
            "a":'331',
            "b":"333",
            "text":"223最新中国好青年超20个省份明确高校开学时间份明确高校开学时间",
          }
        }
      ]
    };
  },
  components:{
    Listcon
  },
  methods:{
      toComment(){
        this.$router.push("/comment");
    }
  }
};
</script>

<style lang='less' scoped>

</style>
