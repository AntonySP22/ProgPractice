<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$host = "localhost";
$user = "root";
$pass = "";
$db = "progpractice_db";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Error de conexión"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$subject = $data["subject"] ?? null;
$name = $data["name"] ?? null;
$email = $data["email"] ?? null;
$message = $data["message"] ?? null;
$userId = $data["userId"] ?? null; 

if (!$subject || !$name || !$email || !$message) {
    echo json_encode(["success" => false, "message" => "Todos los campos son requeridos."]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO mensajes_ayuda (id_usuario, subject, nombre, email, mensaje) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("issss", $userId, $subject, $name, $email, $message);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Mensaje guardado correctamente."]);
} else {
    echo json_encode(["success" => false, "message" => "Error al guardar el mensaje."]);
}

$stmt->close();
$conn->close();
?>
