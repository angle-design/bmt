<template>
  <div class="content">
    <div>
      <p @click="sheetVisible = true">
        <font class="tit_text">话题：</font>
        <span>{{school}}</span>
        <i class="fa fa-angle-right"></i>
      </p>
    </div>

    <div>
      <p>
        <font :class="[sendflag&&!title&&!hua_con?'tit_text error':'tit_text']">标题：</font>
        <span>
          <input type="text" v-drop placeholder="我是" v-model="title" />，
        </span>
      </p>
      <p>
        <input type="text" v-drop placeholder="关于(35字以内)" v-model="hua_con"  maxlength="35"/>，
        <font>问我吧！</font>
      </p>
    </div>
    <div>
      <p>
        <font :class="[sendflag&&!contenthua?'tit_text error':'tit_text']">内容：</font>
        <textarea v-drop placeholder="请详细描述您的问题简介（400空以内)" v-model="contenthua" maxlength="400"></textarea>
      </p>
    </div>
    <div>
      <p>
        <!--<input @change="add_img" type="file" ref="filElem" style="display:none" />-->

        <span v-if="!btnShow" @click="choiceImg">
          <i class="fa fa-camera"></i>
          <font>点击上传封面（可选）</font>
        </span>
        <span v-else class="img_big">
          <img :src="imgs" class="dapic"/>
          <i @click.self="btnShow=false"></i>
        </span>
      </p>
    </div>
    <div>
      <p>
        <font :class="[sendflag&&!name?'tit_text error':'tit_text']">姓名：</font>
        <input type="text" v-drop v-model="name" />
      </p>
      <p>
        <font :class="[sendflag&&!tel?'tit_text error':'tit_text']">电话：</font>
        <input type="number" v-drop v-model="tel" />
      </p>
    </div>

    <button @click="toSend" :class="school&&title&&hua_con&&contenthua&&name&&tel&&imgs?'btnactive':''">提交问吧</button>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    <imgcai v-if="imgflag" @closecrop="closecrop" @changeimg="changeimg"></imgcai>
  </div>
</template>

