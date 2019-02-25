<?php
$id=$_POST['id'];
$username=$_POST['username'];

$con=mysqli_connect('localhost','root','','test1');
if(!$con){
    die('连接错误'.mysqli_connect_error());
    echo '数据库连接错误';
}
$sql="DELETE FROM messages WHERE id = '$id' and username='$username' ";
$delete=mysqli_query($con,$sql);

$stmt1 = mysqli_prepare($con, "DELETE FROM messages WHERE id = '$id' and username=?");
mysqli_stmt_bind_param($stmt1, 's', $username);
mysqli_stmt_execute($stmt1);
mysqli_stmt_close($stmt1);


$result=[
    'errcode' => 0,
    'errmsg' => '删除成功'
];
echo json_encode($result);
mysqli_close($con);



?>