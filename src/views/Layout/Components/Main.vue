<!--  -->
<template>
  <div class="mainIndex">
    <div class="main-content">
      <div class="content">
        <keep-alive>
          <router-view v-if="this.$route.meta.keepAlive" />
        </keep-alive>
        <router-view v-if="!this.$route.meta.keepAlive" />
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
export default {
  name: "mainIndex",
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
@import "../../../styles/config.scss";

.mainIndex {
  height: 100vh;
  background-color: #f5f5f5;
}
.main-content {
  width: 100%;
  height: 100%;
  padding-top: $layoutHeader + 30;
  padding-right: 30px;
  @include webkit(box-sizing, border-box);
  @include webkit(transition, all 0.3s ease 0s);
}
.open {
  .main-content {
    padding-left: $navMenu + 30;
  }
}
.close {
  .main-content {
    padding-left: $navMenuMin + 30;
  }
}
.content {
  width: 100%;
  height: 100%;
  padding: 30px 30px 0px;
  @include webkit(box-sizing, border-box);
  background-color: #fff;
}
</style>