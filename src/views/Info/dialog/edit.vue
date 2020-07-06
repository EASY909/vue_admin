<!--  -->
<template>
  <el-dialog title="修改" :visible.sync="flag_self" @close="close" width="580px" @opened="opened">
    <el-form :model="form" ref="addInfoForm">
      <el-form-item label="类型" :label-width="formLabelWidth">
        <el-select v-model="form.categroy" placeholder="类型">
          <el-option
            v-for="items in openedCate.items"
            :key="items.id"
            :label="items.category_name"
            :value="items.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" :label-width="formLabelWidth">
        <el-input v-model="form.name" placeholder="请输入标题" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="概况" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.content" placeholder="请输入内容" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="flag_self = false">取消</el-button>
      <el-button type="danger" :loading="subloading" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { GetList, EdidInfo } from "@/api/news.js";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "infoDialog",
  components: {},
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    infocategory: {
      type: Array,
      default: []
    },
    editId: {
      type: String,
      default: ""
    }
  },
  data() {
    //这里存放数据
    return {
      flag_self: false,
      form: {
        name: "",
        content: "",
        categroy: ""
      },
      formLabelWidth: "70px",
      openedCate: {
        items: []
      },
      subloading: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    flag(nv, ov) {
      this.flag_self = nv;
    }
  },
  //方法集合
  methods: {
    close() {
      this.$emit("update:flag", false);
    },
    submit() {
      this.subloading = true;
      if (!this.form.categroy || !this.form.name || !this.form.content) {
        this.$message({
          message: "不能为空！",
          type: "danger"
        });
        this.subloading = false;
        return;
      }
      let data = {
        id: this.editId,
        categoryId: this.form.categroy,
        title: this.form.name,
        content: this.form.content
      };
      EdidInfo(data)
        .then(Response => {
          this.$message({
            message: Response.data.message,
            type: "success"
          });
        //   this.form.name = "";
        //   this.form.content = "";
        //   this.form.categroy = "";
          // close();
          this.subloading = false;

          this.$emit("getList", false);
        })
        .catch(error => {
          this.subloading = false;
        });
    },
    opened() {
      this.openedCate.items = this.infocategory;

      this.getInfo();
    },
    getInfo() {
      let resData = {
        id: this.editId,
        pageNumber: 1,
        pageSize: 1
      };
      GetList(resData)
        .then(res => {
          let data = res.data.data.data;

          this.form.name = data[0].title;
          this.form.content = data[0].content;
          this.form.categroy = data[0].categoryId;

          //   this.total = data.total;
          //   this.tableData = data.data;

          //   this.loading = false;
        })
        .catch(error => {
          //   this.loading = false;
        });
    }
  },
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>