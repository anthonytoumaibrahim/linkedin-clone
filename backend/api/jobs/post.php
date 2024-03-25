<?php
require_once("../../config.php");

$company_id = $_POST['company_id'] ?? 0;
$title = $_POST['title'] ?? "";
$desc = $_POST['description'] ?? "";

// Validation
if ($company_id === 0) {
  exit(response(false, "Invalid company ID."));
}
if (strlen($title) < 12) {
  exit(response(false, "Title is too short."));
}
if (strlen($desc) < 64) {
  exit(response(false, "Description is too short."));
}

$query = $mysqli->prepare("INSERT INTO jobs (title, description, company_id) VALUES (?, ?, ?)");
$query->bind_param("ssi", $title, $desc, $company_id);
$query->execute();
$query->store_result();
$num = $query->affected_rows;

if ($num === -1) {
  exit(response(false, "Sorry, something went wrong."));
}

echo response(true, "Job posted successfully.");
