<!DOCTYPE html>

<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale:1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="laulustyle.css">
<title>Laulumatti</title>

</head>
<body>
<?php  
require_once('mysql.php'); 
include('search_php.php');
$Id = htmlspecialchars($_GET["Id"]);
?>


<div class="content">
<div class="logo">
<P>Moi</p>
</div>
<div class ="header">
<form method="post" action="search.php"> 
<p>Haku: <input type="text" name="haku" value="<?php echo $haku;?>"><input type="submit" value="Submit"><span class="error"><?php echo $hakuErr;?></span></p>
</form>
</div>

<div class="menu">
<p>Link</p>
</div>

<div class="songbox">
<div class="songname">
<?php
$sql = "SELECT Id,Nimi FROM Laulu where Id=$Id";
$Nimi_result = $mysqli->query($sql);
if ($Nimi_result->num_rows > 0) {
   while($row = $Nimi_result->fetch_assoc()) {
        echo "Nro: " . $row["Id"]. " - " . $row["Nimi"];
    }
}
?>
</div>
<div class="songtext">
<?php
$sql = "select Sanat from Sanat,Laulu where Laulu.Id=Sanat.S_Id and Laulu.Id=$Id";
$Sanat_result = $mysqli->query($sql);

if ($Sanat_result->num_rows > 0) {
   while($row = $Sanat_result->fetch_assoc()) {
        echo nl2br($row["Sanat"]);
    }
}
?>
</div>
</div>

<div class="some">
<p>Happy joy joy share</p>

</div>

<footer>
Stuff
</footer>

</div>
</body>
</html>