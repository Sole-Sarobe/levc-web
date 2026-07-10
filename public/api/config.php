<?php
if (basename(__FILE__) === basename($_SERVER["SCRIPT_FILENAME"] ?? "")) {
    http_response_code(403);
    exit;
}

define("DB_HOST", "localhost");
define("DB_NAME", "c0430390_laeledb");
define("DB_USER", "c0430390_laeledb");
define("DB_PASS", "kePOle68nu");

define("ADMIN_USER", "laelevc");
define("ADMIN_PASS", "lalo2828");
define("ADMIN_TOKEN_SECRET", "laelevc-admin-token-2026-cambiar-despues");
define("INSTALL_KEY", "lalo2828");
