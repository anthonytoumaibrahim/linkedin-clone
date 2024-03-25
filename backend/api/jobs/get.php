<?php
require_once("../../config.php");

$id = $_GET['id'] ?? 0;

$query = $mysqli->query("select j.*, u.name as company_name from jobs j join users u on j.company_id = u.id");
$jobs = $query->fetch_all(MYSQLI_ASSOC);

echo response(true, "", [
  'jobs' => $jobs
]);
