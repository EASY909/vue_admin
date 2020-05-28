<!--  -->
<template>
  <el-upload
    class="avatar-uploader"
    action="http://up-z2.qiniup.com"
    :data="data.uploadKey"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="data.uploadImgUrl" :src="data.uploadImgUrl" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
export default {
  name: "uploadImg",
  props: {
    imgUrl: {
      type: String,
      default: ""
    }
  },
  //import引入的组件需要注入到对象中才能使用
  data() {
    //这里存放数据
    return {
      data: {
        uploadImgUrl: "",
        uploadKey:{
          token:"",
          key: ""
        }
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    imgUrl(nv, ov) {
     
      this.data.uploadImgUrl = nv;
    }
  },
  //方法集合
  methods: {
    getqiniu() {
      let requestData = {
        accesskey: "HdkslDVZsZ6f4WCk1-F9fMgK95SBAM6xx4wNeVSF",
        secretkey: "5hvLK4W2alZ8ttHCSC6YxffAcPzu7XiRRV5TwLre",
        buckety: "imgeasy909"
      };
      this.qiniuToken(requestData)
        .then(res => {
          this.data.uploadKey.token = res.data.data.token;
        })
        .catch(error => {});
    },
    handleAvatarSuccess(res, file) {
      let image = `http://images.easy909.xyz/${res.key}`;
      this.data.uploadImgUrl = image;
      this.$emit("update:imgUrl", image);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      // 文件名转码
      let suffix = file.name;
      let key = encodeURI(`${suffix}`);
      this.data.uploadKey.key = key;
      return isJPG && isLt2M;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getqiniu();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style  lang="scss">
/* @import url(); 引入css类 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff !important;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>