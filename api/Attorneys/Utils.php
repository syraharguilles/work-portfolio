<?php

	class Utils {
		/**
		 * @param string $message
		 * @return json
		 */
		public static function exit_error($message) {
			echo json_encode(array(
				'data' => array(),
				'success' => false,
				'message' => $message
			));
			exit;
		}

		/**
		 * @param array[] $data
		 * @return json
		 */
		public static function exit_success($data) {
			echo json_encode(array(
				'data' => $data,
				'success' => true
			));
		}

		/**
		 * @param int[] $data
		 * @param boolean $is_get_method
		 * @return array|empty
		 */
		public static function set_num_keys_assoc_array($data = array(), $is_get_method = true) {
			$assoc_array = array();

			if (!empty($data) && $is_get_method) {
				foreach ($data as $key) {
					$assoc_array[$key] = isset($_GET[$key]) && is_numeric($_GET[$key]) && strlen($_GET[$key])
							? intval($_GET[$key])
							: null;
				}
			}

			return $assoc_array;
		}

		/**
		 * @param string[] $data
		 * @param boolean $is_get_method
		 * @return array|empty
		 */
		public static function set_string_keys_assoc_array($data = array(), $is_get_method = true) {
			$assoc_array = array();

			if (!empty($data) && $is_get_method) {
				foreach ($data as $key) {
					$assoc_array[$key] = isset($_GET[$key]) && strlen($_GET[$key])
							? $_GET[$key]
							: null;
				}
			}

			return $assoc_array;
		}

		/**
		 * @param int $cat_id
		 * @param int $proxy_cat_id
		 * @return int|null
		 */
		public static function set_cat_id ($cat_id, $proxy_cat_id) {
			$set_cat_id = null;

			if ($cat_id && $proxy_cat_id) {
				return $set_cat_id = $cat_id;
			} else if (!$cat_id) {
				return $set_cat_id = $proxy_cat_id;
			} else if( !$proxy_cat_id ) {
				return $set_cat_id = $cat_id;
			}else {
				return $set_cat_id;
			}
		}

		/**
		 * @param string[] $data
		 * @return string|empty
		 */
		public static function types ($data = array()) {

			$types = '';

			if (!empty($data)) {
				foreach($data as $value) {
					if ($value[1] !== null) {
						$types .= $value[0];
					}
				}
			}

			return $types;
		}

		/**
		 * @param int[] $data
		 * @return array|empty
		 */
		public static function ref_values($data = array()) {
			
			$a_params = array();
			
			if (!empty($data)) {
				foreach($data as $value) {
					if ($value[1] !== null) {
						$a_params[] = &$value[1];
					}
				}
			}

			return $a_params;
		}
	}
?>