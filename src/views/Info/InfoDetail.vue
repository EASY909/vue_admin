<!--  -->
<template>
  <div class="InfoDetail">
    <el-form ref="form" label-width="100px" :model="form">
      <el-form-item label="信息分类" prop="name">
        <el-select v-model="form.categoryId" placeholder="请选择">
          <el-option
            v-for="item in data.category"
            :key="item.id"
            :label="item.category_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新闻标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="缩略图">
        <UploadImg :imgUrl.sync="form.imgUrl" />
      </el-form-item>

      <el-form-item label="发布日期">
        <el-date-picker v-model="form.date" type="date" disabled placeholder="选择日期"></el-date-picker>
      </el-form-item>

      <el-form-item label="详细内容">
        <quillEditor v-model="form.content" ref="myQuillEditor" :options="data.editorOption" />
        <!-- <el-date-picker v-model="form.date" type="date" disabled placeholder="选择日期"></el-date-picker> -->
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { GetList, EdidInfo } from "@/api/news.js";
import { timestampToTime } from "@/utils/validate.js";
import { quillEditor } from "vue-quill-editor";
import UploadImg from "@c/uploadimg";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  name: "InfoDetail",
  //import引入的组件需要注入到对象中才能使用
  components: {
    quillEditor,
    UploadImg
  },
  data() {
    //这里存放数据
    return {
      data: {
        category: [],
        id: this.$route.query.id,
        editorOption: {},
        uploadKey: {
          token: "",
          key: ""
        }
      },
      form: {
        categoryId: "",
        title: "",
        date: "",
        content: "",
        imgUrl: ""
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    GetCategory() {
      this.getCategory().then(res => {
        this.data.category = res;
      });
    },
    getInfo() {
      let data = {
        pageNumber: 1,
        pageSize: 1,
        id: this.$route.query.id
      };
      GetList(data)
        .then(response => {
          let resData = response.data.data.data[0];

          this.form.categoryId = resData.categoryId;
          this.form.content = resData.content;
          this.form.title = resData.title;
          this.form.date = timestampToTime(resData.createDate);
          this.form.imgUrl = resData.imgUrl;
        })
        .catch(error => {});
    },
    submit() {
      let requestData = {
        id: this.data.id,
        categoryId: this.form.categoryId,
        title: this.form.title,
        content: this.form.content,
        imgUrl: this.form.imgUrl
      };
      EdidInfo(requestData)
        .then(Response => {
          this.$message({
            message: Response.data.message,
            type: "success"
          });
        })
        .catch(error => {});
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.GetCategory();
    this.getInfo();
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
<style lang='scss' >
//@import url(); 引入公共css类
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