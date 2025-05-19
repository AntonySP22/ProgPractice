<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$host = "localhost";
$user = "root";
$pass = "";
$db = "progpractice_db";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Error de conexión"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$idDesafio = $data["id_desafio"] ?? null;

if (!$idDesafio) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "ID de desafío no proporcionado"]);
    exit;
}

$stmt = $conn->prepare("SELECT tipo_respuesta, contenido, pista FROM respuestas_correctas WHERE id_desafio = ?");
$stmt->bind_param("i", $idDesafio);
$stmt->execute();
$result = $stmt->get_result();

$respuestas = [];
while ($row = $result->fetch_assoc()) {
    $contenido = $row['tipo_respuesta'] === 'drag_drop' ? json_decode($row['contenido'], true) : $row['contenido'];
    
    $respuestas[] = [
        "tipo" => $row['tipo_respuesta'],
        "contenido" => $contenido,
        "pista" => $row['pista']
    ];
}

echo json_encode([
    "success" => true,
    "respuestas" => $respuestas
]);

$conn->close();
?>
