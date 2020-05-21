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
              <ul>
                <li v-for="child in items.children" :key="child.id">
                  {{child.category_name}}
                  <div class="button-group">
                    <el-button size="mini" type="danger" round>编辑</el-button>

                    <el-button size="mini" type round>删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>

        <el-col :span="16">
          <div class="menu-title">一级分类编辑</div>
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
import { GetCategoryAll, AddFristCategory } from "@/api/news";
export default {
  name: "InfoCategory",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      infos: {
        items: []
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
      subtype: ""
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
    },
    firstItem(s) {
      this.subtype = s;
      this.first_input = true;
      this.second_input = false;
      this.butdis = false;
      this.first_input_dis = false;
      this.second_input_dis = false;
    },
    getCategoryAll() {
      GetCategoryAll().then(res => {
        console.log(res.data.data);
        this.infos.items = res.data.data;
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getCategoryAll();
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