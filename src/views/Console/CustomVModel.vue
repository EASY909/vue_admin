<!--  -->
<template>
  <div>
    <!-- <input type="text" :value="text" @input="$emit('change', $event.target.value)" />
    
    -->
    <slot name="button"></slot>

    <slot name="myp" :data="scope"></slot>
  </div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "",
  inject: ["a"],
  model: {
    prop: "text", // 对应 props text1
    event: "change"
  },
  props: {
    text: String,

    default() {
      return "";
    }
  },
  components: {},
  data() {
    //这里存放数据
    return {
      scope:"1235"
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate() {}, //生命周期 - 创建之前
  watch: {},
  created() {},
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    console.log(this.a);
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后 refs可以取到
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  deactivated() {}
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>