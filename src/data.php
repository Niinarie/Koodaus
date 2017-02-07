<?php
 	header("Access-Control-Allow-Origin: *");
	$data = array(
		array('id' => '1','first_name' => 'Cynthia'),
		array('id' => '2','first_name' => 'Keith'),
		array('id' => '3','first_name' => 'Robert'),
		array('id' => '4','first_name' => 'Theresa'),
		array('id' => '5','first_name' => 'Margaret')
	);
 
	echo json_encode($data);
?>