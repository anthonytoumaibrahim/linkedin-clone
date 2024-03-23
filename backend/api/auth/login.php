<?php
require_once("../../config.php");

$data = jsonPost();

$email = $data['email'] ?? "";
$password = $data['password'] ?? "";

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  exit(response(false, "Please enter a valid email address."));
}
if (strlen($password) < 8) {
  exit(response(false, "Please enter a valid password."));
}

// Check if user exists
$check_query = $mysqli->prepare("SELECT id, email, password FROM users WHERE email=?");
$check_query->bind_param("s", $email);
$check_query->execute();
$check_query->store_result();
$num = $check_query->num_rows();

if ($num === 0) {
  exit(response(false, "This account doesn't exist."));
}

$check_query->bind_result($id, $email, $hashed_password);
$check_query->fetch();

if (!password_verify($password, $hashed_password)) {
  exit(response(false, "Invalid credentials."));
}

echo response(true, "You have successfully logged in.", [
  'id' => $id
]);
