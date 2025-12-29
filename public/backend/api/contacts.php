<?php
/**
 * Contact Submissions API
 * Endpoints: GET /contacts, POST /contacts, PUT /contacts/:id, DELETE /contacts/:id
 */

require_once __DIR__ . '/../config.php';
setCorsHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$id = $_GET['id'] ?? null;

switch ($method) {
    case 'GET':
        handleGetContacts();
        break;
        
    case 'POST':
        handleCreateContact();
        break;
        
    case 'PUT':
        handleUpdateContact($id);
        break;
        
    case 'DELETE':
        handleDeleteContact($id);
        break;
        
    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}

function handleGetContacts() {
    $tokenData = validateToken();
    if (!$tokenData) {
        jsonResponse(['error' => 'Unauthorized'], 401);
    }
    
    $pdo = getDBConnection();
    $stmt = $pdo->query('SELECT * FROM contact_submissions ORDER BY submitted_at DESC');
    $contacts = $stmt->fetchAll();
    
    jsonResponse($contacts);
}

function handleCreateContact() {
    $data = getRequestBody();
    
    // Validate required fields
    $name = trim($data['name'] ?? '');
    $email = trim($data['email'] ?? '');
    $phone = trim($data['phone'] ?? '');
    $message = trim($data['message'] ?? '');
    
    if (empty($name) || strlen($name) > 255) {
        jsonResponse(['error' => 'Name is required and must be less than 255 characters'], 400);
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 255) {
        jsonResponse(['error' => 'Valid email is required'], 400);
    }
    
    if (strlen($phone) > 50) {
        jsonResponse(['error' => 'Phone must be less than 50 characters'], 400);
    }
    
    if (empty($message) || strlen($message) > 5000) {
        jsonResponse(['error' => 'Message is required and must be less than 5000 characters'], 400);
    }
    
    $pdo = getDBConnection();
    $stmt = $pdo->prepare('INSERT INTO contact_submissions (name, email, phone, message) VALUES (?, ?, ?, ?)');
    $stmt->execute([$name, $email, $phone, $message]);
    
    jsonResponse(['success' => true, 'id' => $pdo->lastInsertId()], 201);
}

function handleUpdateContact($id) {
    if (!$id) {
        jsonResponse(['error' => 'Contact ID is required'], 400);
    }
    
    $tokenData = validateToken();
    if (!$tokenData) {
        jsonResponse(['error' => 'Unauthorized'], 401);
    }
    
    $data = getRequestBody();
    $status = $data['status'] ?? null;
    
    if (!in_array($status, ['New', 'Read', 'Replied'])) {
        jsonResponse(['error' => 'Invalid status'], 400);
    }
    
    $pdo = getDBConnection();
    $stmt = $pdo->prepare('UPDATE contact_submissions SET status = ? WHERE id = ?');
    $stmt->execute([$status, $id]);
    
    if ($stmt->rowCount() === 0) {
        jsonResponse(['error' => 'Contact not found'], 404);
    }
    
    jsonResponse(['success' => true]);
}

function handleDeleteContact($id) {
    if (!$id) {
        jsonResponse(['error' => 'Contact ID is required'], 400);
    }
    
    $tokenData = validateToken();
    if (!$tokenData) {
        jsonResponse(['error' => 'Unauthorized'], 401);
    }
    
    $pdo = getDBConnection();
    $stmt = $pdo->prepare('DELETE FROM contact_submissions WHERE id = ?');
    $stmt->execute([$id]);
    
    if ($stmt->rowCount() === 0) {
        jsonResponse(['error' => 'Contact not found'], 404);
    }
    
    jsonResponse(['success' => true]);
}
