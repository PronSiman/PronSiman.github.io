<?php
if ($_POST) {
	$string = serialize($_POST);
	$f = fopen('users.txt', 'a');
	fwrite($f, $string . PHP_EOL);
	fclose($f);
}