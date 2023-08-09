<?php
function utf8mail($to, $s, $body, $from_name = "Стирка42.рф", $from_a = "noreply@xn--42-6kc5ak9afi.xn--p1ai", $reply = "")
{
    $s = "=?utf-8?b?" . base64_encode($s) . "?=";
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "From: =?utf-8?b?" . base64_encode($from_name) . "?= <" . $from_a . ">\r\n";
    $headers .= "Content-Type: text/html;charset=utf-8\r\n";
    $headers .= "Reply-To: $reply\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    mail($to, $s, $body, $headers);
}

if ($_POST) {
    $message = '<h1>Новая заявка</h1><br/>';
    $message .= 'Имя: ' . $_POST['firstname'] . "<br/>";
    $message .= 'Телефон: ' . $_POST['phone'] . "<br/>";
    
    if ($_POST['complaint-message']) {
        $message .= 'Жалоба: ' . $_POST['complaint-message'] . "<br/>";
    }
    
    utf8mail('a.vin@inbox.ru', 'Новая заявка с сайта', $message);
    utf8mail('saleproject42@gmail.com', 'Новая заявка с сайта', $message);
}
