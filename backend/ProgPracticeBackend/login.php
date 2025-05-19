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
$username_or_email = $data["username"] ?? "";  // Puede ser nombre de usuario o correo
$password = $data["password"] ?? "";

if (strlen($username_or_email) < 5 || strlen($password) < 6) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Usuario o contraseña inválidos."]);
    exit;
}

// Verificar si el valor ingresado es un email
if (filter_var($username_or_email, FILTER_VALIDATE_EMAIL)) {
    // Buscar por correo electrónico
    $stmt = $conn->prepare("SELECT id_usuario, contraseña FROM usuarios WHERE email = ?");
} else {
    // Buscar por nombre de usuario
    $stmt = $conn->prepare("SELECT id_usuario, contraseña FROM usuarios WHERE nombre = ?");
}

$stmt->bind_param("s", $username_or_email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "Usuario no encontrado."]);
    exit;
}

$user = $result->fetch_assoc();

if (password_verify($password, $user['contraseña'])) {
    echo json_encode([
        "success" => true,
        "message" => "Inicio de sesión exitoso",
        "userId" => $user['id_usuario']
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Contraseña incorrecta."]);
}
$conn->close();
?>
