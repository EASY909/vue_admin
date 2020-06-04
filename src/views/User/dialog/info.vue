<!--  -->
<template>
  <el-dialog title="新增" :visible.sync="flag_self" @close="close" @opened="opened" width="580px">
    <el-form ref="form" :model="form">
      <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
        <el-input v-model="form.username" placeholder="请输入邮箱" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="truename" :label-width="formLabelWidth">
        <el-input v-model="form.truename" placeholder="请输入姓名" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
        <el-input v-model="form.password" placeholder="请输入密码" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone" :label-width="formLabelWidth">
        <el-input v-model.number="form.phone" placeholder="请输入手机号" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="地区" prop="region" :label-width="formLabelWidth">
        <CityPicker
          ref="clearRegion"
          :cityPickLevel="['province','city','area','street']"
          :cityPickData.sync="data.cityPickData"
        />
        <!-- {{data.cityPickData}} -->
      </el-form-item>

      <el-form-item label="是否启用" :label-width="formLabelWidth">
        <el-radio v-model="form.status" label="1">禁用</el-radio>
        <el-radio v-model="form.status" label="2">启用</el-radio>
      </el-form-item>

      <el-form-item label="角色" prop="role" :label-width="formLabelWidth">
        <el-checkbox-group v-model="form.role">
          <!-- {{data.roleItem}} -->
          <el-checkbox :key="item.id" v-for="item in data.roleItem" :label="item.role">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="按钮" prop="btnPerm" :label-width="formLabelWidth">
        <template v-if="data.btnPerm.length>0">
          <div v-for="(item,index) in data.btnPerm" :key="index">
            <h4>{{item.name}}</h4>
            <template v-if="item.perm&&item.perm.length>0">
              <el-checkbox-group v-model="form.btnPerm" :key="index">
                <el-checkbox
                  :key="buttons.value"
                  v-for="buttons in item.perm"
                  :label="buttons.value"
                >{{buttons.name}}</el-checkbox>
              </el-checkbox-group>
            </template>
          </div>
        </template>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="flag_self = false">取消</el-button>
      <el-button type="danger" @click="submit('form')" :loading="subloading">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import CityPicker from "@c/citypicker/index.vue";
import { GetSystem, UserAdd, UserEdit, GetPermButton } from "@/api/user";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "infoDialog",
  components: { CityPicker },
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    editData: {
      type: Object,
      default: () => {}
    }
    // infocategory: {
    //   type: Array,
    //   default: []
    // }
  },
  data() {
    //这里存放数据
    return {
      data: {
        cityPickData: {},
        roleStatus: "1",
        roleItem: [],
        btnPerm: []
      },
      form: {
        username: "",
        truename: "",
        password: "",
        phone: "",
        status: "1",
        role: [],
        btnPerm: []
      },
      flag_self: false,
      formLabelWidth: "70px",
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
      this.$refs.form.resetFields();
      this.data.cityPickData = {};
      this.$refs.clearRegion.clearData();
      this.$emit("update:editData", {});
    },
    getSystem() {
      GetSystem()
        .then(res => {
          let data = res.data.data;
          this.data.roleItem = data;
        })
        .catch(error => {
          console.log(error);
        });

      GetPermButton().then(res => {
        this.data.btnPerm = res.data.data;
      });
    },
    opened() {
      this.getSystem();
      console.log(this.editData);
      if (this.editData.id) {
        console.log(1);
        console.log(this.editData.role);
        this.editData.role = this.editData.role
          ? this.editData.role.split(",")
          : []; // 数组
        this.editData.btnPerm = this.editData.btnPerm
          ? this.editData.btnPerm.split(",")
          : []; // 数组
        for (let key in this.editData) {
          this.form[key] = this.editData[key];
        }
      } else {
        console.log(2);
        this.form.id && delete this.form.id;
      }
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        // 表单验证通过
        if (valid) {
          // 数据处理
          let requestData = Object.assign({}, this.form); //
          console.log(requestData);
          // requestData.role = requestData.role.join(); // 数组转字符串，默认以，号隔开
          // requestData.btnPerm = requestData.btnPerm.join(); // 数组转字符串，默认以，号隔开
          // requestData.region = JSON.stringify(data.cityPickerData);
          // 添加状态：需要密码，并且加密码
          // 编辑状态：值存在，需要密码，并且加密码；否删除
          //   if (requestData.id) {
          //     if (requestData.password) {
          //       requestData.password = sha1(requestData.password);
          //     } else {
          //       delete requestData.password;
          //     }
          //     userEdit(requestData);
          //   } else {
          //     requestData.password = sha1(requestData.password);
          //     userAdd(requestData);
          //   }
          // } else {
          //   return false;
          // }
        }
      });
    },
    editUser(resData) {
      UserEdit(resData)
        .then(res => {
          if (res.data.resCode === 0) {
            this.$message({
              message: res.data.message,
              type: "success"
            });

            this.$refs.form.resetFields();
            this.data.cityPickData = {};
            this.$refs.clearRegion.clearData();
            this.flag_self = false;

            this.$emit("loadTable");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    addUser(resData) {
      UserAdd(resData)
        .then(res => {
          if (res.data.resCode === 0) {
            this.$message({
              message: res.data.message,
              type: "success"
            });

            this.$refs.form.resetFields();
            this.data.cityPickData = {};
            this.$refs.clearRegion.clearData();
            this.flag_self = false;

            this.$emit("loadTable");
          }
        })
        .catch(error => {
          console.log(error);
        });
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
</style>