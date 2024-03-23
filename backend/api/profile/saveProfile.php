<?php
require_once("../../config.php");

$data = jsonPost();

$id = $data['id'] ?? 0;
$name = $data['name'] ?? "";
$bio = $data['bio'] ?? "";
$education = json_encode($data['education'] ?? []);
$skills = json_encode($data['skills'] ?? []);

$query = $mysqli->prepare("UPDATE users SET name = ?, biography = ?, education = ?, skills = ? WHERE id = ?");
$query->bind_param("ssssi", $name, $bio, $education, $skills, $id);
$query->execute();
$query->store_result();

$num = $query->affected_rows;
if ($num === -1) {
  exit(response(false, "Sorry, something went wrong."));
}

echo response(true, "Profile saved.");
