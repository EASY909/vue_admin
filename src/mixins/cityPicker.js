import { getCityPicker } from "@/api/user.js";

const cityPicker = {
    data() {
        return {
            data: {
                provinceData: [],
                cityData: [],
                areaData: [],
                streetData: [],
                provinceValue: "",
                cityValue: "",
                areaValue: "",
                streetValue: ""
            },
            resultData: {
                provinceValue: "",
                cityValue: "",
                areaValue: "",
                streetValue: ""
            }
        }
    },
    methods: {
        getData(requestData) {
            getCityPicker(requestData)
                .then(res => {
                    this.data[`${requestData.type}Data`] = res.data.data.data;
                })
                .catch(error => { });
        },
        getProvince() {
            this.getData({ type: "province" })
        },
        handlerProvince(val) {
            this.resetValue({ type: "city" })

            this.getData({ type: "city", province_code: val })
        },
        handlerCity(val) {
            // data.cityValue = "";
            this.resetValue({ type: "area" })
            this.getData({ type: "area", city_code: val })
        },
        handlerArea(val) {
            this.resetValue({ type: "street" })
            this.getData({ type: "street", area_code: val })
        },
        handlerStreet(val) {
            this.resetValue({ type: "" })
        },
        resetValue(params) {
            if (params.type === "city") {
                this.data.cityValue = "";
                this.data.areaValue = "";
                this.data.streetValue = "";
            }
            if (params.type === "area") {

                this.data.areaValue = "";
                this.data.streetValue = "";
            }
            if (params.type === "street") {


                this.data.streetValue = "";
            }

            this.result()
        },
        result() {
            for (const key in this.resultData) {
                this.resultData[key] = this.data[key]
            }
        
        }
    }
}

export default cityPicker;