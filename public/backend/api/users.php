<?php
/**
 * Admin Users API
 * Endpoints: GET /users, POST /users, DELETE /users/:id
 */

require_once __DIR__ . '/../config.php';
setCorsHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$id = $_GET['id'] ?? null;

// All endpoints require authentication
$tokenData = validateToken();
if (!$tokenData) {
    jsonResponse(['error' => 'Unauthorized'], 401);
}

switch ($method) {
    case 'GET':
        handleGetUsers();
        break;
        
    case 'POST':
        handleCreateUser();
        break;
        
    case 'DELETE':
        handleDeleteUser($id);
        break;
        
    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}

function handleGetUsers() {
    $pdo = getDBConnection();
    $stmt = $pdo->query('SELECT id, username, name, email, role, status, created_at FROM admin_users ORDER BY created_at DESC');
    $users = $stmt->fetchAll();
    
    jsonResponse($users);
}

function handleCreateUser() {
    $data = getRequestBody();
    
    $username = trim($data['username'] ?? '');
    $password = $data['password'] ?? '';
    $name = trim($data['name'] ?? '');
    $email = trim($data['email'] ?? '');
    $role = $data['role'] ?? 'Editor';
    
    if (empty($username) || strlen($username) < 3 || strlen($username) > 100) {
        jsonResponse(['error' => 'Username must be 3-100 characters'], 400);
    }
    
    if (empty($password) || strlen($password) < 6) {
        jsonResponse(['error' => 'Password must be at least 6 characters'], 400);
    }
    
    if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        jsonResponse(['error' => 'Invalid email format'], 400);
    }
    
    if (!in_array($role, ['Admin', 'Editor'])) {
        jsonResponse(['error' => 'Invalid role'], 400);
    }
    
    $pdo = getDBConnection();
    
    // Check if username exists
    $stmt = $pdo->prepare('SELECT id FROM admin_users WHERE username = ?');
    $stmt->execute([$username]);
    if ($stmt->fetch()) {
        jsonResponse(['error' => 'Username already exists'], 409);
    }
    
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);
    
    $stmt = $pdo->prepare('INSERT INTO admin_users (username, password_hash, name, email, role) VALUES (?, ?, ?, ?, ?)');
    $stmt->execute([$username, $passwordHash, $name, $email, $role]);
    
    jsonResponse([
        'success' => true, 
        'id' => $pdo->lastInsertId(),
        'user' => [
            'id' => $pdo->lastInsertId(),
            'username' => $username,
            'name' => $name,
            'email' => $email,
            'role' => $role,
            'status' => 'Active'
        ]
    ], 201);
}

function handleDeleteUser($id) {
    if (!$id) {
        jsonResponse(['error' => 'User ID is required'], 400);
    }
    
    $pdo = getDBConnection();
    
    // Prevent deleting the last admin
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM admin_users WHERE role = 'Admin' AND status = 'Active'");
    $adminCount = $stmt->fetch()['count'];
    
    $stmt = $pdo->prepare("SELECT role FROM admin_users WHERE id = ?");
    $stmt->execute([$id]);
    $user = $stmt->fetch();
    
    if ($user && $user['role'] === 'Admin' && $adminCount <= 1) {
        jsonResponse(['error' => 'Cannot delete the last admin user'], 400);
    }
    
    $stmt = $pdo->prepare('DELETE FROM admin_users WHERE id = ?');
    $stmt->execute([$id]);
    
    if ($stmt->rowCount() === 0) {
        jsonResponse(['error' => 'User not found'], 404);
    }
    
    jsonResponse(['success' => true]);
}
