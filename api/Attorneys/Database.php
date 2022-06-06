<?php
	class Database extends Utils {
		/**
		 * @return string[]
		 */
		public static function wp_config() {

			if (!file_exists($_SERVER['DOCUMENT_ROOT'] . '/wp-config.php')) {
				parent::exit_error("Message failed: wp-config.php is not exists.");
			}

			require_once $_SERVER['DOCUMENT_ROOT'] . '/wp-config.php';

			return array('DB_HOST' => DB_HOST, 'DB_USER' => DB_USER, 'DB_PASSWORD' => DB_PASSWORD, 'DB_NAME' => DB_NAME);
		}

		/**
		 * @return object
		 */
		public static function mysqli_connect() {
			$mysqli = null;

			// Check if the library is loaded or exists
			if (!extension_loaded('mysqli') && !function_exists('mysqli_init')) {
				parent::exit_error("Mysql failed: Mysqli is not loaded and mysqli_init does not exist.");
			}

			//Instantiate mysqli
			$data_options = self::wp_config();
			$mysqli = new mysqli($data_options['DB_HOST'], $data_options['DB_USER'], $data_options['DB_PASSWORD'], $data_options['DB_NAME']);

			if ($mysqli->connect_errno) {
				parent::exit_error(sprintf("Connect failed: %s", mysqli_connect_error()));
			}

			return @$mysqli;
		}
	}
?>