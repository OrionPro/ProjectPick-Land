<?php

define('__ROOT__', dirname(__FILE__));
require_once __ROOT__ . '/PHPMailer/class.phpmailer.php';

if ($_POST) {
	$json = array(); // подготовим массив ответа

	if(isset($_POST['form_type'])){
		$id_form = $_POST['form_type'];
		$json['form_type'] = $id_form;
	}


	 if (isset($_POST['form_name']) and $_POST['form_name'] != "") {
		$form_name = $_POST['form_name'];
		$message .= '
		<h1>Вам сообщение!</h1>
		<div style="font-size: 18px; margin-bottom: 10px">Из формы: ' . '<span style="font-size: 18px"> ' . $form_name . '</span>' . '</div>';
	}
	if (isset($_POST['name']) and $_POST['name'] != "") {
		$name = $_POST['name'];
		$message .= '<div style="font-size: 18px; margin-bottom: 10px; padding-left: 10px">Имя: ' . $name . '</div>';
	}
	if (isset($_POST['phone']) and $_POST['phone'] != "") {
        $phone = $_POST['phone'];
        $message .= '<div style="font-size: 18px; margin-bottom: 10px; padding-left: 10px">Телефон: ' . $phone . '</div>';
    }
    if (isset($_POST['phone_mask']) and $_POST['phone_mask'] != "") {
        $phone_mask = $_POST['phone_mask'];
        $message .= '<div style="font-size: 18px; margin-bottom: 10px; padding-left: 10px">Телефон: ' . $phone_mask . '</div>';
    }
	if (isset($_POST['email']) and $_POST['email'] != "") {
		$email = $_POST['email'];
		$message .= '<div style="font-size: 18px; margin-bottom: 10px; padding-left: 10px">Email: ' . $email . '</div>';
	}
	if (isset($_POST['textarea']) and $_POST['textarea'] != "") {
		$textarea = $_POST['textarea'];
		$message .= '<div style="font-size: 18px; margin-bottom: 10px; padding-left: 10px">Описание в texarea: ' . $textarea . '</div>';
	}
	 if(isset($_POST["sex"]) and $_POST['sex'] != "") {
		$sex = $_POST["sex"];
		$message .= '<div style="font-size: 18px; margin-bottom: 10px; padding-left: 10px">Пол: ' . $sex . '</div>';
	}
    if(isset($_POST["color"]) and $_POST['color'] != "") {
        $color = $_POST["color"];
        $message .= '<div style="font-size: 18px; margin-bottom: 10px; padding-left: 10px">Цвет: ' . $color . '</div>';
    }
	if(isset($_POST["markPhone"]) and $_POST['markPhone'] != "") {
		$markPhone = $_POST["markPhone"];
		$message .= '<div style="font-size: 18px; margin-bottom: 10px; padding-left: 10px">Марка телефона: ' . $markPhone . '</div>';
	}
	if(isset($_POST["madelPhone"]) and $_POST['madelPhone'] != "") {
		$modelPhone = $_POST["madelPhone"];
		$message .= '<div style="font-size: 18px; margin-bottom: 10px; padding-left: 10px">Модель телефона: ' . $modelPhone . '</div>';
	}
    if(isset($_POST["designStyle"]) and $_POST['designStyle'] != "") {
        $designStyle = $_POST["designStyle"];
        $message .= '<div style="font-size: 18px; margin-bottom: 10px; padding-left: 10px">Стиль дизайна: ' . $designStyle . '</div>';
    }

	$mailer = new PHPMailer();
	$subject = "Заявка с сайта pickcase.com.ua";
	$to = 'orionpro79@gmail.com';
 //   $mailer->IsSMTP();
	$mailer->Host = 'smtp.yandex.ru';
	$mailer->Port = 465;
	$mailer->SMTPSecure = "ssl";
	$mailer->SMTPAuth = true;
	$mailer->Username = 'efimenko-i-d@yandex.ua';
	$mailer->Password = 'TabvtyrjBujhm06';
	$mailer->From = 'smile@pickcase.com.ua';
	$mailer->FromName = 'pickcase';
	$mailer->CharSet = "UTF-8";
	$mailer->Subject = $subject;
	$mailer->MsgHTML($message);
	$mailer->AddAddress($to);

	//Upload Files

	foreach ($_FILES as $file) {


		$ext = '.' . pathinfo($file['name'], PATHINFO_EXTENSION);
        // раскомментировать если хотим сделать уникальное имя файла
//		while (true) {
//			$filename = uniqid(rand(), true) . $ext;
//
//
//			if (!file_exists(__ROOT__ . '\uploads\\' . $filename)) {
//				break;
//			}
//		}
        $filename = $ext; // убрать этот код, когда раскомментируем wile чтобы сделать уникальное имя файла

		move_uploaded_file($file['tmp_name'], __ROOT__ . '\uploads\\' . $filename);
		$file_to_attach = __ROOT__ . '\uploads\\' . $filename;
		$mailer->AddAttachment($file_to_attach, $file['name']); // если раскомментировать вверху wile и добавить в AddAttachment вместо $file['name'] - $filename то будет работать уникальное имя
		// $images[] = __ROOT__ . '\uploads\\' . $filename;
	}

	if ($mailer->Send()) {
		$json['error'] = 0;
	} else {
		$json['error'] = 1;
	}

	echo json_encode($json);
}