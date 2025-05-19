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

$courses = [];
while ($row = $result->fetch_assoc()) {
    $courses[] = $row;
}

echo json_encode(["success" => true, "courses" => $courses]);

$conn->close();
?>
