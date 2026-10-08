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
$required_fields = ['firstName', 'lastName', 'email', 'password', 'category'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        echo json_encode(['success' => false, 'message' => ucfirst($field) . ' is required']);
        exit;
    }
}

// Sanitize inputs
$first_name = trim(htmlspecialchars($input['firstName']));
$last_name = trim(htmlspecialchars($input['lastName']));
$email = trim(filter_var($input['email'], FILTER_SANITIZE_EMAIL));
$password = $input['password'];
$category = $input['category'];

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit;
}

// Validate password strength (min 8 characters)
if (strlen($password) < 8) {
    echo json_encode(['success' => false, 'message' => 'Password must be at least 8 characters']);
    exit;
}

// Validate category
$allowed_categories = ['racer', 'spectator', 'vendor'];
if (!in_array($category, $allowed_categories)) {
    echo json_encode(['success' => false, 'message' => 'Invalid user category']);
    exit;
}

// Validate name length
if (strlen($first_name) < 2 || strlen($last_name) < 2) {
    echo json_encode(['success' => false, 'message' => 'First and last name must be at least 2 characters']);
    exit;
}

$conn = getConnection();

try {
    // Check if email already exists
    $check_stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $check_stmt->bind_param("s", $email);
    $check_stmt->execute();
    $check_stmt->store_result();
    
    if ($check_stmt->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => 'Email already registered. Please use a different email or login.']);
        $check_stmt->close();
        $conn->close();
        exit;
    }
    $check_stmt->close();
    
    // Hash password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    // Insert user
    $insert_stmt = $conn->prepare("INSERT INTO users (first_name, last_name, email, password, category) VALUES (?, ?, ?, ?, ?)");
    $insert_stmt->bind_param("sssss", $first_name, $last_name, $email, $hashed_password, $category);
    
    if ($insert_stmt->execute()) {
        $user_id = $conn->insert_id;
        
        // Set session variables
        $_SESSION['user_id'] = $user_id;
        $_SESSION['user_email'] = $email;
        $_SESSION['user_name'] = $first_name . ' ' . $last_name;
        $_SESSION['user_category'] = $category;
        $_SESSION['logged_in'] = true;
        
        echo json_encode([
            'success' => true,
            'message' => 'Registration successful! Welcome to Beyond The Track.',
            'user' => [
                'id' => $user_id,
                'firstName' => $first_name,
                'lastName' => $last_name,
                'email' => $email,
                'category' => $category
            ]
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Registration failed. Please try again.']);
    }
    
    $insert_stmt->close();
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
} finally {
    $conn->close();
}
?>