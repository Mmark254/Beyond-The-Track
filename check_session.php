<?php
header('Content-Type: application/json');
require_once 'config.php';

if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
    echo json_encode([
        'logged_in' => true,
        'user' => [
            'id' => $_SESSION['user_id'],
            'firstName' => explode(' ', $_SESSION['user_name'])[0],
            'lastName' => explode(' ', $_SESSION['user_name'])[1] ?? '',
            'email' => $_SESSION['user_email'],
            'category' => $_SESSION['user_category']
        ]
    ]);
} else {
    echo json_encode(['logged_in' => false]);
}
?>