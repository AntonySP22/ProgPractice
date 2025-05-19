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
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Error de conexión"]);
    exit;
}

$userId = $_POST["userId"] ?? null;
if (!$userId || !isset($_FILES["profileImage"])) {
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
    exit;
}

$targetDir = "uploads/";
if (!file_exists($targetDir)) {
    mkdir($targetDir, 0777, true);
}

$filename = uniqid("profile_") . "_" . basename($_FILES["profileImage"]["name"]);
$targetFile = $targetDir . $filename;

if (move_uploaded_file($_FILES["profileImage"]["tmp_name"], $targetFile)) {
    $relativePath = $targetFile;

    $stmt = $conn->prepare("UPDATE usuarios SET foto_perfil = ? WHERE id_usuario = ?");
    $stmt->bind_param("si", $relativePath, $userId);

    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "imageUrl" => $relativePath  
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "No se pudo actualizar la base de datos"]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "No se pudo subir la imagen"]);
}

$conn->close();
?>
