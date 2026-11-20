<?php
/* Markben Hotel – booking handler
   Receives the booking form (index.html and booking.html) and saves it
   to the `hotelbooks` table. Uses a prepared statement, so user input
   can't inject SQL. */

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

function page($title, $message, $redirect = false) {
    $meta = $redirect ? '<meta http-equiv="refresh" content="4;url=index.html">' : '';
    echo '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">'
       . '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
       . $meta . '<title>' . htmlspecialchars($title) . '</title>'
       . '<link rel="stylesheet" href="styles.css"></head><body>'
       . '<main class="booking"><div class="booking-form" style="text-align:center">'
       . '<h2>' . htmlspecialchars($title) . '</h2><p>' . $message . '</p>'
       . '<a class="btn btn-primary" href="index.html">Back to home</a>'
       . '</div></main></body></html>';
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: booking.html');
    exit;
}

function post($key) {
    return isset($_POST[$key]) ? trim($_POST[$key]) : '';
}

$firstname     = post('firstname');
$lastname      = post('lastname');
$arrival       = post('arrivaldate');
$departure     = post('departuredate');
$adults        = (int) post('adultoptn');
$children      = (int) post('childrenoptn');
$rooms         = (int) post('roomoptn');
$roompackage   = post('roompackage');

$packages = ['Luxury Suite', 'Business Traveler', 'Coastal Retreat'];
$errors = [];

if ($firstname === '' || $lastname === '') $errors[] = 'Please enter your first and last name.';

$a = DateTime::createFromFormat('Y-m-d', $arrival);
$d = DateTime::createFromFormat('Y-m-d', $departure);
if (!$a || !$d)                        $errors[] = 'Please choose valid dates.';
elseif ($a < new DateTime('today'))    $errors[] = 'Arrival date cannot be in the past.';
elseif ($d <= $a)                      $errors[] = 'Departure must be after arrival.';

if ($adults < 1 || $adults > 6)        $errors[] = 'Adults must be between 1 and 6.';
if ($children < 0 || $children > 8)    $errors[] = 'Children must be between 0 and 8.';
if ($rooms < 1 || $rooms > 6)          $errors[] = 'Rooms must be between 1 and 6.';
if (!in_array($roompackage, $packages, true)) $errors[] = 'Please choose a room package.';

if ($errors) {
    $list = '';
    foreach ($errors as $e) $list .= htmlspecialchars($e) . '<br>';
    page('Please check your booking', $list . '<br><a href="booking.html">Go back</a>');
}

try {
    $con = new mysqli('localhost', 'root', '', 'hotel');
    $con->set_charset('utf8mb4');

    $stmt = $con->prepare(
        'INSERT INTO hotelbooks (firstname, lastname, arrival, departure, adults, children, rooms, roompackage)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    );
    $stmt->bind_param('ssssiiis', $firstname, $lastname, $arrival, $departure,
                      $adults, $children, $rooms, $roompackage);
    $stmt->execute();
    $stmt->close();
    $con->close();

    page('Room booked successfully', 'Thank you, ' . htmlspecialchars($firstname)
         . '! Your booking has been received. Redirecting you home&hellip;', true);

} catch (mysqli_sql_exception $e) {
    error_log('Booking error: ' . $e->getMessage());
    http_response_code(500);
    page('Something went wrong', 'We could not save your booking. Please try again or call 0797848559.');
}
