// 生成随机字符串

const randomString = function (len, charSet) {
  charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var randomString = '';
  for (var i = 0; i < len; i++) {
    var randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
}
//获取表头
const getTableHeader = function (headerObj) {
  let obj = {};
  for (let key in headerObj) {
    if (headerObj.hasOwnProperty(key)) {
      let element = headerObj[key];
      obj[element] = key;

    }
  }

  return obj;
}


//获取想要的菜单
const FilterData = function (arr1, arr2) { //循环判断数组a里的元素在b里面有没有，有的话就放入新建立的数组中
  //arr2当前菜单权限 arr1该用户权限
  for (let item1 of arr1) {
    for (let item2 of arr2) {
      if (item1===item2) {
        console.log(item1,item2);
        
        return true;
      }
    }
  }

  return false;
}
//图片转base64
const getBase64Image=function(file) {  
               
}  


export {

  randomString,
  FilterData,
  getBase64Image

}
