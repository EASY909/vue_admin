import service from "@/utils/request";
export function loadTable(params){
    return service.request({
        method: params.method || "post",
        url:params.url,
        data:params.data || {}
    })
}