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

$data = json_decode(file_get_contents("php://input"), true);
$userId = $data["userId"] ?? null;

if (!$userId) {
    echo json_encode(["success" => false, "message" => "ID de usuario requerido"]);
    exit;
}

$stmt = $conn->prepare("SELECT nombre AS username FROM usuarios WHERE id_usuario = ?");
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();
$userRow = $result->fetch_assoc();

if (!$userRow) {
    echo json_encode(["success" => false, "message" => "Usuario no encontrado"]);
    exit;
}

$username = $userRow['username'];

$sql = "
SELECT 
    c.id_curso AS id,
    c.nombre AS title,
    c.imagen AS image,
    IFNULL(p.progreso, 'Por Comenzar') AS progress
FROM cursos c
LEFT JOIN progreso_usuarios p ON c.id_curso = p.id_curso AND p.id_usuario = ?
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

$cursos = [];
$cursosCompletados = [];
$cursosEnProgreso = [];

while ($row = $result->fetch_assoc()) {
    if ($row['progress'] === 'Completado') {
        $cursosCompletados[] = $row;
    } else {
        $cursosEnProgreso[] = $row;
    }
    $cursos[] = $row;
}

$progreso = (count($cursosCompletados) / 4) * 100; 

echo json_encode([
    "success" => true,
    "username" => $username, 
    "cursosEnProgreso" => $cursosEnProgreso,
    "cursosCompletados" => $cursosCompletados,
    "progreso" => $progreso
]);

$conn->close();
?>
