<?php
require_once("../../config.php");

$name = $_POST['name'] ?? null;
$email = $_POST['email'] ?? "";
$password = $_POST['password'] ?? "";
$isCompany = $_POST['is_company'] ?? false;

if ($isCompany && trim($name) === "") {
  exit(response(false, "Please enter a company name."));
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  exit(response(false, "Please enter a valid email address."));
}
if (strlen($password) < 8) {
  exit(response(false, "Please enter a valid password."));
}

// Take name from email
if (!$isCompany) {
  $name = "";
  $extract_name = explode("@", $email);
  $name = $extract_name[0] ?? "Anonymous";
  // Replace dots or dashes
  $name = str_replace([".", "_"], " ", $name);
  // Remove numbers
  $name = preg_replace('/\d/', '', $name);
  // Capitalize
  $name = ucwords($name);
}

// Check if email is taken
$check_query = $mysqli->prepare("SELECT email FROM users WHERE email=?");
$check_query->bind_param("s", $email);
$check_query->execute();
$check_query->store_result();
$num = $check_query->num_rows();

if ($num > 0) {
  exit(response(false, "This email address is already taken. Try logging in."));
}

$password = password_hash($password, PASSWORD_BCRYPT);

$create_query = $mysqli->prepare("INSERT INTO users (name, email, is_company, password) VALUES (?, ?, ?, ?)");
$create_query->bind_param("ssis", $name, $email, $isCompany, $password);
$create_query->store_result();
$create_query->execute();
$row = $create_query->affected_rows;

if ($row === -1) {
  exit(response(false, "Sorry, something went wrong. Please try again later."));
}

$id = $create_query->insert_id;

echo response(true, "Your account has been successfully created!", [
  'id' => $id,
  'name' => $name,
  'email' => $email,
  'is_company' => $isCompany
]);
