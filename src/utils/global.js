
export default {
    install(Vue, options) {
        Vue.prototype.confirm = function (params) {
            console.log(params);
            this.$confirm(params.content, {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                center: true
            })
                .then(() => {
                    params.fn&&params.fn(11111111)
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
    }
}