<!--  -->
<template>
  <div class="consoleIndex">
    控制台
    <!-- {{arr}}

    <p>{{name}}</p>
    <CustomVModel v-model="name" />-->
<!-- 
    <CustomVModel>
      <template v-slot:button>
        <button>点击</button>
      </template>
      <template v-slot:myp="data">
        <p>点击</p>
        {{data}}
      </template>
    </CustomVModel> -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// import CustomVModel from "./CustomVModel";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "consoleIndex",
  provide() {
    return {
      a: "111"
    };
  },
  components: {
    // CustomVModel
  },
  data() {
    return {
      arr: ["apply", "call", "bind"],
      obj: {
        one: "1"
      },
      name: ""
    };
  },
  // watch: {
  //   arr(nv) {
  //     console.log(nv);
  //   },
  //   obj(nv) {
  //     console.log(nv);
  //   }
  // },
  // beforeCreate() {
  //   console.log("beforeCreate");
  //   console.log(this.arr);
  // },
  // created() {
  //   console.log("created");
  //   console.log(this.arr);
  // },
  // beforeMount() {
  //   console.log("beforeMount");
  //   console.log(this.arr);
  // },
  // mounted() {
  //   setTimeout(() => {
  //     this.$set(this.arr, 2, "hhh");
  //     // this.arr.splice(0,3);
  //     // this.arr.length=0
  //     // this.$set(this.obj, "two", "2");
  //   }, 2000);
  //   console.log("mounted");
  //   console.log(this.arr);
  // },
  // beforeUpdate() {
  //   console.log("beforeUpdate");
  //   console.log(this.arr);
  // },
  // updated() {
  //   console.log("updated");
  //   console.log(this.arr);
  // }
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>