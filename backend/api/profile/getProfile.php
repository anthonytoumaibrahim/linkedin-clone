<?php
require_once("../../config.php");

$profileId = $_GET['id'] ?? 0;

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

echo response(true, "Profile found", [
  "id" => $id,
  "name" => $name,
  "email" => $email,
  "is_company" => $isCompany,
  "biography" => $biography,
  "education" => $education,
  "skills" => $skills
]);
