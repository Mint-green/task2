
function html_encode(str) {
    var s;
    if (str.length == 0) { return "" }
    s = str.replace(/&/g, "&gt;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/\s/g, "&nbsp;");
    s = s.replace(/\'/g, "&#39;");
    s = s.replace(/\"/g, "&quot;");
    s = s.replace(/\n/g, "<br>");
    return s;
}

//检查用户是否登录
var res3 = new XMLHttpRequest();
res3.open('POST', 'php/vertify.php');
res3.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
res3.send('data');

res3.onreadystatechange = function () {
    if (res3.readyState == 4) {
        if (res3.status == 200) {
            var res3result = JSON.parse(res3.responseText);
            if (res3result.errcode === 0) {
                document.getElementById("login").innerHTML =
                    "<label id='welcome'>欢迎您，" + "<label id='loginuser'>" + res3result.errmsg + "</label>" +
                    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
                    "<button id='logout' style='border: solid 1px' onclick='logoutfunction()'>注销</button>" +
                    "</label>";
            }
        }
    }
}

//初始载入数据
var num = 6;//每页显示多少条数据，暂定设为6.
var page;//总页数
var now_page = 1;//当前页数

//定义显示数据函数
function dataDisplay(resultmsg, begin, end) {
    if (end > resultmsg.length) {
        end = resultmsg.length;
    }
    for (var k = begin; k < end; k++) {
        document.getElementById("err_box2").innerHTML +=
            '<div id="content-box' + resultmsg[k].id + '"><div class="content-box"><div class="content">' +
            '<div class="username"><label id="content-username' + resultmsg[k].id + '">' + resultmsg[k].username + '</label>' +
            ' : ' + '</div>' + html_encode(resultmsg[k].msg) +
            '</div>' + '<div class="message">' + '<p class="msgtime">' + resultmsg[k].date + '</p>' +
            '<button id="change' + resultmsg[k].id + '" onclick="changefunction()" class="button">更改</button>' +
            '<button id="delete' + resultmsg[k].id + '" onclick="deletefunction()" class="button">删除</button>' +
            '</div>' + '</div>' + '</div>';
    }
}


var request = new XMLHttpRequest();
request.open('POST', 'php/firstload.php', true);
request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

request.send();
// var resultmsg;
request.onreadystatechange = function (){
    if (this.readyState == 4) {
        if (this.status == 200) {

            resultmsg = JSON.parse(this.responseText);

            page = Math.ceil(resultmsg.length / num);/*用ceil()函数向上取整计算页数*/

            document.getElementById('totalpage').innerHTML = page;
            var index = num; /*此时index和num都为6*/
            dataDisplay(resultmsg, 0, index);/*默认第一页显示第0条到第index条数据*/
            // 赋予翻页事件
            document.getElementById('left').onclick = last;
            document.getElementById('right').onclick = next;

            function next() {
                if (now_page + 1 > page) {
                    return;
                }
                now_page++;
                document.getElementById('page').innerHTML = now_page;
                $("#err_box2").empty();/*清空上一页显示的数据*/
                dataDisplay(resultmsg, index, index = index + num);
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }

            function last() {
                if (now_page - 1 < 1) {
                    return;
                }
                now_page--;
                document.getElementById('page').innerHTML = now_page;
                $("#err_box2").empty();/*清空上一页显示的数据*/
                dataDisplay(resultmsg, index = index - 2 * num, index = index + num);
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }
            // 创建页码并对页码赋予事件
            for (var i = 1; i < page + 1; i++) {
                document.getElementById('pagenum').innerHTML += "<label class='pagenum' id='page" + i + "' >" + i + "</label>";

            }

            // document.getElementById('page1').onclick = turnpage;
            for (var x = 0; x < page; x++) {
                document.getElementsByClassName('pagenum')[x].onclick = turnpage;
            }

            function turnpage() {
                var getpage = event.target.id;
                // alert(getpage);
                var realpage = getpage.substring(4, 9);
                // alert(realpage);
                // alert(now_page);
                if (now_page == realpage) {
                    // alert('true');
                    return;
                }
                now_page = realpage;
                document.getElementById('page').innerHTML = now_page;
                document.getElementById('err_box2').innerHTML = null;
                dataDisplay(resultmsg, index = num * realpage - num, index = index + num);
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }
            
            // console.log(resultmsg);

        } else {
            alert('发生错误' + this.status + this.readyState);
        }
    }
}
//留言
function bbsfunction() {
    //验证登录状态
    var res1 = new XMLHttpRequest();
    res1.open('POST', 'php/vertify.php');
    res1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    res1.send('data');
    // alert(document.getElementById('loginuser').innerHTML);

    res1.onreadystatechange = function () {
        if (res1.readyState == 4) {
            if (res1.status == 200) {
                var res1result = JSON.parse(res1.responseText);
                if (res1result.errcode === 0) {
                    //执行插入留言
                    var res2 = new XMLHttpRequest();
                    res2.open('POST', 'php/insertmsg.php')
                    res2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    var data = "username=" + document.getElementById('loginuser').innerHTML + "&msg=" + document.getElementById("msg").value;

                    res2.send(data);

                    res2.onreadystatechange = function () {
                        if (res2.readyState == 4) {
                            if (res2.status == 200) {
                                var res2result = JSON.parse(res2.responseText);
                                // document.getElementById("err_box2").innerHTML +=
                                //     '<div id="content-box' + res2result.id + '"><div class="content-box"><div class="content">' +
                                //     '<div class="username"><label id="content-username' + res2result.id + '">' + res2result.username + '</label>' + ' : ' +
                                //     '</div>' + html_encode(res2result.msg) +
                                //     '</div>' + '<div class="message">' + '<p class="msgtime">' + res2result.date + '</p>' +
                                //     '<button id="change' + res2result.id + '" onclick="changefunction()" class="button">更改</button>' +
                                //     '<button id="delete' + res2result.id + '" onclick="deletefunction()" class="button">删除</button>' +
                                //     '</div>' + '</div>' + '</div>';
                                document.getElementById("msg").value = null;
                                window.location.reload();
                            }
                        }
                    }
                } else {
                    alert('请先登录再留言');
                }
            }
        }
    }
}

//更改留言
function changefunction() {
    
    var getid1 = event.target.id
    var getid = getid1.substring(6,10);
    var getid2 = 'content-box' + getid;
    var getid3 = 'content-username' + getid;
    var contentusername = document.getElementById(getid3).innerText;
    // alert(contentusername);

    var request = new XMLHttpRequest();
    request.open('POST', 'php/vertify.php', true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send();
    request.onreadystatechange = function(){
        if(request.readyState == 4){
            if(request.status == 200){
                var result = JSON.parse(request.responseText);
                if(result.errcode === 0){
                    if(result.errmsg === contentusername){
                        document.getElementById(getid2).innerHTML +=
                        '<div id="textbox"' + getid + '><textarea id="text' + getid + '" class="inputtextbox" rows="10" col="200"></textarea>' +
                        '<div class="confirmbutton"><button id="confirm' + getid + '" onclick="realchange()">确认更改</button>' +
                        '</div></div>';
                        alert(getid1);
                        document.getElementById(getid1).disabled=true;


                    }else{
                        alert('不能更改别人的留言哦，想要毁灭不好的东西？');
                    }
                }else{
                    alert('请先登录再更改留言');
                }
            }
        }
    }


}

function realchange(){
    var changeid1 = event.target.id;
    var changeid = changeid1.substring(7,11);
    var changeid2 = 'text' + changeid;
    var changeid3 = 'content-box' + changeid;
    var textcontent = document.getElementById(changeid2).value;
    // alert(textcontent);

    var req = new XMLHttpRequest();
    req.open('POST','php/changemsg.php');
    req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    req.send('id=' + changeid + '&msg=' + textcontent);

    req.onreadystatechange = function(){
        if(req.readyState === 4){
            if(req.status === 200){
                // var reqresult = JSON.parse(req.responseText);
                // document.getElementById(changeid3).innerHTML = 
                // '<div id="content-box' + reqresult.id + '"><div class="content-box"><div class="content">' +
                // '<div class="username"><label id="content-username' + reqresult.id + '">' + reqresult.username + '</label>' + 
                // ' : ' + '</div>' + html_encode(reqresult.msg) +
                // '</div>' + '<div class="message">' + '<p class="msgtime">' + reqresult.date + '</p>' +
                // '<button id="change' + reqresult.id + '" onclick="changefunction()" class="button">更改</button>' +
                // '<button id="delete' + reqresult.id + '" onclick="deletefunction()" class="button">删除</button>' +
                // '</div>' + '</div>' + '</div>';
                window.location.reload();
            }
        }
    }
}

// 删除留言
function deletefunction() {
    var getid1 = event.target.id;
    // alert(getid1);

    var getid = getid1.substring(6, 10);
    // alert(getid);
    // }

    // var getid = getid1.spilt('e');
    // alert(getid);
    var getid3 = "content-username" + getid;
    var contentusername = document.getElementById(getid3).innerHTML;
    // alert(contentusername);

    //验证登录状态
    var res1 = new XMLHttpRequest();
    res1.open('POST', 'php/vertify.php');
    res1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    res1.send('data');
    // alert(document.getElementById('loginuser').innerHTML);

    res1.onreadystatechange = function () {
        if (res1.readyState == 4) {
            if (res1.status == 200) {
                var res1result = JSON.parse(res1.responseText);
                // alert(res1result.errmsg);
                if (res1result.errcode === 0) {
                    if (res1result.errmsg === contentusername) {
                        //执行删除留言
                        var res2 = new XMLHttpRequest();
                        res2.open('POST', 'php/deletemsg.php')
                        res2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        var data = "id=" + getid + "&username=" + document.getElementById("loginuser").innerHTML;
                        res2.send(data);

                        res2.onreadystatechange = function () {
                            if (res2.readyState == 4) {
                                if (res2.status == 200) {
                                    var res2result = JSON.parse(res2.responseText);
                                    if(res2result.errcode===0){
                                        alert(res2result.errmsg);
                                        // var getid2 = "content-box" + getid;
                                        // alert(getid2);
                                        // document.getElementById(getid2).innerHTML = null;
                                        window.location.reload();
                                    }
                                    
                                }
                            }
                        }
                    } else {
                        alert('不可以删除别人的留言哦，莫非有什么小秘密？');
                    }
                } else {
                    alert('请先登录再删除留言');
                }
            }
        }
    }
}

//注销用户
function logoutfunction() {
    var res = new XMLHttpRequest();
    res.open("POST", "php/deletesession.php");
    res.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    res.send();

    document.getElementById('login').innerHTML = '想要留言吗，快<a href="login.html">登录</a> 吧';


}







