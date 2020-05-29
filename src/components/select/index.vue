<!--  -->
<template>
  <el-select v-model="data.search_key" style="width:100%">
    <el-option
      v-for="item in data.initOption"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: "selectIndex",
  //import引入的组件需要注入到对象中才能使用
  props: {
    config: {
      type: Array,
      default: []
    }
  },
  data() {
    //这里存放数据
    return {
      data: {
        search_key: "",
        search_keyWork: "",
        initOption: [],
        options: [
          {
            value: "name",
            label: "姓名"
          },
          {
            value: "phone",
            label: "手机号"
          },
          {
            value: "email",
            label: "邮箱"
          },
          {
            value: "id",
            label: "ID"
          },
          {
            value: "title",
            label: "标题"
          }
        ]
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
  
  },
  //方法集合
  methods: {
    initConfig() {
      let optionArray = [];
      this.config.forEach(items => {
        let arr = this.data.options.filter(item => item.value == items);
        if (arr.length !== 0) optionArray.push(arr[0]);
      });
      this.data.initOption = optionArray;
      this.data.search_key = optionArray[0];
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.initConfig();
  },
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>