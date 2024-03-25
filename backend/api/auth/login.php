<?php
require_once("../../config.php");

$email = $_POST['email'] ?? "";
$password = $_POST['password'] ?? "";

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  exit(response(false, "Please enter a valid email address."));
}
if (strlen($password) < 8) {
  exit(response(false, "Please enter a valid password."));
}

// Check if user exists
$check_query = $mysqli->prepare("SELECT id, name, email, password, is_company FROM users WHERE email=?");
$check_query->bind_param("s", $email);
$check_query->execute();
$check_query->store_result();
$num = $check_query->num_rows();

if ($num === 0) {
  exit(response(false, "This account doesn't exist."));
}

$check_query->bind_result($id, $name, $email, $hashed_password, $is_company);
$check_query->fetch();

if (!password_verify($password, $hashed_password)) {
  exit(response(false, "Invalid credentials."));
}

echo response(true, "You have successfully logged in.", [
  'id' => $id,
  'name' => $name,
  'email' => $email,
  'is_company' => $is_company
]);
