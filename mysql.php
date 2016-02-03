<?php
$mysqli = new mysqli("mysql.metropolia.fi", "niinarie", "laulubase2016", "niinarie");
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
//echo $mysqli->host_info . "\n";
mysqli_set_charset($mysqli,"utf8");


//$charset = $mysqli->character_set_name();
//printf ("Current character set is %s\n", $charset);

?>