<script>
import imgcai from "@/components/Imgcai2.vue";
import { Actionsheet, Toast } from "mint-ui";
export default {
  name: "Askinput",
  data() {
    return {
      imgflag: false,
      school: "小学",
      school_: 1,
      sheetVisible: false,
      actions: [],
      title: "", //题目
      hua_con: "",
      contenthua: "", //话题内容
      name: "", //姓名
      tel: "", //电话号码
      img: "",
      imgs: "",
      imgData: {
        accept: "image/jpeg, image/png, image/jpg"
      },
      btnShow: false,
      sendflag: false,
      toastInstanse: null
    };
  },
  mounted() {
    this.getTag();
    // this.imgs = this.$route.query.img;
    // if(this.imgs){}
    //   this.btnShow = true;
  },
  components: {
    imgcai
  },
  methods: {
    closecrop(){
      this.imgflag=false
    },
    //吊起上传图片
    choiceImg() {
      //this.$refs.filElem.dispatchEvent(new MouseEvent("click"));
      // this.$router.push("/imgcai2");
      this.imgflag = true;
    },
    //上传图片
    add_img(event) {
      let reader = new FileReader();
      let img1 = event.target.files[0];
      let type = img1.type; //文件的类型，判断是否是图片
      let size = img1.size; //文件的大小，判断图片的大小
      var uri = "";
      let form = new FormData();
      form.append("file", img1, img1.name);
      this.axios
        .post("/api/api/upload/uploadimage", form, {
          headers: {
            "Content-Type":
              "multipart/form-data;boundary = " + new Date().getTime()
          }
        })
        .then(res => {
          console.log();
          // uri = "http://www.t1.qidianjinfu.com" + response.data.result
          reader.readAsDataURL(img1);
          var that = this;
          reader.onloadend = function() {
            that.imgs = res.data.data.src;
          };
          this.$toast("上传成功");
          this.btnShow = true;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
      changeimg(src){
        // console.log(src);
          this.imgs = src;
          this.btnShow = true;
      },
    // 提交问吧
    toSend() {
      this.sendflag = true;
      if (!this.imgs) {
        this.$toast("你还没有上传图片哦~");
      }
      this.axios
        .post("/api/api/Ask/addhuati", {
          tag: this.school_,
          title: this.title,
          title2: this.hua_con,
          content: this.contenthua,
          image: this.imgs,
          name: this.name,
          phone: this.tel
        })
        .then(res => {
          if (res.data.code == 200) {
            this.toastInstanse = Toast({
              message: "管理员将在2个工作日内完成审核。", //弹窗内容
              position: "middle", //弹窗位置
              className: "mytoast" //自定义Toast 样式，需要自己提供一个类名
            });
          }else if(res.data.code==408) {
              this.$toast("请勿重复提交")
          }
        });
    },
    //请求tag
    getTag() {
      this.axios.get("/api/api/Ask/gettags").then(res => {
        if (res.data.code == 200) {
          res.data.list.forEach((item, index) => {
            this.actions.push(
              Object.assign({}, item, { method: this.clickAction })
            );
          });
        }
      });
    },
    clickAction(e) {
      this.school = e.name;
      this.school_ = e.id;
    }
  },
  watch: {
    imgs: function(val) {
      console.log(val);
    }
  }
};
</script>

<style scoped lang="less">
.content {
  flex: 1;
  min-height: 100vh;
  overflow: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  font-size: 0.3rem;
  box-sizing: border-box;
  background: #f4f4f4;
  width: 100%;
  input {
    font-size: 0.28rem;
  }
  & > div {
    border-bottom: 0.1rem solid #f4f4f4;
    background: #fff;
    width: 100%;
    padding: 0.2rem 0.25rem;
    box-sizing: border-box;
    line-height: 0.6rem;
    .tit_text {
      width: 1rem;
      display: flex;
      &.error {
        color: #da1d1d;
      }
    }
    &:nth-child(1) {
      p {
        display: flex;
        position: relative;
      }

      span {
        color: #369836;
      }
      i {
        position: absolute;
        right: 0;
        top: 0.1rem;
        font-size: 0.4rem;
      }
    }
    &:nth-child(2) {
      p {
        display: flex;
        &:nth-child(2) {
          margin-top: 0.1rem;
        }
      }
      input {
        width: 5.2rem;
      }
      span {
        width: 6.1rem;
        border-bottom: 0.02rem solid #eeeeee;
        padding-bottom: 0.1rem;
      }
      font {
        margin-left: 0.1rem;
      }
    }
    &:nth-child(3) {
      p {
        display: flex;
        align-items: flex-start;
        textarea {
          height: 3rem;
          width: 5.8rem;
          line-height: 0.4rem;
          font-size: 0.28rem;
          padding: 0.08rem 0;
        }
      }
    }
    &:nth-child(4) {
      p {
        width: 6.9rem;
        height: 2.45rem;
        border: 0.04rem dashed #eeeeee;
        border-radius: 0.1rem;
        font-size: 0.28rem;
        color: #999;
        overflow: hidden;
        img {
          width: 100%;
          height: auto;
        }
        span {
          width: 6.9rem;
          height: 2.45rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          i {
            font-size: 0.8rem;
            color: #eee;
            margin-bottom: 0.1rem;
          }
        }
      }
    }
    &:nth-child(5) {
      padding: 0.2rem 0;
      p {
        padding: 0 0.25rem;
        line-height: 0.8rem;
        display: flex;
        &:nth-child(1) {
          border-bottom: 0.02rem solid #f4f4f4;
        }
        input {
          width: 5.2rem;
        }
      }
    }
  }
  button {
    width: 6.3rem;
    height: 0.9rem;
    border-radius: 0.15rem;
    color: #fff;
    background: #ccc;
    margin: 0.3rem auto;
    font-size: 0.3rem;
    &.btnactive{
      background:#369836
    }
  }
}
.img_big {
  position: relative;
  i {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 0.4rem;
    color: #333 !important;
    width:0.63rem;
    height:0.58rem;
    display: block;
    background:url(http://bmdt.zgn365.com/Public/bb.png) no-repeat;
    background-size:0.63rem auto;
    background-position: 0 0;
  }
}
</style>
