<template>
  <div id="main">
    <scroller>
    <div class="content">
      <h3>环球网“报名大厅”即将上线！百所机构，千门课程等你来！</h3>
      <p>
        【环球网教育报道】近日，由环球网教育、知更鸟网联合推出的“报名大厅”报名平台即将上线，
        “报名大厅”汇聚全国百所教育机构、千门火爆课程。平台邀请新东方、学而思、中华会计网校、
        环球雅思、巧口英语、vipkid、掌门教育、作业帮、猿辅导、腾讯企鹅辅导、网易有道、高顿财经、
        高思教育、新航道、英孚教育、中公教育、华图教育、海天教育、万学教育、编程猫、帮考网等上百家
        教育机构入驻，千门好课将在平台推出。
      </p>
      <p>
        据悉，“报名大厅”平台将涉及教育行业多个种类课程，从小学、初中、高中、少儿英语、少儿编程、研学、英语四六级到雅思托福、
        出国留学、考研、会计、公务员、小语种、职业资格、艺术体育等，还将公布多种线上免费、优惠课程信息，未来还将推出各地线下
        折扣优惠课程供学生选择。
      </p>
      <p>
        “报名大厅”上线后，全国学生将可通过平台找到适合自己的课程，在线直接报名，这也大大节省了学生苦苦寻找各个机构及课程的时间，
        平台将有助于学生方便快捷地寻找到免费课程、优惠课程、打折课程的信息。据了解，“报名大厅”平台还将定期邀请到全国知名教师，为
        广大用户推出公益课、直播课等课程信息，并定期为学生推荐优秀机构及课程。
      </p>
      <p>
        环球网教育“报名大厅”平台致力于为全国知名教育机构搭建家长、学生、沟通的桥梁。<b>全国知名教育机构也可免费申请入驻平台，发邮件至
         wuting@huanqiu.com 或 <br>marui@wisecnn.com 申请即可。</b>
      </p>
      <hr />
      <p style="color:#666666;margin-top:0.3rem;line-height:0.35rem">注：教育机构须在邮件里写明：名称、简介、官方网站、联系人、职务、电话以及相关问题。</p>
    </div>
    </scroller>
    <Tab />
  </div>
</template>

<script>
import Tab from "@/components/TabBar";
export default {
  name: "movie",
  components: {
    Tab
  }
};
</script>

<style scoped lang="less">
  .content {
  flex: 1;
  overflow: auto;
  // margin-bottom: 1.2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 6.5rem;
  margin: 0 auto 0.5rem;
  font-size: 0.3rem;
  padding:0 0 1.4rem 0;
  box-sizing: border-box; 
  color:#333;
  h3{
    font-size:0.34rem;
    padding:0.3rem 0 0.25rem;
    line-height:0.5rem;
    font-weight:bold;
  }
  p{
    text-indent: 2em;
    font-size:0.28rem;
    line-height:0.5rem;
  }
  }
</style>
