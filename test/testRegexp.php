<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- <link rel="stylesheet" type="text/css" media="screen" href="main.css" /> -->
    <!-- <script src="main.js"></script> -->
</head>
<body>
    
        <h1 id='box1'>1</h1>
        <h2 id='box2'>2</h2>
        <h3 id='box3'></h3>

    <?php
     echo "<pre>";
     print_r($_SERVER);
    ?>




</body>
<script>
var x = 'wyh2018';
var y = 'wyh2018_W';
var restrictusername = RegExp(/^[0-9a-zA-Z]{6,20}$/);
// var restrictpwd = RegExp(/^(?![^a-z]+$)(?![^A-Z]+$)(?!\D+$)[0-9a-zA-Z]{6,20}$/);
var restrictpwd = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z_]{6,20}$/);
document.getElementById('box1').innerHTML = restrictusername.test(x);
document.getElementById('box2').innerHTML = restrictpwd.test(y);
if (restrictusername.test(x) && restrictpwd.test(y)) 
{document.getElementById('box3').innerHTML='true'}
else{document.getElementById('box3').innerHTML='false'} ;
</script>

</html>