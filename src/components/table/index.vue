<!--  -->
<template>
  <div>
    <el-table :data="data.tableData" border style="width: 100%" @selection-change="tableSelectBox">
      <!-- 多选框-->
      <el-table-column v-if="data.tableConfig.tSelect" type="selection" width="55"></el-table-column>

      <!-- 数据-->
      <template v-for="items in data.tableConfig.tHead">
        <el-table-column
          :prop="items.field"
          :label="items.label"
          :width="items.width"
          :key="items.field"
          v-if="items.columnType==='slot'"
        >
          <template slot-scope="scope">
            <slot :name="items.slotName" :data="scope.row"></slot>
          </template>
        </el-table-column>

        <el-table-column
          v-else
          :key="items.field"
          :prop="items.field"
          :label="items.label"
          :width="items.width"
        ></el-table-column>
      </template>
    </el-table>
    <div class="black-space-30"></div>
    <el-pagination
      v-if="data.tableConfig.pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>




<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import loadTableData from "@/mixins/loadTableData.js";
import pagination from "@/mixins/pagination.js";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "tableIndex",
  mixins: [loadTableData, pagination],
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    //这里存放数据
    return {
      data: {
        tableConfig: {
          tSelect: true,
          recordBox: true,
          tHead: [],
          requestUrlData: {},
          pagination: false
        },
        tableData: [
          {
            username: "1730127479@qq.com",
            truename: "王小虎",
            phone: "17805012035",
            region: "安徽",
            role: "超管"
          },
          {
            username: "1730127479@qq.com",
            truename: "秦小虎",
            phone: "17805012035",
            region: "安徽",
            role: "超管"
          }
        ],
        requestData: {}
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    initTable() {
      let configData = this.config;

      let keys = Object.keys(this.data.tableConfig);
      for (const key in configData) {
        if (keys.includes(key)) {
          this.data.tableConfig[key] = configData[key];
        }
      }
      this.data.requestData = JSON.parse(
        JSON.stringify(this.data.tableConfig.requestUrlData)
      );
    },
    tableSelectBox() {}
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.initTable();
    // this.loadData();
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
</style>