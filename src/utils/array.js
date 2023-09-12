// array.js
export function checkArray (key) {
    let arr = JSON.parse(localStorage.getItem("renderdata"))
    const newarr = arr.map((item) => {return item.path }).filter(i=>i && i.trim())
    // console.log(key)
    let index = newarr.indexOf(key)
    if (index > -1) {
        return true // 有权限
    } else {
        return false // 无权限
    }
}
