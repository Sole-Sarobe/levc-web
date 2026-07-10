<?php
require_once __DIR__ . "/db.php";
require_once __DIR__ . "/helpers.php";

$key = $_GET["key"] ?? "";

if (!hash_equals(INSTALL_KEY, $key)) {
    json_response(["ok" => false, "error" => "Clave invalida"], 401);
}

$pdo = db();

$pdo->exec("
    CREATE TABLE IF NOT EXISTS productos (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        nombre VARCHAR(255) NOT NULL,
        categoria VARCHAR(120) NOT NULL,
        descripcion TEXT NULL,
        imagen VARCHAR(500) NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
");

$importados = 0;
$seedPath = __DIR__ . "/seed-productos.json";
$count = (int) $pdo->query("SELECT COUNT(*) FROM productos")->fetchColumn();

if ($count === 0 && is_file($seedPath)) {
    $productos = json_decode(file_get_contents($seedPath), true);

    if (is_array($productos)) {
        $stmt = $pdo->prepare("
            INSERT INTO productos (id, nombre, categoria, descripcion, imagen)
            VALUES (:id, :nombre, :categoria, :descripcion, :imagen)
        ");

        foreach ($productos as $producto) {
            $stmt->execute([
                ":id" => $producto["id"] ?? null,
                ":nombre" => $producto["nombre"] ?? "",
                ":categoria" => $producto["categoria"] ?? "",
                ":descripcion" => $producto["descripcion"] ?? "",
                ":imagen" => $producto["imagen"] ?? "",
            ]);
            $importados++;
        }

        $pdo->exec("ALTER TABLE productos AUTO_INCREMENT = 100");
    }
}

json_response([
    "ok" => true,
    "message" => "Base preparada",
    "importados" => $importados,
]);
