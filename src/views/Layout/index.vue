<!--  -->
<template>
  <div class="layoutIndex" :class="[menuStatus?'close':'open']">
      <Header/>
      <Main/>
      <Nav/>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Header from "./Components/Header";
import Main from "./Components/Main";
import Nav from "./Components/Nav";
export default {
  name: "layoutIndex",
  //import引入的组件需要注入到对象中才能使用
  components: {Header,Main,Nav},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {
    menuStatus(){
      return this.$store.state.login.isCollapse;
    }
  }
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类

</style>