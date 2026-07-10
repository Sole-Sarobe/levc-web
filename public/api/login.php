<?php
require_once __DIR__ . "/helpers.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    json_response(["ok" => false, "error" => "Metodo no permitido"], 405);
}

$raw = file_get_contents("php://input");
$input = json_decode($raw, true);

if (!is_array($input)) {
    $input = $_POST;
}

$usuario = trim($input["usuario"] ?? "");
$password = trim($input["password"] ?? "");

if ($usuario !== ADMIN_USER || $password !== ADMIN_PASS) {
    json_response(["ok" => false, "error" => "Usuario o contraseña incorrectos"], 401);
}

json_response([
    "ok" => true,
    "token" => create_admin_token($usuario),
]);
