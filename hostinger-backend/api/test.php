<?php
require_once __DIR__ . '/config.php';
header('Content-Type: application/json');

try {
    $db = getDB();
    $result = $db->query("SHOW TABLES")->fetchAll();
    echo json_encode(['success' => true, 'tables' => array_map(fn($r) => array_values($r)[0], $result)]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
