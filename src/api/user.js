import service from "@/utils/request";
export function loadTable(params) {
    return service.request({
        method: params.method || "post",
        url: params.url,
        data: params.data || {}
    })
}

/**
 * 
 * @param {获取省市} data 
 */
export function getCityPicker(data) {
    return service.request({
        method: "post",
        url: "/cityPicker/",
        data
    })
}
