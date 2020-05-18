<!--  -->
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: "icon",
  props: {
    className: {
      type: String,
      default: ""
    },
    iconClass: {
      type: String,
      default: ""
    }
  },
  //监听属性 类似于data概念
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      if (this.className) {
        return `svg-icon ${this.className}`;
      } else {
        return `svg-icon`;
      }
    }
  }
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.svg-icon {
  width: 1em;
  height: 1em;
  font-size: 20px;
  fill: currentColor;
  color: #fff;
  margin-right: 10px;
}
</style>