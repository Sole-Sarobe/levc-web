<?php
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    header("Content-Type: text/plain; charset=UTF-8");
    echo "OK PHP LaEleVC mail endpoint";
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: /Nuevo/contacto?estado=error");
    exit;
}

if (!empty($_POST["_honey"])) {
    header("Location: /Nuevo/contacto?estado=ok");
    exit;
}

$destino = "contacto@laele.com.ar";
$nombre = trim($_POST["nombre"] ?? "");
$telefono = trim($_POST["telefono"] ?? "");
$email = trim($_POST["email"] ?? "");
$consulta = trim($_POST["consulta"] ?? "");

if ($nombre === "" || $email === "" || $consulta === "" || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header("Location: /Nuevo/contacto?estado=error");
    exit;
}

$asunto = "Nueva consulta desde la web LaEleVC";
$mensaje = "Nombre: " . $nombre . "\n";
$mensaje .= "Telefono: " . ($telefono !== "" ? $telefono : "No informado") . "\n";
$mensaje .= "Email: " . $email . "\n\n";
$mensaje .= "Consulta:\n" . $consulta . "\n";

$headers = [];
$headers[] = "From: LaEleVC Web <no-reply@laele.com.ar>";
$headers[] = "Reply-To: " . $nombre . " <" . $email . ">";
$headers[] = "Content-Type: text/plain; charset=UTF-8";
$headers[] = "X-Mailer: PHP/" . phpversion();

$enviado = mail($destino, $asunto, $mensaje, implode("\r\n", $headers));

header("Location: /Nuevo/contacto?estado=" . ($enviado ? "ok" : "error"));
exit;
