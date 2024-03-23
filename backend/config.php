<?php
// Fix CORS error
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$db_host = "localhost";
$db_user = "root";
$db_pass = "root";
$db_database = "linkedin_db";

$mysqli = mysqli_connect($db_host, $db_user, $db_pass, $db_database, 3306);

if ($mysqli->connect_error) {
  exit("Failed to connect to MySQL database. Error: " . $mysqli->connect_error);
}

function jsonPost()
{
  return json_decode(file_get_contents('php://input'), true);
}

function response($success = false, $message = "", $data = [], $http_status = 200)
{
  header("Content-Type: application/json");
  http_response_code($http_status);
  return json_encode([
    'success' => $success,
    'message' => $message,
    'data' => $data
  ]);
}
