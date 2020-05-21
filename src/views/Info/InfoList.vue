<!--  -->
<template>
  <div>
    <el-row :gutter="16">
      <el-col :span="4">
        <div class="label-wrap categroy">
          <label for>类型：</label>
          <div class="wrap-content">
            <el-select v-model="typeValue" placeholder="请选择" style="width:100%;">
              <el-option
                v-for="item in options.category"
                :key="item.id"
                :label="item.category_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="label-wrap date">
          <label for>日期：&nbsp;&nbsp;</label>
          <div class="wrap-content">
            <el-date-picker
              style="width:100%"
              v-model="dateValue"
              type="datetimerange"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
            ></el-date-picker>
          </div>
        </div>
      </el-col>

      <el-col :span="3">
        <div class="label-wrap search_key">
          <label for>关键字：&nbsp;&nbsp;</label>
          <div class="wrap-content">
            <!-- <Select :config="data.configOption" /> -->
            <el-select v-model="search_key" placeholder="请选择" style="width:100%;">
              <el-option
                v-for="(item,index) in search_option"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>

      <el-col :span="3">
        <el-input v-model="search_keyWork" style="width:100%" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" @click="search">搜索</el-button>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="2">
        <el-button type="danger" @click="dialog_info=true" class="pull-right">新增</el-button>
      </el-col>
    </el-row>
    <div class="black-space-30"></div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="title" label="标题" width="830"></el-table-column>
      <el-table-column prop="category" label="类别" width="130"></el-table-column>
      <el-table-column prop="date" label="日期" width="137"></el-table-column>
      <el-table-column prop="user" label="管理员" width="115"></el-table-column>
      <el-table-column prop="option" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="medium" @click="deleteItem">删除</el-button>
          <el-button type="success" size="medium" @click="dialog_info=true">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="black-space-30"></div>
    <el-row>
      <el-col :span="12">
        <el-button size="medium" @click="deleteAll">批量删除</el-button>
      </el-col>

      <el-col :span="12">
        <el-pagination
          class="pull-right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          layout="total,prev,sizes, pager, next"
          :total="1000"
        ></el-pagination>
      </el-col>
    </el-row>

    <DialogInfo :flag.sync="dialog_info" />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import DialogInfo from "./dialog/info";
export default {
  name: "InfoList",
  //import引入的组件需要注入到对象中才能使用
  components: { DialogInfo },
  data() {
    //这里存放数据
    return {
      typeValue: "",
      options: [],
      dateValue: "",
      data: {
        configOption: ""
      },
      search_key: "id",
      search_keyWork: "",
      search_option: [
        {
          value: "id",
          label: "ID"
        },
        {
          value: "title",
          label: "标题"
        }
      ],
      tableData: [
        {
          title: "2016-05-02",
          category: "王小虎",
          date: "上海市普陀区金沙江路 1518 弄",
          user: "王小虎"
        },
        {
          title: "2016-05-02",
          category: "王小虎",
          date: "上海市普陀区金沙江路 1518 弄",
          user: "王小虎"
        },
        {
          title: "2016-05-02",
          category: "王小虎",
          date: "上海市普陀区金沙江路 1518 弄",
          user: "王小虎"
        },
        {
          title: "2016-05-02",
          category: "王小虎",
          date: "上海市普陀区金沙江路 1518 弄",
          user: "王小虎"
        }
      ],
      dialog_info: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    search() {},
    confirmDelete(a){
      console.log(a);
    },
    deleteItem() {
        this.confirm({
        content:"确认删除？",
        fn:this.confirmDelete
      })
    },
    deleteAll(){
      this.confirm({
        content:"确认删除？",
        fn:this.confirmDelete
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
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
@import "@/styles/config.scss";
.label-wrap {
  &.categroy {
    @include labelDom(left, 60, 40);
  }
  &.date {
    @include labelDom(right, 93, 40);
  }
  &.search_key {
    @include labelDom(right, 90, 40);
  }
}
</style>