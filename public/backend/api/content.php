<?php
/**
 * Site Content API
 * Endpoints: GET /content, PUT /content
 */

require_once __DIR__ . '/../config.php';
setCorsHeaders();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        handleGetContent();
        break;
        
    case 'PUT':
        handleUpdateContent();
        break;
        
    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}

function handleGetContent() {
    $pdo = getDBConnection();
    
    // Get main site content
    $stmt = $pdo->query('SELECT content_key, content_value FROM site_content');
    $rows = $stmt->fetchAll();
    
    $content = [];
    foreach ($rows as $row) {
        $content[$row['content_key']] = json_decode($row['content_value'], true);
    }
    
    // Get dynamic pages
    $stmt = $pdo->query('SELECT id, name, path, content, status FROM dynamic_pages');
    $content['dynamicPages'] = $stmt->fetchAll();
    
    // Get static page overrides
    $stmt = $pdo->query('SELECT id, name, path, content, status FROM static_page_overrides');
    $overrides = $stmt->fetchAll();
    $content['staticPageOverrides'] = [];
    foreach ($overrides as $override) {
        $content['staticPageOverrides'][$override['path']] = $override;
    }
    
    jsonResponse($content);
}

function handleUpdateContent() {
    $tokenData = validateToken();
    if (!$tokenData) {
        jsonResponse(['error' => 'Unauthorized'], 401);
    }
    
    $data = getRequestBody();
    $pdo = getDBConnection();
    
    // Begin transaction
    $pdo->beginTransaction();
    
    try {
        // Update main content sections
        $contentKeys = ['name', 'tagline', 'description', 'nav', 'hero', 'home', 'services', 
                        'servicesPage', 'about', 'contact', 'contactPage', 'careersPage', 'footer'];
        
        $stmt = $pdo->prepare('INSERT INTO site_content (content_key, content_value) 
                              VALUES (?, ?) 
                              ON DUPLICATE KEY UPDATE content_value = VALUES(content_value)');
        
        foreach ($contentKeys as $key) {
            if (isset($data[$key])) {
                $stmt->execute([$key, json_encode($data[$key])]);
            }
        }
        
        // Update dynamic pages
        if (isset($data['dynamicPages'])) {
            $pdo->exec('DELETE FROM dynamic_pages');
            $stmt = $pdo->prepare('INSERT INTO dynamic_pages (id, name, path, content, status) VALUES (?, ?, ?, ?, ?)');
            foreach ($data['dynamicPages'] as $page) {
                $stmt->execute([
                    $page['id'],
                    $page['name'],
                    $page['path'],
                    $page['content'],
                    $page['status']
                ]);
            }
        }
        
        // Update static page overrides
        if (isset($data['staticPageOverrides'])) {
            $pdo->exec('DELETE FROM static_page_overrides');
            $stmt = $pdo->prepare('INSERT INTO static_page_overrides (id, name, path, content, status) VALUES (?, ?, ?, ?, ?)');
            foreach ($data['staticPageOverrides'] as $override) {
                $stmt->execute([
                    $override['id'],
                    $override['name'],
                    $override['path'],
                    $override['content'],
                    $override['status']
                ]);
            }
        }
        
        $pdo->commit();
        jsonResponse(['success' => true]);
        
    } catch (Exception $e) {
        $pdo->rollBack();
        jsonResponse(['error' => 'Failed to update content: ' . $e->getMessage()], 500);
    }
}
