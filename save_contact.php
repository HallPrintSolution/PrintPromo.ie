<?php
/* =========================================================
   save_contact.php  — PrintPromo.ie quote request handler
   Sends the form by SMTP through enquiries@printpromo.ie
   Requires PHPMailer (see instructions) and a config file
   stored OUTSIDE the web root.
   ========================================================= */

header('Content-Type: application/json; charset=utf-8');

function respond($success, $message) {
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Invalid request.');
}

/* ---- 1. Anti-spam honeypot ----
   Real users never see the "website" field. Bots fill it. */
if (!empty($_POST['website'])) {
    // Pretend success so the bot moves on
    respond(true, 'Thank you.');
}

/* ---- 2. Load credentials from OUTSIDE the web root ----
   Config lives one level above httpdocs so it can never be
   served as plain text. See instructions. */
$configPath = dirname($_SERVER['DOCUMENT_ROOT']) . '/private/mail_config.php';
if (!file_exists($configPath)) {
    respond(false, 'Server configuration error. Please email enquiries@printpromo.ie directly.');
}
$config = require $configPath;

/* ---- 3. Collect and sanitise input ---- */
function clean($key) {
    return isset($_POST[$key]) ? trim(strip_tags($_POST[$key])) : '';
}

$company        = clean('company');
$contact_name   = clean('contact_name');
$email          = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone          = clean('phone');
$product_service= clean('product_service');
$quantity       = clean('quantity');
$required_date  = clean('required_date');
$artwork_status = clean('artwork_status');
$details        = clean('details');

/* ---- 4. Validate ---- */
$errors = [];
if ($company === '')         $errors[] = 'Company name';
if ($contact_name === '')    $errors[] = 'Contact name';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'A valid email';
if ($product_service === '') $errors[] = 'Product / service';
if ($quantity === '')        $errors[] = 'Quantity';
if ($details === '')         $errors[] = 'Project details';

if (!empty($errors)) {
    respond(false, 'Please complete: ' . implode(', ', $errors) . '.');
}

/* ---- 5. Handle file upload ---- */
$attachmentPath = null;
$attachmentName = null;
if (isset($_FILES['artwork']) && $_FILES['artwork']['error'] === UPLOAD_ERR_OK) {
    $file = $_FILES['artwork'];

    // 8 MB limit
    if ($file['size'] > 8 * 1024 * 1024) {
        respond(false, 'The attached file is larger than 8 MB.');
    }

    $allowedExt = ['png', 'jpg', 'jpeg', 'pdf', 'svg', 'ai'];
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, $allowedExt, true)) {
        respond(false, 'File type not allowed. Use PNG, JPG, PDF, SVG or AI.');
    }

    $attachmentPath = $file['tmp_name'];
    $attachmentName = preg_replace('/[^A-Za-z0-9._-]/', '_', $file['name']);
}

/* ---- 6. Build the email ---- */
require dirname($_SERVER['DOCUMENT_ROOT']) . '/private/PHPMailer/PHPMailer.php';
require dirname($_SERVER['DOCUMENT_ROOT']) . '/private/PHPMailer/SMTP.php';
require dirname($_SERVER['DOCUMENT_ROOT']) . '/private/PHPMailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = $config['host'];        // e.g. mail.printpromo.ie
    $mail->SMTPAuth   = true;
    $mail->Username   = $config['username'];     // enquiries@printpromo.ie
    $mail->Password   = $config['password'];     // set in mail_config.php
    $mail->SMTPSecure = $config['encryption'];   // 'ssl' for port 465, 'tls' for 587
    $mail->Port       = $config['port'];         // 465 on mail.email.ie

    // From the authenticated mailbox; reply goes to the customer
    $mail->setFrom($config['username'], 'PrintPromo.ie Website');
    $mail->addAddress($config['to']);            // enquiries@printpromo.ie
    $mail->addReplyTo($email, $contact_name);

    if ($attachmentPath) {
        $mail->addAttachment($attachmentPath, $attachmentName);
    }

    $mail->Subject = 'New quote request: ' . $product_service . ' — ' . $company;

    $body  = "New quote request from the PrintPromo.ie website\n";
    $body .= "-----------------------------------------------\n\n";
    $body .= "Company:          $company\n";
    $body .= "Contact name:     $contact_name\n";
    $body .= "Email:            $email\n";
    $body .= "Phone:            " . ($phone ?: '-') . "\n";
    $body .= "Product/Service:  $product_service\n";
    $body .= "Quantity:         $quantity\n";
    $body .= "Required date:    " . ($required_date ?: '-') . "\n";
    $body .= "Artwork status:   " . ($artwork_status ?: '-') . "\n";
    $body .= "Attachment:       " . ($attachmentName ?: 'none') . "\n\n";
    $body .= "Project details:\n$details\n";

    $mail->Body = $body;

    $mail->send();
    respond(true, 'Thank you. Your request has been sent — we\'ll be in touch shortly.');

} catch (Exception $e) {
    // Do not leak SMTP details to the browser
    error_log('PrintPromo contact form error: ' . $mail->ErrorInfo);
    respond(false, 'We couldn\'t send your request right now. Please email enquiries@printpromo.ie directly.');
}
