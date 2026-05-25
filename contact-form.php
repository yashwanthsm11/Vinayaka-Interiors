<?php

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST")
{

    $fname   = $_POST['fname'] ?? '';
    $phone   = $_POST['phone'] ?? '';
    $email   = $_POST['email'] ?? '';
    $message = $_POST['msg'] ?? '';

    if(!empty($fname) && !empty($email))
    {

        $to_email = "yashwanthsm047@gmail.com";

        $email_subject = "Inquiry From Contact Page";

        $body = "
        Name: $fname

        Phone: $phone

        Email: $email

        Message: $message
        ";

        $headers = "From: $email";

        if(mail($to_email, $email_subject, $body, $headers))
        {

            echo json_encode([
                'status' => 'Success',
                'msg' => 'Message Sent Successfully'
            ]);

        }
        else
        {

            echo json_encode([
                'status' => 'error',
                'msg' => 'Mail Sending Failed'
            ]);

        }

    }
    else
    {

        echo json_encode([
            'status' => 'error',
            'msg' => 'Please fill required fields'
        ]);

    }

}
?>