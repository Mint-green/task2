
// function test(){
// $(document).ready(function () { })
// window.onload = function{}

//对一类元素操作的方法
// var z = document.getElementsByClassName("extra");
// var i;
// for (i = 0; i < z.length; i++) {
//     z[i].innerHTML = "red";
// }

document.getElementById("username").value = null;
document.getElementById("password").value = null;
document.getElementById("checkpwd").value = null;

document.getElementById("persuade1").style.display = "block";
document.getElementById("persuade2").style.display = "none";
document.getElementById("check").style.display = "none";
document.getElementById("checkpwd").style.display = "none";
document.getElementById("button2").style.display = "none";
document.getElementById("button1").style.display = "block";
document.getElementById("box1").style.borderBottom= 0;
//执行顺序问题
// }
// test();
// alert('jsdkjsd');
// 要看看能不能回车触发函数

//登录界面的显示
function login() {
    document.getElementById("persuade1").style.display = "block";
    document.getElementById("persuade2").style.display = "none";
    document.getElementById("check").style.display = "none";
    document.getElementById("checkpwd").style.display = "none";
    document.getElementById("button2").style.display = "none";
    document.getElementById("button1").style.display = "block";
    document.getElementById("box1").style.borderBottom= 0;
    document.getElementById("box2").style.borderBottom= 'solid 1px';
    //清除错误显示框内容
    document.getElementById("demo").innerHTML = null;
    document.getElementById("err_boxusername").innerHTML = null;
    document.getElementById("err_boxpwd").innerHTML = null;
    document.getElementById("err_boxresult").innerHTML = null;
    document.getElementById("err_boxresult1").innerHTML = null;

    document.getElementById("username").value = null;
    document.getElementById("password").value = null;
    document.getElementById("checkpwd").value = null;
}

//注册界面的显示
function signup() {
    document.getElementById("persuade1").style.display = "none";
    document.getElementById("persuade2").style.display = "block";
    document.getElementById("check").style.display = "block";
    document.getElementById("checkpwd").style.display = "block";
    document.getElementById("button2").style.display = "block";
    document.getElementById("button1").style.display = "none";
    document.getElementById("box2").style.borderBottom= 0;
    document.getElementById("box1").style.borderBottom= 'solid 1px';

    document.getElementById("demo").innerHTML = null;
    document.getElementById("err_boxusername").innerHTML = null;
    document.getElementById("err_boxpwd").innerHTML = null;
    document.getElementById("err_boxresult").innerHTML = null;
    document.getElementById("err_boxresult1").innerHTML = null;

    document.getElementById("username").value = null;
    document.getElementById("password").value = null;
    document.getElementById("checkpwd").value = null;
}

//注册的函数
function zcfunction() {
    document.getElementById("demo").innerHTML = null;
    document.getElementById("err_boxusername").innerHTML = null;
    document.getElementById("err_boxpwd").innerHTML = null;
    document.getElementById("err_boxresult").innerHTML = null;
    document.getElementById("err_boxresult1").innerHTML = null;

    var x = document.getElementById("username").value;
    var y = document.getElementById("password").value;

    // document.getElementById("demo").innerHTML = Date();
    // if (x.length < 6 || x.length > 20) {
    //     err_box.innerHTML = '请输入6到20位数字';
    //     // return;
    // }
    var restrictusername = RegExp(/^[0-9a-zA-Z_]{6,20}$/);
    var restrictpwd = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z_]{6,20}$/);
    if (restrictusername.test(x)) { }
    else { document.getElementById("err_boxusername").innerHTML = '账号需为6到20位数字或字母或下划线'; }
    if (restrictpwd.test(y)) { }
    else { document.getElementById("err_boxpwd").innerHTML = '密码需为6到20位包含数字及大小写字母的字符串'; }
    
    if (restrictusername.test(x) && restrictpwd.test(y)) {}else { return; }
    
    // else{return;}
    // return;  //如何让两个同时都可以检验且一旦有错即return呢


    var request = new XMLHttpRequest();
    request.open('POST', 'signup.php', true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    var data = "username=" + document.getElementById('username').value +
        "&password=" + document.getElementById('password').value +
        "&checkpwd=" + document.getElementById('checkpwd').value
    request.send(data);
    // request.send("username=" + "123123123" + "&password=" + "111111111" + "&checkpwd=" + "11111111");


    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                // document.getElementById("err_box").innerHTML = this.responseText;
                // alert(this.responseText);
                var resultmsg = JSON.parse(this.responseText);  // 将字符串转为数组,并打印
                document.getElementById("err_boxresult").innerHTML = resultmsg['errmsg'];
                if(resultmsg.errcode==0){
                    window.location.href='lyb/ly.html';
                }
                //     for(var k in resultmsg){
                //         document.getElementById("err_box2").innerHTML += k + " : " + resultmsg[k] + "<br/>";}
            } else {
                alert('发生错误' + this.status);
            }
        }
    }
    // encodeURIComponent()
}

//登录的函数
function dlfunction() {
    document.getElementById("demo").innerHTML = null;
    document.getElementById("err_boxusername").innerHTML = null;
    document.getElementById("err_boxpwd").innerHTML = null;
    document.getElementById("err_boxresult").innerHTML = null;
    document.getElementById("err_boxresult1").innerHTML = null;

    var x = document.getElementById("username").value;
    var y = document.getElementById("password").value;
    document.getElementById("demo").innerHTML = Date();

    var request = new XMLHttpRequest();
    request.open('POST', 'login.php', true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    var data = "username=" + document.getElementById('username').value +
        "&password=" + document.getElementById('password').value
    request.send(data);
    // request.send("username=" + "123123123" + "&password=" + "111111111" + "&checkpwd=" + "11111111");


    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                // document.getElementById("err_box").innerHTML = this.responseText;
                // alert(this.responseText);
                var resultmsg = JSON.parse(this.responseText);  // 将字符串转为数组,并打印
                document.getElementById("err_boxresult").innerHTML = resultmsg['errmsg'];
                if (resultmsg['errcode'] === 0) {
                    document.getElementById("err_boxresult1").innerHTML =
                        '<p>登录成功！ 这是你的第 ' + resultmsg.data.number_of_times + ' 次登录</p>' +
                        '<p>最近一次登录在 ' + resultmsg.data.last_login_time + '</p>'
                        if(resultmsg.errcode==0){
                            alert('登录成功！ 这是你的第 ' + resultmsg.data.number_of_times + ' 次登录 ' +
                            '\n' + '最近一次登录在 ' + resultmsg.data.last_login_time);
                            window.location.href='lyb/ly.html';
                        }
                }
                //     for(var k in resultmsg){
                //         document.getElementById("err_box2").innerHTML += k + " : " + resultmsg[k] + "<br/>";}
            } else {
                alert('发生错误' + this.status);
            }
        }
    }
}