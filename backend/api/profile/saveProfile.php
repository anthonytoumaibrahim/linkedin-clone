<?php
require_once("../../config.php");

$id = $_POST['id'] ?? 0;
$name = $_POST['name'] ?? "";
$bio = $_POST['bio'] ?? "";
$education = json_encode($_POST['education'] ?? []);
$skills = json_encode($_POST['skills'] ?? []);

$query = $mysqli->prepare("UPDATE users SET name = ?, biography = ?, education = ?, skills = ? WHERE id = ?");
$query->bind_param("ssssi", $name, $bio, $education, $skills, $id);
$query->execute();
$query->store_result();

$num = $query->affected_rows;
if ($num === -1) {
  exit(response(false, "Sorry, something went wrong."));
}

echo response(true, "Profile saved.");
