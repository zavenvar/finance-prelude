<?php
/**
 * Authentication API
 * Endpoints: POST /login, POST /logout, GET /verify
 */

require_once __DIR__ . '/../config.php';
setCorsHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

switch ($action) {
    case 'login':
        if ($method !== 'POST') {
            jsonResponse(['error' => 'Method not allowed'], 405);
        }
        handleLogin();
        break;
        
    case 'verify':
        if ($method !== 'GET') {
            jsonResponse(['error' => 'Method not allowed'], 405);
        }
        handleVerify();
        break;
        
    default:
        jsonResponse(['error' => 'Invalid action'], 400);
}

function handleLogin() {
    $data = getRequestBody();
    $username = trim($data['username'] ?? '');
    $password = $data['password'] ?? '';
    
    if (empty($username) || empty($password)) {
        jsonResponse(['error' => 'Username and password are required'], 400);
    }
    
    $pdo = getDBConnection();
    $stmt = $pdo->prepare('SELECT id, username, password_hash, name, role, status FROM admin_users WHERE username = ?');
    $stmt->execute([$username]);
    $user = $stmt->fetch();
    
    if (!$user || !password_verify($password, $user['password_hash'])) {
        jsonResponse(['error' => 'Invalid credentials'], 401);
    }
    
    if ($user['status'] !== 'Active') {
        jsonResponse(['error' => 'Account is inactive'], 403);
    }
    
    $token = generateToken($user['id'], $user['username']);
    
    jsonResponse([
        'success' => true,
        'token' => $token,
        'user' => [
            'id' => $user['id'],
            'username' => $user['username'],
            'name' => $user['name'],
            'role' => $user['role']
        ]
    ]);
}

function handleVerify() {
    $tokenData = validateToken();
    
    if (!$tokenData) {
        jsonResponse(['error' => 'Invalid or expired token'], 401);
    }
    
    $pdo = getDBConnection();
    $stmt = $pdo->prepare('SELECT id, username, name, role, status FROM admin_users WHERE id = ?');
    $stmt->execute([$tokenData['user_id']]);
    $user = $stmt->fetch();
    
    if (!$user || $user['status'] !== 'Active') {
        jsonResponse(['error' => 'User not found or inactive'], 401);
    }
    
    jsonResponse([
        'valid' => true,
        'user' => [
            'id' => $user['id'],
            'username' => $user['username'],
            'name' => $user['name'],
            'role' => $user['role']
        ]
    ]);
}
