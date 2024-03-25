<?php
require_once("../../config.php");

$id = $_GET['id'] ?? 0;

$query = $mysqli->prepare("SELECT u.id AS user_id, u.name AS user_name, u.is_company, p.id AS post_id, p.content, p.created_at
FROM followers f, posts p
JOIN users u ON p.user_id = u.id
where f.follower_id = ? and f.following_id = u.id
ORDER BY p.created_at DESC");
$query->bind_param("i", $id);
$query->execute();
$pres = $query->get_result();
$pdata = $pres->fetch_all(MYSQLI_ASSOC);
$posts = [];
foreach ($pdata as $row) {
  array_push($posts, $row);
}

$users_query = $mysqli->prepare("SELECT u.id, u.name, u.is_company
FROM users u
WHERE NOT u.id = ? AND u.id NOT IN (
	SELECT f.following_id
	FROM followers f
	WHERE f.follower_id = ? AND f.following_id = u.id
)
ORDER BY u.is_company DESC
LIMIT 5");
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
