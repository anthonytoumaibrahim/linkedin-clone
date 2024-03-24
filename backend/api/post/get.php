<?php
require_once("../../config.php");

$query = $mysqli->query("SELECT u.id AS user_id, u.name AS user_name, u.is_company, p.id AS post_id, p.content, p.created_at FROM posts p JOIN users u ON p.user_id = u.id ORDER BY p.created_at DESC");
$posts = $query->fetch_all(MYSQLI_ASSOC);

echo response(true, "", [
  'posts' => $posts
]);
