<?php
header('Content-Type: application/json');
require_once 'config.php';

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
if (empty($input['email']) || empty($input['password'])) {
    echo json_encode(['success' => false, 'message' => 'Email and password are required']);
    exit;
}

// Sanitize inputs
$email = trim(filter_var($input['email'], FILTER_SANITIZE_EMAIL));
$password = $input['password'];

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit;
}

$conn = getConnection();

try {
    // Get user by email
    $stmt = $conn->prepare("SELECT id, first_name, last_name, email, password, category FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        echo json_encode(['success' => false, 'message' => 'Email not found. Please sign up first.']);
        $stmt->close();
        $conn->close();
        exit;
    }
    
    $user = $result->fetch_assoc();
    
    // Verify password
    if (password_verify($password, $user['password'])) {
        // Set session variables
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_email'] = $user['email'];
        $_SESSION['user_name'] = $user['first_name'] . ' ' . $user['last_name'];
        $_SESSION['user_category'] = $user['category'];
        $_SESSION['logged_in'] = true;
        
        // Determine redirect URL based on category
        // UPDATE THESE URLs WITH YOUR ACTUAL DASHBOARD PAGES
        $redirect_url = '';
        switch ($user['category']) {
            case 'racer':
                $redirect_url = 'racer.html'; // Replace with your actual racer dashboard URL
                break;
            case 'spectator':
                $redirect_url = 'spectators.html'; // Replace with your actual spectator dashboard URL
                break;
            case 'vendor':
                $redirect_url = 'vendors.html'; // Replace with your actual vendor dashboard URL
                break;
            default:
                $redirect_url = 'index.html';
        }
        
        echo json_encode([
            'success' => true,
            'message' => 'Login successful! Welcome back, ' . $user['first_name'] . '!',
            'redirect' => $redirect_url,
            'user' => [
                'id' => $user['id'],
                'firstName' => $user['first_name'],
                'lastName' => $user['last_name'],
                'email' => $user['email'],
                'category' => $user['category']
            ]
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Incorrect password. Please try again.']);
    }
    
    $stmt->close();
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
} finally {
    $conn->close();
}
?>