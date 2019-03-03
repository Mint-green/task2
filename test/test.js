//test
// var i
// var num = 6;
// var boxid = [];
function PrefixZero(num) {
    return (Array(3).join(0) + num).slice(-3);
}
for (i = 0; i < 6; i++) {
    boxid = document.getElementsByClassName('test')[i].id;
    console.log(boxid);
    idnum = boxid.substring(5, 6);
    // console.log(idnum);
    idnum = PrefixZero(idnum);
    // idnum=Array(3).join(0) + idnum.slice(-3);
    console.log(idnum);
    // another=idnum.replace(/\b(0+)/gi,"");
    another = idnum.replace(/0+/g, "");
    console.log(another);
}


//加载回复（假装他是有效的
for (i = 0; i < 6; i++) {
    msgid1 = document.getElementsByClassName('msg')[i].id;
    console.log(msgid1);
    msgid2 = msgid1[i].substring(11, 14);

    var req = new XMLHttpRequest();
    req.open('POST', 'php/reply.php', true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send('id' = msgid2);
    req.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200) {
                var result = JSON.parse(req.responseText);
                for (var k in result) {
                    //得到被回复者和回复者的名字
                    // var req1 = new XMLHttpRequest();
                    // req1.open('POST', 'php/reply.php', true);
                    // req1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    // req1.send('id1=' + result[k].host + '&id2=' + result[k].guest);
                    // req1.onreadystatechange = function () {
                    //     if (request.readyState == 4) {
                    //         if (request.status == 200) {
                    //             var result1 = JSON.parse(req1.responseText);
                    hostname = result[k].hostname;
                    guestname = result[k].guestname;

                    //形成reply的id
                    // idnum = PrefixZero(msgid2) + PrefixZero(hostname) + PrefixZero(guest) + result[k].id;
                    // 插入回复
                    document.getElementById(msgid1).innerHTML +=
                        '<hr>' + '<div id="reply' + result[k].id + '" class="reply-msg">' + '<div class="namebox"' +
                        '<label class="usernamebox">' +
                        '<label id="guestname' + result[k].id + '">' + guestname + '</label>' + '@' +
                        '<label id="hostname' + result[k].id + '">' + hostname + '</label>' + '</label>' + ':' + '</div>' +
                        '<div class="replymsg">' + result[k].msg + '</div>' +
                        '<p class="msgtime">' + result[k].date + '</p>' +
                        '<button id="replyagain' + result[k].id + '" onclick="replyagainfunction()" class="button">回复</button>' +
                        // '<button id="changereply' + result[k].id + '" onclick="changerelpyfunction()" class="button">更改</button>' +
                        '<button id="deletereply' + result[k].id + '" onclick="deletereplyfunction()" class="button">删除</button>' +
                        '</div>';

                }

            }
        }
    }
}

/* <button id="reply" onclick="replyfunction()" class="button">回复</button> */

//回复
function replyfunction() {

    var getid1 = event.target.id
    var getid = getid1.substring(5, 9);
    var getid2 = 'content-box' + getid;
    var getid3 = 'content-username' + getid;
    var contentusername = document.getElementById(getid3).innerText;
    // alert(contentusername);
    //验证
    var request = new XMLHttpRequest();
    request.open('POST', 'php/vertify.php', true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200) {
                var result = JSON.parse(request.responseText);
                if (result.errcode === 0) {
                    document.getElementById(getid2).innerHTML +=
                        '<div id="textbox"' + getid + '><textarea id="text' + getid + '" class="inputtextbox" rows="10" col="200"></textarea>' +
                        '<div class="confirmbutton"><button id="confirmreply' + getid + '" onclick="confirmreply()">回复</button>' +
                        '</div></div>';
                    // alert(getid1);
                    document.getElementById(getid1).disabled = true;

                } else {
                    alert('请先登录再进行回复');
                }
            }
        }
    }
}

//增加回复
function confirmreply() {
    var replyid1 = event.target.id;
    var replyid = replyid1.substring(12, 15);
    var replyid2 = 'text' + replyid;
    var replyid3 = 'content-box' + replyid;
    var replyid4 = 'content-username' + getid;
    var textcontent = document.getElementById(replyid2).value;
    // alert(textcontent);

    var req = new XMLHttpRequest();
    req.open('POST', 'php/reply.php');
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.send(data);
    var data = "gusetname=" + document.getElementById('loginuser').innerHTML + "&hostname=" + replyid4 +
        "&msg=" + textcontent + "&commentid=" + replyid;

    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            if (req.status === 200) {
                var reqresult = JSON.parse(req.responseText);
                document.getElementById(replyid3).innerHTML =
                    '<hr>' + '<div id="reply' + reqresult.id + '" class="reply-msg">' + '<div class="namebox"' +
                    '<label class="usernamebox">' +
                    '<label id="guestname' + reqresult.id + '">' + guestname + '</label>' + '@' +
                    '<label id="hostname' + reqresult.id + '">' + hostname + '</label>' + '</label>' + ':' + '</div>' +
                    '<div class="replymsg">' + reqresult.msg + '</div>' +
                    '<p class="msgtime">' + reqresult.date + '</p>' +
                    '<button id="replyagain' + reqresult.id + '" onclick="replyagainfunction()" class="button">回复</button>' +
                    // '<button id="changereply' + reqresult.id + '" onclick="changerelpyfunction()" class="button">更改</button>' +
                    '<button id="deletereply' + reqresult.id + '" onclick="deletereplyfunction()" class="button">删除</button>' +
                    '</div>';
                // window.location.reload();
            }
        }
    }
}

//删除回复
function deletereplyfunction() {
    var getid1 = event.target.id;
    var getid = getid1.substring(11, 14);
    var getid3 = "guestname" + getid;
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
                        res2.open('POST', 'php/deletereply.php')
                        res2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        var data = "id=" + getid + "&hostname=" + document.getElementById("loginuser").innerHTML;
                        res2.send(data);

                        res2.onreadystatechange = function () {
                            if (res2.readyState == 4) {
                                if (res2.status == 200) {
                                    var res2result = JSON.parse(res2.responseText);
                                    if (res2result.errcode === 0) {
                                        alert(res2result.errmsg);
                                        window.location.reload();
                                    }
                                }
                            }
                        }
                    } else {
                        alert('不可以删除别人的回复哦');
                    }
                } else {
                    alert('请先登录再删除回复');
                }
            }
        }
    }
}