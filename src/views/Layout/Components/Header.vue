<!--  -->
<template>
  <div class="headerIndex">
    <div class="pull-left header-icon" @click="navCollapse">
      <svg-icon iconClass="menu" class="menu"></svg-icon>
    </div>
    <div class="pull-right">
      <div class="user-info pull-left">
        <img src="../../../assets/face.jpg" alt />
        {{username}}
      </div>
      <div class="header-icon pull-left" @click="out">
        <svg-icon iconClass="exit" class="exit"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: "headerIndex",
  //import引入的组件需要注入到对象中才能使用
  computed: {
    username(){
      return this.$store.state.login.username
    }
  },
  //监控data中的数据变化
  //方法集合
  methods: {
    navCollapse(){
      this.$store.commit('login/SET_COLLAPSE')
    },
    out(){
       this.$store.dispatch('login/out').then(res=>{
        this.$router.push({
          name:"Login"
        })
       })
    }
  },
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
@import "../../../styles/config.scss";
.headerIndex {
  position: fixed;
  top: 0;
  right: 0;
  left: $navMenu;
  height: 75px;
  background-color: #fff;
  line-height: 75px;
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.1));
  @include webkit(transition, all 0.3s ease 0s);
}

.header-icon {
  padding: 0 32px;
  svg {
    font-size: 25px;
    margin-bottom: -8px;
    cursor: pointer;
  }
}
.open {
  .headerIndex {
    left: $navMenu;
  }
}
.close {
  .headerIndex {
    left: $navMenuMin;
  }
}
.user-info {
  height: 100%;
  padding: 0 32px;
  + .header-icon {
    padding: 0 32px;
  }
  border: 1px solid #ededed;
  img {
    width: 36px;
    height: 36px;
    border-radius: 18px;
    line-height: 18px;
    vertical-align: middle;
    margin-right: 10px;
  }
}
</style>