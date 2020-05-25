<!--  -->
<template>
  <div class="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          @click="togglemenu(item)"
          :class="{current:item.current}"
          v-for="(item,index) in menuTab"
          :key="index"
        >{{item.txt}}</li>
      </ul>

      <el-form :model="ruleForm" class="login-form" status-icon :rules="rules" ref="ruleForm">
        <el-form-item prop="username" class="item-form">
          <label for>邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-form">
          <label for>密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="passwords" class="item-form" v-show="model=='register'">
          <label for>重复密码</label>
          <el-input
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-form">
          <label for>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button
                type="success"
                class="block"
                @click="GetSms"
                :disabled="codeButtonStatus.status"
              >{{codeButtonStatus.text}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            :disabled="loginButtonStatus"
            class="login-btn block"
          >{{model=='register'?"注册":"登录"}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  checkEmail,
  checkPassword,
  stripscript,
  validateCode
} from "@/utils/validate";
import { getSms, Register, Login } from "@/api/login";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "loginIndex",
  data() {
    //这里存放数据
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (checkEmail(value)) {
        callback(new Error("用户名格式有误"));
      } else {
        callback();
      }
    };
    let validatePassword = (rule, value, callback) => {
      this.ruleForm.password = stripscript(value);
      value = this.ruleForm.password;
      //console.log(stripscript(value))
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (checkPassword(value)) {
        callback(new Error("密码为6位至20位数字或字母!"));
      } else {
        callback();
      }
    };
    let validatePasswords = (rule, value, callback) => {
      if (this.model === "login") {
        callback();
      }

      this.ruleForm.passwords = stripscript(value);
      value = this.ruleForm.passwords;
      //console.log(stripscript(value))
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.ruleForm.password) {
        callback(new Error("重复密码不正确!"));
      } else {
        callback();
      }
    };
    let checkCode = (rule, value, callback) => {
      this.ruleForm.code = stripscript(value);
      value = this.ruleForm.code;

      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (validateCode(value)) {
        callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    return {
      model: "login",
      menuTab: [
        { txt: "登录", current: true, type: "login" },
        { txt: "注册", current: false, type: "register" }
      ],
      ruleForm: {
        username: "",
        password: "",
        passwords: "",
        code: ""
      },
      rules: {
        username: [{ validator: validatePass, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        passwords: [{ validator: validatePasswords, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }]
      },
      loginButtonStatus: true,
      codeButtonStatus: {
        status: false,
        text: "获取验证码"
      },
      timer: null
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    togglemenu(data) {
      this.menuTab.forEach(item => {
        item.current = false;
      });
      data.current = true;
      this.model = data.type;

      this.$refs.ruleForm.resetFields();
      this.clearCountDown();
    },
    submitForm(formName) {
      // return false;

      this.$refs[formName].validate(valid => {
        if (valid) {
          this.model === "login" ? this.login() : this.register();
        } else {
          this.$message({
            showClose: true,
            message: "保证信息完整！",
            type: "error"
          });
          return false;
        }
      });
    },
    /**
     * 验证码
     */
    GetSms() {
      if (!this.ruleForm.username) {
        this.$message({
          showClose: true,
          message: "邮箱不能为空",
          type: "error"
        });
        return false;
      }

      if (checkEmail(this.ruleForm.username)) {
        this.$message({
          showClose: true,
          message: "邮箱格式有误",
          type: "error"
        });
        return false;
      }

      this.codeButtonStatus.status = true;
      this.codeButtonStatus.text = "发送中";

      getSms({ username: this.ruleForm.username, model: this.model.value })
        .then(response => {
          let data = response.data;
          this.$message({
            message: data.message,
            type: "success"
          });

          this.loginButtonStatus = false;
          this.countDown(10);
        })
        .catch(error => {
          console.log(error);
        });
    },
    /**
     * 注册
     */
    register() {
      let requestData = {
        username: this.ruleForm.username,
        password: this.ruleForm.password,
        code: this.ruleForm.code,
        model: "register"
      };
      Register(requestData)
        .then(response => {
          let data = response.data;
          this.$message({
            showClose: true,
            message: data.message,
            type: "success"
          });

          this.togglemenu(menuTab[0]);
          this.clearCountDown();
        })
        .catch(error => {});
    },
    /**
     * 登录
     */
    login() {
      let requestData = {
        username: this.ruleForm.username,
        password: this.ruleForm.password,
        code: this.ruleForm.code
      };
      this.$store.dispatch("login/login", requestData).then(res => {
        let data = res.data;
 
        // this.$message({
        //   message: data.message,
        //   type: "success"
        // });
        this.$router.push({
          name: "Console"
        });
      }).catch(error => {
        console.log(error);
      });
    },
    /**
     * 倒计时
     */
    countDown(num) {
      if (this.timer) {
        clearInterval(timer.value);
      }
      let time = num;

      this.timer = setInterval(() => {
        time--;
        // console.log(time);
        if (time === 0) {
          clearInterval(this.timer);
          this.codeButtonStatus.status = false;
          this.codeButtonStatus.text = "再次获取";
        } else {
          this.codeButtonStatus.text = `倒计时${time}秒`;
        }
      }, 1000);
    },
    /**
     * 清除倒计时
     */
    clearCountDown() {
      this.codeButtonStatus.status = false;
      this.codeButtonStatus.text = "获取验证码";
      clearInterval(this.timer);
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
.login {
  height: 100vh;
  background: #344a5f;
  .login-wrap {
    // transform: translateY(50%);
    width: 330px;
    margin:0 auto;
    .menu-tab {
      text-align: center;
      li {
        display: inline-block;
        width: 88px;
        line-height: 36px;
        font-size: 14px;
        color: aliceblue;
        border-radius: 2px;
        cursor: pointer;
      }
      .current {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }

    .login-form {
      label {
        display: block;
        margin-bottom: 3px;
        font-size: 14px;
        color: #fff;
      }
      .item-form {
        margin-bottom: 13px;
      }

      .block {
        display: block;
        width: 100%;
      }
      .login-btn {
        margin-top: 19px;
      }
    }
  }
}
</style>