<?php
require_once("../../config.php");

$profileId = $_GET['id'] ?? 0;
$viewerId = $_GET['viewerId'] ?? 0;

$query = $mysqli->prepare("SELECT id, name, email, is_company, biography, education, skills FROM users WHERE id = ?");
$query->bind_param("i", $profileId);
$query->execute();
$query->store_result();

$num = $query->num_rows();
if ($num === 0) {
  exit(response(false, "Profile not found."));
}

$query->bind_result($id, $name, $email, $isCompany, $biography, $education, $skills);
$query->fetch();

$education = json_decode($education ?? "[]", true);
$skills = json_decode($skills ?? "[]", true);

// Get posts
$query = $mysqli->query("SELECT id, content, created_at FROM posts WHERE user_id={$id}");
$posts = $query->fetch_all(MYSQLI_ASSOC);

// Check if following
$follow_query = $mysqli->prepare("SELECT * FROM followers WHERE follower_id = ? AND following_id = ?");
$follow_query->bind_param("ii", $viewerId, $id);
$follow_query->execute();
$follow_query->store_result();
$frows = $follow_query->num_rows();

$is_following = false;
if ($frows > 0) {
  $is_following = true;
}


echo response(true, "Profile found", [
  "id" => $id,
  "name" => $name,
  "email" => $email,
  "is_company" => $isCompany,
  "biography" => $biography,
  "education" => $education,
  "skills" => $skills,
  "posts" => $posts,
  "is_following" => $is_following
]);
