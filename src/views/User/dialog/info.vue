<!--  -->
<template>
  <el-dialog title="新增" :visible.sync="flag_self" @close="close" width="580px">
    <el-form :model="form" ref="addInfoForm">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.name" placeholder="用户名" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="form.name" placeholder="请输入标题" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" :label-width="formLabelWidth">
        <el-input v-model="form.content" placeholder="请输入内容" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="地区" :label-width="formLabelWidth">
        <CityPicker
          :cityPickLevel="['province','city','area','street']"
          :cityPickData.sync="data.cityPickData"
        />
        {{data.cityPickData}}
      </el-form-item>

      <el-form-item label="是否启用" :label-width="formLabelWidth">
        <el-input v-model="form.content" placeholder="请输入内容" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="角色" :label-width="formLabelWidth">
        <el-input v-model="form.content" placeholder="请输入内容" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="flag_self = false">取消</el-button>
      <el-button type="danger" :loading="subloading" >确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import CityPicker from "@c/citypicker/index.vue";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "infoDialog",
  components: { CityPicker },
  props: {
    flag: {
      type: Boolean,
      default: false
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
        btnPrem: []
      },
      form: {
        username: "",
        truename: "",
        password: "",
        phone: "",
        status: "1",
        role: [],
        btnPrem: []
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