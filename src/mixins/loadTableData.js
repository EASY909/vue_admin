import { loadTable } from "@/api/user";
const loadTableData = {
    data() {
        return {

        }
    },
    created() {

    },
    mounted() {
        this.tableLoadData();
    },
    methods: {
        tableLoadData() {

            let requestData = {
                url: this.data.requestData.url,
                method: this.data.requestData.method,
                data: this.data.requestData.data
            };
         
            loadTable(requestData).then(res => {
                let tdata = res.data.data;
                console.log(tdata);
                this.data.tableData = tdata.data;
                this.total = tdata.total;
               
            }).catch(error => {
                console.log(error);
            })

        },

    }
}

export default loadTableData