<?php
// Permitir solicitudes desde React (puerto 5173)
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Si es una solicitud de verificación (preflight), termina aquí
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Conexión a la base de datos
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

// Recibir datos del frontend
$data = json_decode(file_get_contents("php://input"), true);
$username = $data["username"] ?? "";
$email = $data["email"] ?? "";
$password = $data["password"] ?? "";

if (strlen($username) < 5 || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 6) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Datos inválidos",
        "debug" => [
            "username" => $username,
            "email" => $email,
            "passwordLength" => strlen($password)
        ]
    ]);
    exit;
}


// Verificar si ya existe el correo
$checkEmail = $conn->prepare("SELECT id_usuario FROM usuarios WHERE email = ?");
$checkEmail->bind_param("s", $email);
$checkEmail->execute();
$checkEmail->store_result();

if ($checkEmail->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "El correo ya está registrado"]);
    exit;
}

// Encriptar la contraseña
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Insertar nuevo usuario
$stmt = $conn->prepare("INSERT INTO usuarios (nombre, email, contraseña) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $email, $hashedPassword);

if ($stmt->execute()) {
    $userId = $stmt->insert_id;

    $result = $conn->query("SELECT id_curso FROM cursos");
while ($row = $result->fetch_assoc()) {
    $courseId = $row['id_curso'];
    $insertCurso = $conn->prepare("INSERT INTO progreso_usuarios (id_usuario, id_curso, progreso) VALUES (?, ?, 'Por Comenzar')");
    $insertCurso->bind_param("ii", $userId, $courseId);
    $insertCurso->execute();
}

echo json_encode([
    "success" => true,
    "message" => "Registro exitoso",
    "userId" => $userId // <-- agrega esto
]);
} else {
    echo json_encode(["success" => false, "message" => "Error al registrar usuario: " . $stmt->error]);
}


$conn->close();
?>
