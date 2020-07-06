
let pagination = {
    data() {
        return {
            currentPage: 1,
            pageSize: 5,
            total: 0,
            pageSizes: [5, 10, 15, 20]
        }
    },
    created() {

    },
    mounted() {

    },
    methods: {
        handleSizeChange(val) {
     
            this.data.requestData.data.pageSize=val,
            this.tableLoadData()
        },
        handleCurrentChange(val) {

            this.data.requestData.data.pageNumber=val,
            this.tableLoadData()
        }


    }
}
export default pagination;