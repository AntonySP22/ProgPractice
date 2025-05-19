<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

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
$userId = $data["userId"] ?? null;
$username = $data["username"] ?? "";
$email = $data["email"] ?? "";
$bio = $data["bio"] ?? "";
$country = $data["country"] ?? "";

if (!$userId || !$username || !$email) {
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
    exit;
}

$sql = "UPDATE usuarios SET nombre = ?, email = ?, biografia = ? WHERE id_usuario = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssi", $username, $email, $bio, $userId);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Perfil actualizado"]);
} else {
    echo json_encode(["success" => false, "message" => "Error al actualizar"]);
}

$conn->close();
?>
