<?php
require_once __DIR__ . "/db.php";
require_once __DIR__ . "/helpers.php";

$pdo = db();

function upload_image_if_present()
{
    if (empty($_FILES["imagen"]) || ($_FILES["imagen"]["error"] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
        return null;
    }

    if ($_FILES["imagen"]["error"] !== UPLOAD_ERR_OK) {
        json_response(["ok" => false, "error" => "No se pudo subir la imagen"], 400);
    }

    $allowed = [
        "image/jpeg" => "jpg",
        "image/png" => "png",
        "image/webp" => "webp",
        "image/gif" => "gif",
    ];

    $mime = mime_content_type($_FILES["imagen"]["tmp_name"]);

    if (!isset($allowed[$mime])) {
        json_response(["ok" => false, "error" => "Formato de imagen no permitido"], 400);
    }

    $uploadDir = realpath(__DIR__ . "/..") . "/uploads/productos";

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $base = pathinfo($_FILES["imagen"]["name"], PATHINFO_FILENAME);
    $fileName = time() . "-" . safe_filename($base) . "." . $allowed[$mime];
    $dest = $uploadDir . "/" . $fileName;

    if (!move_uploaded_file($_FILES["imagen"]["tmp_name"], $dest)) {
        json_response(["ok" => false, "error" => "No se pudo guardar la imagen"], 500);
    }

    return "uploads/productos/" . $fileName;
}

function delete_local_image($path)
{
    if (!$path || preg_match("#^https?://#i", $path)) {
        return;
    }

    $file = realpath(__DIR__ . "/.." . "/" . ltrim($path, "/"));
    $uploads = realpath(__DIR__ . "/../uploads/productos");

    if ($file && $uploads && strpos($file, $uploads) === 0 && is_file($file)) {
        unlink($file);
    }
}

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $stmt = $pdo->query("
        SELECT id, nombre, categoria, descripcion, imagen, created_at, updated_at
        FROM productos
        ORDER BY id DESC
    ");

    $productos = array_map("normalize_product", $stmt->fetchAll());
    json_response(["ok" => true, "productos" => $productos]);
}

require_admin();

$action = $_POST["action"] ?? "create";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    json_response(["ok" => false, "error" => "Metodo no permitido"], 405);
}

if ($action === "delete") {
    $id = (int) ($_POST["id"] ?? 0);

    if ($id <= 0) {
        json_response(["ok" => false, "error" => "ID invalido"], 400);
    }

    $stmt = $pdo->prepare("SELECT imagen FROM productos WHERE id = ?");
    $stmt->execute([$id]);
    $producto = $stmt->fetch();

    $stmt = $pdo->prepare("DELETE FROM productos WHERE id = ?");
    $stmt->execute([$id]);

    if ($producto) {
        delete_local_image($producto["imagen"] ?? "");
    }

    json_response(["ok" => true]);
}

$nombre = trim($_POST["nombre"] ?? "");
$categoria = trim($_POST["categoria"] ?? "");
$descripcion = trim($_POST["descripcion"] ?? "");
$nuevaImagen = upload_image_if_present();

if ($nombre === "" || $categoria === "") {
    json_response(["ok" => false, "error" => "Nombre y categoria son obligatorios"], 400);
}

if ($action === "update") {
    $id = (int) ($_POST["id"] ?? 0);

    if ($id <= 0) {
        json_response(["ok" => false, "error" => "ID invalido"], 400);
    }

    $stmt = $pdo->prepare("SELECT imagen FROM productos WHERE id = ?");
    $stmt->execute([$id]);
    $actual = $stmt->fetch();

    if ($nuevaImagen) {
        $stmt = $pdo->prepare("
            UPDATE productos
            SET nombre = ?, categoria = ?, descripcion = ?, imagen = ?
            WHERE id = ?
        ");
        $stmt->execute([$nombre, $categoria, $descripcion, $nuevaImagen, $id]);

        if ($actual) {
            delete_local_image($actual["imagen"] ?? "");
        }
    } else {
        $stmt = $pdo->prepare("
            UPDATE productos
            SET nombre = ?, categoria = ?, descripcion = ?
            WHERE id = ?
        ");
        $stmt->execute([$nombre, $categoria, $descripcion, $id]);
    }

    json_response(["ok" => true]);
}

$stmt = $pdo->prepare("
    INSERT INTO productos (nombre, categoria, descripcion, imagen)
    VALUES (?, ?, ?, ?)
");
$stmt->execute([$nombre, $categoria, $descripcion, $nuevaImagen ?? ""]);

json_response([
    "ok" => true,
    "id" => (int) $pdo->lastInsertId(),
]);
