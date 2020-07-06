<!--  -->
<template>
  <el-dialog title="新增" :visible.sync="flag_self" @close="close" @opened="opened" width="580px">
    <el-form ref="form" :model="form" :rules="data.rules">
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
import {
  checkEmail,
  checkPassword,
  stripscript,
  validateCode
} from "@/utils/validate";
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
  },
  data() {
    //这里存放数据
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (checkEmail(value)) {
        callback(new Error("用户名格式有误"));
      } else {
        callback(); //true
      }
    };
    // 验证密码
    let validatePassword = (rule, value, callback) => {
      if (this.form.id && !value) {
        callback();
      }
      if ((this.form.id && value) || !this.form.id) {
        // 过滤后的数据
        if (value) {
          this.form.password = stripscript(value);
          value = this.form.password;
        }
        if (value === "") {
          callback(new Error("请输入密码"));
        } else if (checkPassword(value)) {
          callback(new Error("密码为6至20位数字+字母"));
        } else {
          callback();
        }
      }
    };
    return {
      data: {
        cityPickData: {},
        roleStatus: "1",
        roleItem: [],
        btnPerm: [],
        rules: {
          username: [{ validator: validateUsername, trigger: "blur" }],
          password: [{ validator: validatePassword, trigger: "blur" }],
          role: [{ required: true, message: "请选择角色", trigger: "change" }]
        }
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
      // this.data.cityPickData = {};
      // this.$refs.clearRegion.clearData();
      this.$emit("update:editData", {});
    },
    getSystem() {
      if (this.data.roleItem.length===0) {
        GetSystem()
          .then(res => {
            let data = res.data.data;
            this.data.roleItem = data;
          })
          .catch(error => {
            console.log(error);
          });
      }
      if (this.data.btnPerm.length===0) {
        GetPermButton().then(res => {
          this.data.btnPerm = res.data.data;
        });
      }
    },
    opened() {
      this.getSystem();

      if (this.editData.id) {
        for (let key in this.editData) {
          this.form[key] = this.editData[key];
        }

        this.form.role = this.form.role.split(",");
        this.form.btnPerm = this.form.btnPerm.split(",");
        this.data.cityPickData = JSON.parse(this.editData.region);
      } else {
        this.form.id && delete this.form.id;
      }
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        // 表单验证通过
        if (valid) {
          this.form.region = "";
          let requestData = Object.assign({}, this.form); //
          requestData.role = requestData.role.join(); // 数组转字符串，默认以，号隔开
          requestData.btnPerm = requestData.btnPerm.join(); // 数组转字符串，默认以，号隔开
          requestData.region = JSON.stringify(this.data.cityPickData);

          // 添加状态：需要密码，并且加密码
          // 编辑状态：值存在，需要密码，并且加密码；否删除
          if (requestData.id) {
            this.editUser(requestData);
          } else {
            this.addUser(requestData);
          }
        } else {
          console.log("error");
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
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>