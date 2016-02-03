<?php
   if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty($_POST["haku"])) {
        $hakuErr = "Määrittele hakusanat.";
    }elseif (!preg_match("/^[a-zA-Z ]*$/",$haku)) {
        $hakuErr = "Erikoismerkit ei toimi."; 
    }else {
        $haku = test_input($_POST["haku"]);
    }
}
function test_input($data) {
      $data = trim($data);
      $data = stripslashes($data);
      $data = htmlspecialchars($data);
      return $data;
  
}
?>