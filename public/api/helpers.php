<?php
require_once __DIR__ . "/config.php";

function json_response($data, $status = 200)
{
    http_response_code($status);
    header("Content-Type: application/json; charset=UTF-8");
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function base64url_encode($value)
{
    return rtrim(strtr(base64_encode($value), "+/", "-_"), "=");
}

function base64url_decode($value)
{
    return base64_decode(strtr($value, "-_", "+/"));
}

function create_admin_token($usuario)
{
    $payload = [
        "u" => $usuario,
        "exp" => time() + (60 * 60 * 10),
    ];

    $body = base64url_encode(json_encode($payload));
    $signature = hash_hmac("sha256", $body, ADMIN_TOKEN_SECRET);

    return $body . "." . $signature;
}

function verify_admin_token($token)
{
    if (!$token || strpos($token, ".") === false) {
        return false;
    }

    [$body, $signature] = explode(".", $token, 2);
    $expected = hash_hmac("sha256", $body, ADMIN_TOKEN_SECRET);

    if (!hash_equals($expected, $signature)) {
        return false;
    }

    $payload = json_decode(base64url_decode($body), true);

    return is_array($payload)
        && ($payload["u"] ?? "") === ADMIN_USER
        && ($payload["exp"] ?? 0) > time();
}

function require_admin()
{
    $header = $_SERVER["HTTP_AUTHORIZATION"] ?? "";

    if (!$header && function_exists("apache_request_headers")) {
        $headers = apache_request_headers();
        $header = $headers["Authorization"] ?? $headers["authorization"] ?? "";
    }

    $token = $_POST["token"] ?? preg_replace("/^Bearer\s+/i", "", $header);

    if (!verify_admin_token($token)) {
        json_response(["ok" => false, "error" => "No autorizado"], 401);
    }
}

function app_base_path()
{
    $script = str_replace("\\", "/", $_SERVER["SCRIPT_NAME"] ?? "");
    $base = rtrim(dirname(dirname($script)), "/");

    return $base === "" ? "" : $base;
}

function public_url($path)
{
    if (!$path) {
        return "";
    }

    if (preg_match("#^https?://#i", $path)) {
        return $path;
    }

    return app_base_path() . "/" . ltrim($path, "/");
}

function normalize_product($producto)
{
    $producto["imagen"] = public_url($producto["imagen"] ?? "");
    return $producto;
}

function safe_filename($name)
{
    $name = preg_replace("/[^a-zA-Z0-9._-]/", "-", $name);
    return trim($name, "-") ?: "producto";
}
