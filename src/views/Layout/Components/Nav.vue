<!--  -->
<template>
  <div class="navIndex">
    <h1 class="logo">
      <img src="../../../assets/logo.png" alt />
    </h1>
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      background-color="transparent "
      text-color="#fff"
      active-text-color="#fff"
      :collapse="isCollapse"
      router
    >
      <template v-for="(item,index) in routers">
        <el-submenu :key="index" v-if="!item.hidden" :index="item.path">
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
            <span>{{item.meta.name}}</span>
          </template>

           <template  v-for="(subItem,index) in item.children">

          <el-menu-item
            v-if="!subItem.hidden"
            :key="index"
            :index="subItem.path"
          >{{subItem.meta.name}}</el-menu-item>

           </template>

        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: "navIndex",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      routers: this.$router.options.routes,
     
    };
  },
  //监听属性 类似于data概念
  computed: {
    defaultActive() {
      const route = this.$route;
      const { path } = route;
      // console.log(path);
      return path;
    },
    isCollapse(){
      return this.$store.state.login.isCollapse
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleOpen() {},
    handleClose() {}
  }
  //生命周期 - 创建完成（可以访问当前this实例）
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
@import "../../../styles/config.scss";
.navIndex {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: $navMenu;
  background-color: #344a5f;
  @include webkit(transition, all 0.3s ease 0s);
  svg {
    font-size: 20px;
    margin-right: 10px;
  }
  .logo {
    text-align: center;
    img {
      margin: 28px auto 25px;
      width: 92px;
      @include webkit(transition, all 0.3s ease 0s);
    }
  }
}
.open {
  .navIndex{
    width: $navMenu;
  }
}
.close {
  .navIndex {
    width: $navMenuMin;
    .logo img {
      width: 60%;
    }
  }
}
</style>