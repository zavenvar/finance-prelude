<?php
/**
 * Dynamic Pages API
 * Endpoints: GET /pages, GET /pages/:path, POST /pages, PUT /pages/:id, DELETE /pages/:id
 */

require_once __DIR__ . '/../config.php';
setCorsHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$id = $_GET['id'] ?? null;
$path = $_GET['path'] ?? null;

switch ($method) {
    case 'GET':
        if ($path) {
            handleGetPageByPath($path);
        } else {
            handleGetPages();
        }
        break;
        
    case 'POST':
        handleCreatePage();
        break;
        
    case 'PUT':
        handleUpdatePage($id);
        break;
        
    case 'DELETE':
        handleDeletePage($id);
        break;
        
    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}

function handleGetPages() {
    $pdo = getDBConnection();
    $stmt = $pdo->query("SELECT * FROM dynamic_pages ORDER BY name");
    $pages = $stmt->fetchAll();
    
    jsonResponse($pages);
}

function handleGetPageByPath($path) {
    $pdo = getDBConnection();
    $stmt = $pdo->prepare("SELECT * FROM dynamic_pages WHERE path = ? AND status = 'Published'");
    $stmt->execute(['/' . ltrim($path, '/')]);
    $page = $stmt->fetch();
    
    if (!$page) {
        jsonResponse(['error' => 'Page not found'], 404);
    }
    
    jsonResponse($page);
}

function handleCreatePage() {
    $tokenData = validateToken();
    if (!$tokenData) {
        jsonResponse(['error' => 'Unauthorized'], 401);
    }
    
    $data = getRequestBody();
    
    $id = $data['id'] ?? uniqid();
    $name = trim($data['name'] ?? '');
    $path = trim($data['path'] ?? '');
    $content = $data['content'] ?? '';
    $status = $data['status'] ?? 'Draft';
    
    if (empty($name) || strlen($name) > 255) {
        jsonResponse(['error' => 'Name is required and must be less than 255 characters'], 400);
    }
    
    if (empty($path) || !preg_match('/^\/[a-z0-9\-\/]*$/', $path)) {
        jsonResponse(['error' => 'Valid path is required (lowercase letters, numbers, hyphens)'], 400);
    }
    
    $pdo = getDBConnection();
    
    // Check if path exists
    $stmt = $pdo->prepare('SELECT id FROM dynamic_pages WHERE path = ?');
    $stmt->execute([$path]);
    if ($stmt->fetch()) {
        jsonResponse(['error' => 'Path already exists'], 409);
    }
    
    $stmt = $pdo->prepare('INSERT INTO dynamic_pages (id, name, path, content, status) VALUES (?, ?, ?, ?, ?)');
    $stmt->execute([$id, $name, $path, $content, $status]);
    
    jsonResponse([
        'success' => true,
        'page' => [
            'id' => $id,
            'name' => $name,
            'path' => $path,
            'content' => $content,
            'status' => $status
        ]
    ], 201);
}

function handleUpdatePage($id) {
    if (!$id) {
        jsonResponse(['error' => 'Page ID is required'], 400);
    }
    
    $tokenData = validateToken();
    if (!$tokenData) {
        jsonResponse(['error' => 'Unauthorized'], 401);
    }
    
    $data = getRequestBody();
    $pdo = getDBConnection();
    
    // Check if page exists
    $stmt = $pdo->prepare('SELECT * FROM dynamic_pages WHERE id = ?');
    $stmt->execute([$id]);
    $page = $stmt->fetch();
    
    if (!$page) {
        jsonResponse(['error' => 'Page not found'], 404);
    }
    
    $name = trim($data['name'] ?? $page['name']);
    $path = trim($data['path'] ?? $page['path']);
    $content = $data['content'] ?? $page['content'];
    $status = $data['status'] ?? $page['status'];
    
    // Check if new path conflicts with another page
    if ($path !== $page['path']) {
        $stmt = $pdo->prepare('SELECT id FROM dynamic_pages WHERE path = ? AND id != ?');
        $stmt->execute([$path, $id]);
        if ($stmt->fetch()) {
            jsonResponse(['error' => 'Path already exists'], 409);
        }
    }
    
    $stmt = $pdo->prepare('UPDATE dynamic_pages SET name = ?, path = ?, content = ?, status = ? WHERE id = ?');
    $stmt->execute([$name, $path, $content, $status, $id]);
    
    jsonResponse([
        'success' => true,
        'page' => [
            'id' => $id,
            'name' => $name,
            'path' => $path,
            'content' => $content,
            'status' => $status
        ]
    ]);
}

function handleDeletePage($id) {
    if (!$id) {
        jsonResponse(['error' => 'Page ID is required'], 400);
    }
    
    $tokenData = validateToken();
    if (!$tokenData) {
        jsonResponse(['error' => 'Unauthorized'], 401);
    }
    
    $pdo = getDBConnection();
    $stmt = $pdo->prepare('DELETE FROM dynamic_pages WHERE id = ?');
    $stmt->execute([$id]);
    
    if ($stmt->rowCount() === 0) {
        jsonResponse(['error' => 'Page not found'], 404);
    }
    
    jsonResponse(['success' => true]);
}
