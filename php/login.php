<?php
header('Content-Type: application/json');


$username=$_POST['username'];
$password=$_POST['password'];


// $con=mysqli_connect('localhost','root','','test1');
$ini= parse_ini_file("login.ini");
$con =mysqli_connect($ini["servername"],$ini["username"],$ini["password"],$ini["dbname"]);
if(!$con){
    die('连接错误'.mysqli_connect_error());
    echo '数据库连接错误';
}

mysqli_query($con,"SET NAMES utf8mb4");


// $name="SELECT username from persons where username='$username'";
// // echo $name;
// $word="SELECT password from persons where username='$username'";
// // echo $word;
// $nameresult=mysqli_query($con,$name);
// $wordresult=mysqli_query($con,$word);

$stmt1 = mysqli_prepare($con, "SELECT username FROM persons WHERE username=?");
mysqli_stmt_bind_param($stmt1, 's', $username);
mysqli_stmt_execute($stmt1);
mysqli_stmt_bind_result($stmt1, $nameresult);
mysqli_stmt_fetch($stmt1);
mysqli_stmt_close($stmt1);

$stmt2 = mysqli_prepare($con, "SELECT password FROM persons WHERE username=?");
mysqli_stmt_bind_param($stmt2, 's', $username);
mysqli_stmt_execute($stmt2);
mysqli_stmt_bind_result($stmt2, $wordresult);
mysqli_stmt_fetch($stmt2);
mysqli_stmt_close($stmt2);


// echo $wordresult;
// echo $nameresult;
// if(mysqli_num_rows($nameresult)==false  || mysqli_num_rows($wordresult)==false){
// if($nameresult==false  || $wordresult==false){
if($nameresult==false  || $wordresult!=$password){
    $result=[
        'errcode'=>5,
        'errmsg'=>'用户名不存在或密码错误',
        'data'=>'',
    ];
}
// else if(mysqli_num_rows($wordresult)==false){
//     $result=[
//         'errcode'=>6,
//         'errmsg'=>'用户名不存在或密码错误',
//         'data'=>'',
//     ];
// }
else{
    // $dat=mysqli_query($con,"select date from persons where username='$username'");
    // mysqli_query($con,"update persons set times=times+1 where username='$username'");
    // $time=mysqli_query($con,"select times from persons where username='$username'");

    $stmt3 = mysqli_prepare($con, "SELECT date FROM persons WHERE username=?");
    mysqli_stmt_bind_param($stmt3, 's', $username);
    mysqli_stmt_execute($stmt3);
    mysqli_stmt_bind_result($stmt3, $dat);
    mysqli_stmt_fetch($stmt3);
    mysqli_stmt_close($stmt3);
    // echo $dat;

    $stmt4 = mysqli_prepare($con, "UPDATE persons SET times=times+1 WHERE username=?");
    mysqli_stmt_bind_param($stmt4, 's', $username);
    mysqli_stmt_execute($stmt4);
    mysqli_stmt_close($stmt4);

    $stmt5 = mysqli_prepare($con, "SELECT times FROM persons WHERE username=?");
    mysqli_stmt_bind_param($stmt5, 's', $username);
    mysqli_stmt_execute($stmt5);
    mysqli_stmt_bind_result($stmt5, $time);
    mysqli_stmt_fetch($stmt5);
    mysqli_stmt_close($stmt5);


    // $times=mysqli_fetch_assoc($time);
    // $date=mysqli_fetch_assoc($dat);
    $result=[
        'errcode'=>0,
        'errmsg'=>'',
        'data'=>[
            "number_of_times"=>$time,
            "last_login_time"=>$dat,
        ]
    ];
    session_start();
    $_SESSION['username'] =$username;
}

// mysqli_stmt_close($stmt1);
// mysqli_stmt_close($stmt2);
/*
// 以下代码用于测试，仅作为结构和部分写法的参考
if (rand() % 3) {
    $result = [
        'errcode' => 233,
        'errmsg' => '吔屎啦你！',
        'data' => ''
    ];
} 
else {
    $result = [
        "errcode" => 0,
        "errmsg" => "",
        "data" => [
            "number_of_times" => 11,
            "last_login_time" => "2018-09-21 09:17:21"
        ]
    ];
}
*/
echo json_encode($result);
mysqli_close($con);
?>