import axios from "axios";

//查询所有档案类型
export function queryArchivesAllType() {
    return axios({
        url: 'type/queryArchivesAllType',
        method: 'get',
    })
}

//档案类型下的表
export function archivesTableList(param) {
    return axios({
        url: 'query/archivesTableList',
        method: 'get',
        params: param
    })
}

//档案类型下的表
export function archivesList(param) {
    return axios({
        url: 'query/archivesList',
        method: 'get',
        params: param
    })
}



