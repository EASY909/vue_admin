<!--  -->
<template>
  <div class="InfoCategory">
    <el-button type="danger" @click="firstItem('add_first')">添加一级分类</el-button>
    <hr class="hr-e9" />
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="categroy-wrap">
            <div class="categroy" v-for="items in infos.items" :key="items.id">
              <h4>
                <svg-icon icon-class="plus"></svg-icon>
                {{items.category_name}}
                <div class="button-group">
                  <el-button
                    size="mini"
                    type="danger"
                    round
                    @click="editFirst({data:items,type:'first_edit'})"
                  >编辑</el-button>
                  <el-button
                    size="mini"
                    type="success"
                    round
                    @click="addSon({data:items,type:'add_son'})"
                  >添加子级</el-button>
                  <el-button size="mini" type round @click="deleteFirstConfirm(items.id)">删除</el-button>
                </div>
              </h4>
              <ul v-if="items.children">
                <li v-for="child in items.children" :key="child.id">
                  {{child.category_name}}
                  <div class="button-group">
                    <el-button
                      size="mini"
                      type="danger"
                      @click="editSecond({data:child,type:'second_edit'})"
                      round
                    >编辑</el-button>

                    <el-button size="mini" type round @click="deleteSecondConfirm(child.id)">删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>

        <el-col :span="16">
          <div class="menu-title">{{this.first_input?"一级分类编辑":"二级分类编辑"}}</div>
          <el-form
            :label-position="labelPosition"
            label-width="142px"
            style="width:410px;padding-top:26px"
          >
            <el-form-item label="一级分类名称" v-if="first_input">
              <el-input v-model="formLabelAlign.name" :disabled="first_input_dis"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称" v-if="second_input">
              <el-input v-model="formLabelAlign.region" :disabled="second_input_dis"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                :disabled="butdis"
                @click="submit"
                :loading="submitloading"
              >确定</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  AddFristCategory,
  GetCategory,
  DeleteCategory,
  EditCategory,
  AddChildrenCategory,
  GetCategoryAll
} from "@/api/news.js";
export default {
  name: "InfoCategory",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      infos: {
        items: [],
        current: []
      },
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      },

      first_input: true,
      first_input_dis: true,
      second_input: true,
      second_input_dis: true,
      submitloading: false,
      butdis: true,
      subtype: "",
      categoryId: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    submit() {
      this.submitloading = true;
      if (this.subtype === "add_first") {
        AddFristCategory({ categoryName: this.formLabelAlign.name })
          .then(res => {
            this.$message({
              message: res.data.message,
              type: "success"
            });
            this.infos.items.push(res.data.data);
            this.formLabelAlign.name = "";
            this.submitloading = false;
            // getCategory()
          })
          .catch(error => {
            this.submitloading = false;
          });
      }

      if (this.subtype == "first_edit") {
        this.editCategory();
      }

      if (this.subtype == "add_son") {
        if (this.formLabelAlign.region.trim() === "") {
          this.$message({
            type: "warning",
            message: "分类不能为空！"
          });
          this.submitloading = false;
          return;
        }

        let data = {
          categoryName: this.formLabelAlign.region,
          parentId: this.infos.current.id
        };

        AddChildrenCategory(data)
          .then(Response => {
            this.$message(Response.message);
            this.$message({
              type: "success",
              message: Response.data.message
            });
            // infos.items.push(Response.data.data);
            // getCategory()
            this.submitloading = false;

            // setTimeout(this.getCategoryAll(),1000)
            this.getCategoryAll();
          })
          .catch(error => {
            this.submitloading = false;
          });
      }

      if (this.subtype == "second_edit") {
        if (this.formLabelAlign.region.trim() === "") {
          this.$message({
            type: "warning",
            message: "分类不能为空！"
          });
          this.submitloading = false;
          return;
        }
        let currentData = {
          id: this.infos.current.id,
          categoryName: this.formLabelAlign.region
        };

        EditCategory(currentData)
          .then(Response => {
            this.$message({
              type: "success",
              message: Response.data.message
            });

            this.infos.current.category_name =
              Response.data.data.data.categoryName;

            // this.infos.current = [];
            // this.formLabelAlign.name = "";
            this.submitloading = false;
          })
          .catch(error => {
            this.submitloading = false;
          });
      }
    },
    firstItem(s) {
      this.subtype = s;
      this.first_input = true;
      this.second_input = false;
      this.butdis = false;
      this.first_input_dis = false;
      this.second_input_dis = false;
      this.formLabelAlign.name = "";
      this.submitloading = false;
    },
    getCategoryAll() {
      GetCategoryAll().then(res => {
        this.infos.items = res.data.data;
      });
    },
    deleteCategory() {
      DeleteCategory({
        categoryId: this.categoryId
      })
        .then(res => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.infos.items = this.infos.items.filter(item => {
            return item.id != this.categoryId;
          });

          this.categoryId = "";
        })
        .catch(error => {});
    },
    deleteFirstConfirm(cateid) {
      this.categoryId = cateid;
      this.confirm({
        content: "确认删除？",
        fn: this.deleteCategory
      });
    },
    deleteSecondConfirm(cateid) {
      this.categoryId = cateid;
      this.confirm({
        content: "确认删除？",
        fn: this.deleteSecondCategory
      });
    },
    deleteSecondCategory() {
      DeleteCategory({
        categoryId: this.categoryId
      })
        .then(res => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });

          // this.infos.items = this.infos.items.filter(item => {
          //   return item.id != this.categoryId;
          // });

          this.categoryId = "";
          this.getCategoryAll();
        })
        .catch(error => {});
    },
    editFirst(data) {
      this.subtype = data.type;
      this.second_input = false;
      this.first_input_dis = false;
      this.butdis = false;
      this.formLabelAlign.name = data.data.category_name;
      this.infos.current = data.data;
      this.submitloading = false;
      this.first_input = true;
    },
    editCategory() {
      if (this.infos.current.length == 0) {
        this.$message({
          type: "warning",
          message: "未选择分类！"
        });
        this.submitloading = false;
        return;
      }
      if (this.formLabelAlign.name.trim() === "") {
        this.$message({
          type: "warning",
          message: "分类不能为空！"
        });
        this.submitloading = false;
        return;
      }

      let currentData = {
        id: this.infos.current.id,
        categoryName: this.formLabelAlign.name
      };
      EditCategory(currentData)
        .then(Response => {
          this.$message({
            type: "success",
            message: Response.data.message
          });

          this.infos.current.category_name =
            Response.data.data.data.categoryName;

          // this.infos.current = [];
          // this.formLabelAlign.name = "";
          this.submitloading = false;
        })
        .catch(error => {
          this.submitloading = false;
        });
    },
    addSon(parms) {
      this.subtype = parms.type;
      this.formLabelAlign.name = parms.data.category_name;
      this.formLabelAlign.region = "";
      this.first_input = true;
      this.first_input_dis = true;
      this.second_input = true;
      this.butdis = false;
      this.second_input_dis = false;
      this.infos.current = parms.data;
    },
    editSecond(parms) {
      console.log(parms);
      this.subtype = parms.type;
      this.first_input = false;
      this.second_input = true;
      this.second_input_dis = false;
      this.infos.current = parms.data;
      this.formLabelAlign.region = parms.data.category_name;
      // console.log( this.infos.current);
      this.butdis = false;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getCategoryAll();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
@import "../../styles/config.scss";
.categroy-wrap {
  div:first-child {
    &:before {
      top: 20px;
    }
  }

  div:last-child {
    &:before {
      bottom: 20px;
    }
  }
}
.menu-title {
  line-height: 44px;
  position: relative;
  background-color: #f3f3f3;
  padding-left: 22px;
}
.categroy {
  line-height: 44px;
  position: relative;
  cursor: pointer;
  &:before {
    content: "";
    position: absolute;
    width: 32px;
    border-left: 1px dotted #000;
    left: 22px;
    top: 0px;
    bottom: 0px;
  }
  h4 {
    padding-left: 40px;
    position: relative;
  }
  svg {
    position: absolute;
    left: 15px;
    top: 15px;
    font-size: 17px;
    background-color: #fff;
    color: #000;
  }
  li {
    position: relative;
    padding-left: 36px;
    margin-left: 24px;
    &:before {
      content: "";
      position: absolute;
      width: 32px;
      border-bottom: 1px dotted #000;
      left: 0px;
      top: 22px;
    }
  }
}
li,
h4 {
  @include webkit(transtion, all 0.5s ease 0s);
  &:hover {
    background-color: #f3f3f3;
    .button-group {
      display: block;
    }
  }
}
.button-group {
  display: none;
  position: absolute;
  right: 11px;
  top: -1px;
  font-size: 12px;
}
.hr-e9 {
  width: calc(100%+60px);
  margin-left: -30px;
  border: none;
  margin-top: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid #e9e9e9;
}
</style>