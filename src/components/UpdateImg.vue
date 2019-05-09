<template>
  <div>
    <div  class="avatar-uploader">
      <div tabindex="0" class="el-upload el-upload--text" ref="container">
        <a id="selectfiles" href="javascript:void(0);" class='el-icon-plus avatar-uploader-icon' v-show="Noshow" ></a>
        <img id="selectfiles" v-show="!Noshow" :src="'https://img.meinianuniversity.com'+imageUrl" class="avatar" >
      </div>
    </div>
    <div id="container" >
      <div @click="set_upload_param(uploader)" style="display: none">
        <a id="postfiles" href="javascript:void(0);" class='btnAliyun'>开始上传</a>
      </div>
    </div>
  </div>
</template>
<script>
import '@/common/js/aliyun-upload/lib/es6-promise.min.js'
import '@/common/js/aliyun-upload/aliyun-upload-sdk-1.3.0.min.js'
export default {
  name: 'UpdateImg',
  data() {
      return {
        //上传
        imageUrl: '',
        Noshow:true
      }
  },
  methods: {
    //图片上传
    initAliyun (){
        var _this = this;
        // 0 添加selectfiles,container；1修改selectfilesEdit,containerEdit
        uploaderImg = new plupload.Uploader({
            //  runtimes : 'flash', 不能用flash
            browse_button : 'selectfiles',
            container: _this.$refs.container,
            flash_swf_url : '../../common/aliyunUp/Moxie.swf',
            silverlight_xap_url : '../../common/aliyunUp/Moxie.xap',
            url : 'https://img.meinianuniversity.com',
            multi_selection:false,//只能选单文件
            filters:{
                mime_types : [ //只允许上传图片
                    { title : "Image files", extensions : "jpg,jpeg,png,JPG,JPEG,PNG" },
                ],
                max_file_size : '10mb', //最大只能上传400kb的文件
                prevent_duplicates : false //不允许选取重复文件
            },
            init: {
                PostInit: function() {
                    _this.uploader = uploaderImg;
                    $('.moxie-shim').css('width','100px').css('height','100px');
                },
                FilesAdded: function(up, files) {
                    if (up.files.length > 1) {
                        up.removeFile(up.files[0]);
                    }
                    TimeJson = util.jsonDateFormatUpAli();
                    var type = files[0].name.split('.')[1];
                    filename =TimeJson+'/'+ Date.parse(new Date())+Math.floor(Math.random()*100000)+'.'+type;
                    _this.set_upload_param(up)
                },
                UploadProgress: function(up, file) {
                },
                FileUploaded: function(up, file, info) {
                    _this.set_upload_param(up);
                    $('.moxie-shim').css('width','100px').css('height','100px');
                    if (info.status >= 200 || info.status < 200) {
                        if(_this.setFM){
                            _this.imageUrl ="/"+_this.project+"/"+filename;
                            _this.$message({
                                message: '上传成功',
                                type: 'success'
                            });
                            _this.Noshow = false;
                            _this.addForm.Cover =  _this.imageUrl
                        }else{
                            if(_this.pageNow==1){//第一页
                                _this.addForm.Content+="<img src=https://img.meinianuniversity.com/"+_this.project+"/"+filename+">"
                            }else if(_this.pageNow==2){
                                _this.addCourseInfo.Content+="<img src=https://img.meinianuniversity.com/"+_this.project+"/"+filename+">"
                            }
                        }
                    } else {
                        _this.$message({
                            message: '上传失败',
                            type: 'error'
                        });
                    }
                },
            }
        });
        uploaderImg.init();
    },
    //获取上传参数
    set_upload_param:function(up){
        var new_multipart_params;
        var ret = this.get_signature()
        if (ret == true) {
            new_multipart_params = {
                'key' : key + '/'+filename,
                'policy': policyBase64,
                'OSSAccessKeyId': accessid,
                'success_action_status' : '200',
                'signature': signature,
            };
            up.setOption({
                'url': host,
                'multipart_params': new_multipart_params
            });
        }
        uploaderImg.start();
        return false;
    },
    get_signature:function(){
        this.send_request();
        host = host
        policyBase64 = dataList.policy
        accessid = dataList.accessid
        signature = dataList.signature
        expire = parseInt(dataList.expire)
        key =dataList.dir
        return true;
    },
    send_request:function(){
        var _this = this 
        $.ajax({
            type: "get",
            //url: "https://www3.xlxt.net/AliyunOSS/GetOssSignature",
            url: "https://lms.meinianuniversity.com/AliyunOSS/GetOssSignature",
            data:{dir:_this.project},
            async:false,
            success:function(res){
                if(res.Code==200){
                    dataList =res.Data ;
                }
            }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.avatar-uploader{
        display: inline-block;
        border: 1px dashed #909399!important;
        vertical-align: text-bottom;
        margin-top: 10px;
        height: 100px;
        /*position: absolute;*/
        /*left: 520px;*/
        /*top: -20px;*/
    }
    .avatar-uploader .el-upload {
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
.avatar-uploader-icon {
    font-size: 20px;
    color: #8c939d!important;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
}
</style>
