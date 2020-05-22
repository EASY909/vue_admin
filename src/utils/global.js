import { GetCategory } from "@/api/news.js";
export default {
    install(Vue, options) {
        Vue.prototype.confirm = function (params) {

            this.$confirm(params.content, {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                center: true
            })
                .then(() => {
                    params.fn && params.fn()
                    // this.$message({
                    //     type: "success",
                    //     message: "删除成功!"
                    // });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        }

        Vue.prototype.getCategory = function () {
            ;
            return new Promise((resolve, reject) => {
                GetCategory().then(res => {
                    let data = res.data.data.data;
                   
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            })



        }

    }
}