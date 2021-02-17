export default {
  // setCookie (c_name, c_pwd, exdays) {
  //   var exdate = new Date(); //获取时间
  //   exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
  //   //字符串拼接cookie
  //   window.document.cookie =
  //     "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
  //   window.document.cookie =
  //     "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
  // },
  // getCookie () {
  //   let userInfo = {}
  //   if (document.cookie.length > 0) {
  //     console.log(document.cookie);
  //     var arr = document.cookie.split("; ");
  //     console.log(arr);
  //     for (var i = 0; i < arr.length; i++) {
  //       var arr2 = arr[i].split("="); //再次切割
  //       //判断查找相对应的值
  //       if (arr2[0] == "userName") {
  //         userInfo.userName = arr2[1];
  //       } else if (arr2[0] == "userPwd") {
  //         userInfo.password = arr2[1];
  //       }
  //     }
  //   }
  //   return userInfo
  // },
  // clearCookie () {
  //   this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
  // }
}
