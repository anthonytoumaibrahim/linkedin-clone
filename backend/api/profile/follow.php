<?php
require_once("../../config.php");

$id = $_POST['id'] ?? 0;
$follow_id = $_POST['follow_id'] ?? 0;

if ($id === 0 || $follow_id === 0) {
  exit(response(false, "Invalid data."));
}

// Check if user already follows
$check = $mysqli->prepare("SELECT id, follower_id, following_id FROM followers WHERE follower_id = ? AND following_id = ?");
$check->bind_param("ii", $id, $follow_id);
$check->execute();
$check->store_result();

$num = $check->num_rows();

if ($num > 0) {
  // Unfollow
  $check->bind_result($follow_id, $follower_id, $following_id);
  $check->fetch();

  $mysqli->query("DELETE FROM followers WHERE id={$follow_id}");

  exit(response(true, "Unfollowed successfully.", [
    'unfollow' => true
  ]));
}

$query = $mysqli->prepare("INSERT INTO followers (follower_id, following_id) VALUES (?, ?)");
$query->bind_param("ii", $id, $follow_id);
$query->execute();
$query->store_result();

$num = $query->affected_rows;

if ($num === -1) {
  exit(response(false, "Something went wrong; couldn't follow..."));
}

echo response(true, "Followed successfully.", [
  'unfollow' => false
]);
