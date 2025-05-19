<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
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
$userId = $data["userId"] ?? null;
$courseId = $data["courseId"] ?? null;
$estado = $data["nuevoEstado"] ?? null;

// Agrega log para verificar los datos recibidos
error_log("userId: $userId, courseId: $courseId, estado: $estado");

if (!$userId || !$courseId || !$estado) {
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
    exit;
}

// Verifica que exista el registro antes de actualizar
$verifica = $conn->prepare("SELECT progreso FROM progreso_usuarios WHERE id_usuario = ? AND id_curso = ?");
$verifica->bind_param("ii", $userId, $courseId);
$verifica->execute();
$resultado = $verifica->get_result();

if ($resultado->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "No se encontró el curso para este usuario"]);
    exit;
}

$row = $resultado->fetch_assoc();
$progresoActual = $row['progreso'];

// Si el progreso actual es "En Progreso" y el nuevo estado es "Completado", actualiza
if ($progresoActual === 'En Progreso' && $estado === 'Completado') {
    $stmt = $conn->prepare("UPDATE progreso_usuarios SET progreso = ?, ultima_actualizacion = NOW() WHERE id_usuario = ? AND id_curso = ?");
    $stmt->bind_param("sii", $estado, $userId, $courseId);
    
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Curso marcado como 'Completado'"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al actualizar el progreso"]);
    }
} 
// Si el nuevo estado es otro, solo actualiza el progreso
elseif ($estado !== 'Completado') {
    $stmt = $conn->prepare("UPDATE progreso_usuarios SET progreso = ?, ultima_actualizacion = NOW() WHERE id_usuario = ? AND id_curso = ?");
    $stmt->bind_param("sii", $estado, $userId, $courseId);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Progreso actualizado"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al actualizar"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "El curso ya está completado"]);
}

$conn->close();
?>
