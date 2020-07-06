<!--  -->
<template>
  <div style="overflow:hidden">
    <el-row :gutter="10">
      <el-col :span="6" v-if="init.province">
        <el-select v-model="data.provinceValue" @change="handlerProvince">
          <el-option
            v-for="items in data.provinceData"
            :label="items.PROVINCE_NAME"
            :value="items.PROVINCE_CODE"
            :key="items.PROVINCE_CODE"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6" v-if="init.city">
        <el-select @change="handlerCity" v-model="data.cityValue">
          <el-option
            v-for="item in data.cityData"
            :label="item.CITY_NAME"
            :value="item.CITY_CODE"
            :key="item.CITY_CODE"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6" v-if="init.area">
        <el-select @change="handlerArea" v-model="data.areaValue">
          <el-option
            v-for="item in data.areaData"
            :label="item.AREA_NAME"
            :value="item.AREA_CODE"
            :key="item.AREA_CODE"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6" v-if="init.street">
        <el-select @change="handlerStreet" v-model="data.streetValue">
          <el-option
            v-for="item in data.streetData"
            :label="item.STREET_NAME"
            :value="item.STREET_CODE"
            :key="item.STREET_CODE"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getCityPicker } from "@/api/user";
import cityPicker from "@/mixins/cityPicker.js";
export default {
  name: "cityPickerIndex",
  //import引入的组件需要注入到对象中才能使用
  mixins: [cityPicker],
  props: {
    cityPickData: {
      type: Object,
      defalut: () => {}
    },
    cityPickLevel: {
      type: Array,
      defalut: () => []
    }
  },
  data() {
    //这里存放数据
    return {
      init: {
        province: false,
        city: false,
        area: false,
        street: false
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
      resultData:{
          handler(nv,ov){
              this.$emit("update:cityPickData", this.resultData);
          },
           deep:true
      }
  },
  //方法集合
  methods: {
    initCityPickLevel() {
      let initData = this.cityPickLevel;
      if (initData.length == 0) {
        for (const key in init) {
          this.init[key] = true;
        }
      } else {
        initData.forEach(item => {
          this.init[item] = true;
        });
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getProvince();
    this.initCityPickLevel();
  },
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