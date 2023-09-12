import request from "@/utils/request";
//查询所有全宗
//查询库房
export function queryRoomList(query) {
    return request({
        url: '/room/queryRoomList',
        method: 'get',
        params: query
    })
}




