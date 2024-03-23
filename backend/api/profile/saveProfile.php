<?php
require_once("../../config.php");

$data = jsonPost();

$id = $data['id'] ?? 0;
$name = $data['name'] ?? "";
$bio = $data['bio'] ?? "";

$query = $mysqli->prepare("UPDATE users SET name = ?, biography = ? WHERE id = ?");
$query->bind_param("ssi", $name, $bio, $id);
$query->execute();
$query->store_result();

$num = $query->affected_rows;
if ($num === -1) {
  exit(response(false, "Sorry, something went wrong."));
}

echo response(true, "Profile saved.");
