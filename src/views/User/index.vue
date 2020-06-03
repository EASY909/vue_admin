<!--  -->
<template>
  <div>
    <el-row>
      <el-col :span="20">
        <el-row :gutter="16">
          <el-col :span="6">
            <div class="label-wrap search_key">
              <label for>关键字：&nbsp;&nbsp;</label>
              <div class="wrap-content">
                <Select :config="data.configOption" />
                <!-- <el-select placeholder="请选择">
                  <el-option></el-option>
                </el-select>-->
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <el-input v-model="data.search_keyWork" style="width:100%" placeholder="请输入内容"></el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="danger">搜索</el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="4">
        <el-button type="danger" @click="dialogInfo=true" class="pull-right">添加用户</el-button>
      </el-col>
    </el-row>

    <div class="black-space-30"></div>
    <Table ref="Table" :config="data.configTable" :tableRow.sync="data.tableRow">
      <template v-slot:status="slotData">
        <el-switch
          @change="handlerChange(slotData.data)"
          v-model="slotData.data.status"
          active-color="#13ce66"
          inactive-value="1"
          active-value="2"
          inactive-color="#ff4949"
        ></el-switch>
      </template>

      <template v-slot:operation="slotData">
        <!-- {{slotData.data.username}} -->
        <el-button type="danger" @click="operation(slotData.data.id)">删除</el-button>
        <el-button type="success" @click="handlerEdit(slotData.data)">编辑</el-button>
      </template>

      <template v-slot:tableFooterLeft>
        <el-button @click="batchDel" type="danger">批量删除</el-button>
      </template>
    </Table>
    <Dialog @loadTable="loadTable" :flag.sync="dialogInfo" />
    <!-- <A a="12" b="qc" /> -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Select from "@c/select";
import Table from "@c/table";
import Dialog from "./dialog/info";
// import A from "./dialog/Attrs"
import { RequestUrl } from "@/api/requestUrl.js";
import { UserActives, UserDel } from "@/api/user";
//bus
// import EventBus from "@/utils/bus.js";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Select,
    Table,
    Dialog,
    A
  },
  data() {
    //这里存放数据
    return {
      data: {
        tableRow: {},
        editData: {},
        configOption: ["name", "phone"],
        configTable: {
          tSelect: true,
          recordBox: true,
          tHead: [
            {
              label: "邮箱/用户名",
              field: "username",
              width: 100
            },
            {
              label: "真实姓名",
              field: "truename",
              width: 200
            },
            {
              label: "手机号",
              field: "phone"
            },
            {
              label: "地区",
              field: "region"
            },
            {
              label: "角色",
              field: "role"
            },
            {
              label: "禁用状态",
              field: "status",
              columnType: "slot",
              slotName: "status"
            },
            {
              label: "操作",
              columnType: "slot",
              slotName: "operation"
            }
          ],
          requestUrlData: {
            url: RequestUrl.getUserList,
            method: "post",
            data: {
              pageNumber: 1,
              pageSize: 5
            }
          },
          pagination: true
        },
        search_key: "",
        search_keyWork: "",
        options: [
          {
            value: "2",
            lable: "1"
          }
        ]
      },
      dialogInfo: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    operation(id) {
      this.confirm({
        content: "确认删除？",
        fn: this.userDel,
        data: [id]
      });
    },
    userDel(data) {
      let resData = {
        id: [data][0]
      };
      // console.log(resData);
      UserDel(resData)
        .then(res => {
          let resData = res.data;
          this.$message({
            message: resData.message,
            type: "success"
          });
          this.loadTable();
        })
        .catch(error => {
          console.log(error);
        });
    },
    handlerEdit(data) {
      console.log(data);
    },
    handlerChange(data) {
      let resData = {
        id: data.id,
        status: data.status
      };
      UserActives(resData)
        .then(res => {
          this.$message({
            message: res.data.message,
            type: "success"
          });
        })
        .catch(error => {
          console.log(error);
        });
      // console.log(data);
    },
    loadTable() {
      this.$refs.Table.tableLoadData();
    },
    batchDel() {
      if (this.data.tableRow.idItem) {
        this.confirm({
          content: "确认删除？",
          fn: this.userDel,
          data: this.data.tableRow.idItem
        });
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // EventBus.$on("busFn",(data)=>{
    //   console.log(data);
    // })

    // console.log(this.$children);
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