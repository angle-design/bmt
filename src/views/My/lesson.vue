<template>
  <div class="lesson">
    <ul>
      <li v-for="(lesson,index) in lessonlist" :key="index">
        <lessonitem :list="lesson" :ceflag="false"></lessonitem>
      </li>
    </ul>
    <kong :flag="showflag" :msg="msg"></kong>
  </div>

</template>

<script>
import lessonitem from "@/components/Home/Lessonitem.vue";
import kong from "@/components/kong.vue";
export default {
  name: "topic",
  data() {
    return {
      lessonlist: "",
        showflag:false,
        msg:'暂无报名的课程'
    };
  },
  created() {
    this.axios.get("/api/api/my/getMycourse").then(res => {
      if (res.data.code == 200) {
        this.lessonlist = res.data.list;
          this.showflag = false;
      }else{
          this.showflag = true;
      }
    });
  },
  components: {
    lessonitem,
      kong
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
  background: #fff;
  width: 100%;
  z-index: 2;
  font-size: 0.28rem;
  ul {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.4rem;
    padding-bottom: 0.4rem;
    // border-bottom: 0.18rem solid #f8f8f8;
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
.lessonitem p button {
  display: none !important;
}
.kong{
  margin-top:40%;
}

</style>