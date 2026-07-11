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
$force = ($_GET["force"] ?? "") === "1";
$countBefore = (int) $pdo->query("SELECT COUNT(*) FROM productos")->fetchColumn();
$seedExists = is_file($seedPath);
$seedItems = 0;
$seedError = "";

if (($countBefore === 0 || $force) && $seedExists) {
    $seedContent = file_get_contents($seedPath);
    $seedContent = preg_replace('/^\xEF\xBB\xBF/', '', $seedContent);
    $productos = json_decode($seedContent, true);
    $seedError = json_last_error_msg();

    if (is_array($productos)) {
        $seedItems = count($productos);

        if ($force) {
            $pdo->exec("TRUNCATE TABLE productos");
        }

        $stmt = $pdo->prepare("
            INSERT INTO productos (id, nombre, categoria, descripcion, imagen)
            VALUES (:id, :nombre, :categoria, :descripcion, :imagen)
            ON DUPLICATE KEY UPDATE
                nombre = VALUES(nombre),
                categoria = VALUES(categoria),
                descripcion = VALUES(descripcion),
                imagen = VALUES(imagen)
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

$countAfter = (int) $pdo->query("SELECT COUNT(*) FROM productos")->fetchColumn();

json_response([
    "ok" => true,
    "message" => "Base preparada",
    "importados" => $importados,
    "productos_antes" => $countBefore,
    "productos_despues" => $countAfter,
    "seed_encontrado" => $seedExists,
    "seed_items" => $seedItems,
    "seed_error" => $seedError,
    "force" => $force,
]);
