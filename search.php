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

<?php
$haku = $_POST['haku'];
if (is_numeric($haku)) {
$sql = "SELECT S_Id,Nimi,LEFT(Sanat, 200) FROM Sanat,Laulu WHERE Id='$haku' AND S_Id=Id";
}
else {
$sql = "SELECT S_Id,Nimi,LEFT(Sanat, 200) FROM Sanat,Laulu WHERE MATCH(Sanat) AGAINST ('$haku' IN BOOLEAN MODE) OR MATCH(Nimi) AGAINST ('$haku' IN BOOLEAN MODE) AND S_Id=Id GROUP BY S_Id";
}
$Haku_result = $mysqli->query($sql);
if ($Haku_result->num_rows > 0) {?>
	<div class="searchRstAnn"><?php    echo "Hakusi $haku palautti seuraavat tulokset:<br>";?></div>
	<?php
    while($row = $Haku_result->fetch_assoc()) {?>
		
		<a href=song.php?Id=<?php echo $row["S_Id"]?>>
		<div class="searchRst">
		<div class="searchRstNr"><?php echo "#" . $row["S_Id"]." ".$row["Nimi"]?></div>
        <div class="searchRstWords"><?php echo $row["LEFT(Sanat, 200)"]?></div>
		</a>
		</div>
<?php }
}

?>

</div>
<footer>
Stuff
</footer>

</div>



</div>
</body>
</html>