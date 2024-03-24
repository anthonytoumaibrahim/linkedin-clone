<?php
require_once("../../config.php");

$id = $_GET['id'] ?? 0;

$query = $mysqli->query("SELECT u.id AS user_id, u.name AS user_name, u.is_company, p.id AS post_id, p.content, p.created_at FROM posts p JOIN users u ON p.user_id = u.id ORDER BY p.created_at DESC");
$posts = $query->fetch_all(MYSQLI_ASSOC);

$users_query = $mysqli->prepare("SELECT u.id, u.name, u.is_company, f.created_at as follow_date
FROM users u
left join followers f on f.follower_id = ? and f.following_id = u.id
where not u.id = ?
ORDER BY u.is_company desc
LIMIT 10");
$users_query->bind_param("ii", $id, $id);
$users_query->execute();
$res = $users_query->get_result();
$data = $res->fetch_all(MYSQLI_ASSOC);
$users = [];
foreach ($data as $row) {
  array_push($users, $row);
}

echo response(true, "", [
  'posts' => $posts,
  'users' => $users
]);
