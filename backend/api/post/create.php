<?php
require_once("../../config.php");

$id = $_POST['id'] ?? 0;
$content = $_POST['content'] ?? "";

if ($id === 0) {
  exit(response(false, "Invalid user ID."));
}
if (strlen($content) < 64) {
  exit(response(false, "Post content too short."));
}

$create_query = $mysqli->prepare("INSERT INTO posts (content, user_id) VALUES (?, ?)");
$create_query->bind_param("si", $content, $id);
$create_query->store_result();
$create_query->execute();
$row = $create_query->affected_rows;

if ($row === -1) {
  exit(response(false, "Sorry, something went wrong. Please try again later."));
}

$id = $create_query->insert_id;

echo response(true, "Post created.", [
  'id' => $id
]);
