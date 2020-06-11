<template>
    <div class="content">
    <div >
        <div class="cropper1">
            <div class="cropper-content">
                <div class="cropper">
                    <vueCropper
                            ref="cropper"
                            :img="option.img"
                            :outputSize="option.size"
                            :outputType="option.outputType"
                            :info="true"
                            :full="option.full"
                            :canMove="option.canMove"
                            :canMoveBox="option.canMoveBox"
                            :original="option.original"
                            :autoCrop="option.autoCrop"
                            :autoCropWidth="option.autoCropWidth"
                            :autoCropHeight="option.autoCropHeight"
                            :fixedBox="option.fixedBox"
                            :fixedNumber="[1,1]"
                            @realTime="realTime"
                            @imgLoad="imgLoad"

                    ></vueCropper>
                </div>
                <!-- <div style="margin-left:20px;">
                    <div
                            class="show-preview"
                            :style="{'width': '150px', 'height':'155px',  'overflow': 'hidden', 'margin': '5px'}"
                    ></div>
                </div> -->
            </div>
        </div>
        <div class="eleme">
            <el-upload
                    class="upload-demo"
                    ref="upload"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :before-upload="beforeUpload"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :auto-upload="true"
                    :show-file-list="false"

            >
                <el-button slot="trigger" size="small" type="primary">选择图片</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传图片</el-button>
            </el-upload>
        </div>
    </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                headImg: '',
                //剪切图片上传
                crap: false,
                previews: {},
                option: {
                    img: '',
                    outputSize: 1, //剪切后的图片质量（0.1-1）
                    full: false, //输出原图比例截图 props名full
                    outputType: 'png',
                    canMove: true,
                    original: false,
                    canMoveBox: true,
                    autoCrop: true,
                    autoCropWidth: 710,
                    autoCropHeight: 248,
                    fixedBox: true
                },
                fileName: '', //本机文件地址
                downImg: '#',
                imgFile: '',
                uploadImgRelaPath: '' //上传后的图片的地址（不带服务器域名）
            }
        },

        methods: {
            submitUpload(file) {
                // this.$refs.upload.submit();
                this.finish('blob')
            },
            handleRemove(file, fileList) {
                console.log(file, fileList)
            },
            handlePreview(file) {
                console.log(file)
                //   let data = window.URL.createObjectURL(new Blob([file]));
                //   this.option.img = data;
            },
            beforeUpload(file) {
                console.log('上传文件')
                console.log(file)
                let data = window.URL.createObjectURL(new Blob([file]))
                this.fileName = file.name
                this.option.img = data
            },
            //放大/缩小
            changeScale(num) {
                // console.log('changeScale')
                num = num || 1
                this.$refs.cropper.changeScale(num)
            },
            //坐旋转
            rotateLeft() {
                // console.log('rotateLeft')
                this.$refs.cropper.rotateLeft()
            },
            //右旋转
            rotateRight() {
                // console.log('rotateRight')
                this.$refs.cropper.rotateRight()
            },
            //上传图片（点击上传按钮）
            finish(type) {
                // console.log('finish')
                let _this = this
                let formData = new FormData()
                // 输出
                if (type === 'blob') {
                    this.$refs.cropper.getCropBlob(data => {
                        let img = window.URL.createObjectURL(data)
                        this.model = true
                        this.modelSrc = img
                        formData.append('file', data, this.fileName)
                        this.axios.post('/api/api/upload/uploadimage', formData, {
                                contentType: false,
                                processData: false,
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                            })
                            .then(response => {
                                var res = response.data
                                if (res.code == 200) {

                                    this.$router.push({name:'askfile',query:{img:res.data.src}});

                                }
                            })
                    })
                } else {
                    this.$refs.cropper.getCropData(data => {
                        this.model = true
                        this.modelSrc = data
                    })
                }
            },
            // 实时预览函数
            realTime(data) {
                console.log('realTime')
                this.previews = data
            },
            imgLoad(msg) {
                console.log('imgLoad')
                console.log(msg)
            }
        }
    }
</script>
<style lang="less" scoped>
.content {
  flex: 1;
  overflow: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  background: #f8f8f8;
  padding-bottom: 0.2rem;
  background: rgba(0,0,0,0.6);
  justify-content: center;
  height:100%;
//   align-items: center;
  width:100%;
  overflow-x:hidden;
}
    .cropper-content {
        width:100%;
    
        .cropper {
            /*width:5rem;*/
            margin:0 auto;
            height:5rem;
        }
        .show-preview {
            flex: 1;
            -webkit-flex: 1;
            display: flex;
            display: -webkit-flex;
            justify-content: center;
            -webkit-justify-content: center;
            .preview {
                overflow: hidden;
                border-radius: 50%;
                border: 1px solid #cccccc;
                background: #cccccc;
                margin-left: 40px;
            }
        }
    }
    .cropper-content .show-preview .preview {
        margin-left: 0;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        -khtml-user-select: none;
        user-select: none;
    }
    .eleme{
        width:100%;
        display: flex;
       align-items: center;
       justify-content: center;
       padding-top:30px;
    }
</style>




