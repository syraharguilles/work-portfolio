<?php
	class Data extends Utils {
		public static $num_keys = array('_cat_id', '_except_cat_ids', '_rating', '_lm_active_atty', '_limit');
		public static $string_keys = array('_state', '_city', '_rand');

		/**
		 * @param int[] $data
		 * @return array|null
		 */
		public static function get_assoc_num_keys($data = array()) {
			return !empty($data) && is_array($data) ? parent::set_num_keys_assoc_array($data, true) : null;
		}

		/**
		 * @param string[] $data
		 * @return array|null
		 */
		public static function get_assoc_string_keys($data = array()) {
			return !empty($data) && is_array($data) ? parent::set_string_keys_assoc_array($data, true) : null;
		}

		/**
		 * @return array|empty
		 */
		public static function args() {
			$assoc_num_keys = self::get_assoc_num_keys(self::$num_keys);
			$assoc_string_keys = self::get_assoc_string_keys(self::$string_keys);
			$args = array();
		

			if (!empty($assoc_num_keys) || !empty($assoc_string_keys)) {
				/** 
				 * It should have this format and  
				 * Arrange the keys with the 
				 * Correspond of sql condition
				*/
				$args = array(
					array(
						's',
						$assoc_string_keys['_state']
					),
					array(
						'i',
						$assoc_num_keys['_cat_id']
					),
					array(
						"i",
						$assoc_num_keys['_except_cat_ids']
					),
					array ( 
						"s",
						$assoc_string_keys['_city']
					),
					array (
						'i',
						$assoc_num_keys['_rating']
					),
					array( 
						"i",
						$assoc_num_keys['_lm_active_atty']
					),
					array(
						"s",
						$assoc_string_keys['_rand']
					),
					array(
						"i",
						$assoc_num_keys['_limit']
					)
				);
			}

			return $args;
		}

		/**
		 * @return string
		 */
		public static function select_ids() {
			return 'SELECT DISTINCT a.id 
			FROM
				attorney a
			INNER JOIN
				attorney_practice_area apa 
				on apa.attorney_id = a.id
			INNER JOIN
				category cat
				on cat.id = apa.cat_id';
		}

		/**
		 * @return string|null
		 */
		public static function where() {
			$assoc_num_keys = self::get_assoc_num_keys(self::$num_keys);
			$assoc_string_keys = self::get_assoc_string_keys(self::$string_keys);
			$where = null;

			if (!empty($assoc_num_keys) || !empty($assoc_string_keys)) {
				$condition_temp = [];

				if ($assoc_string_keys['_state']) {
					$state = 'a.state in ( ? )';
				}

				if ($assoc_num_keys['_cat_id']) {
					$condition_temp[] = 'cat.id = ?';
				}

				if ($assoc_num_keys['_except_cat_ids']) {
					$condition_temp[] = 'cat.id not in ( ? )';
				}

				if ($assoc_string_keys['_city']) {
					$condition_temp[] = ' a.city in ( ? )';
				}

				if ($assoc_num_keys['_rating']) {
					$condition_temp[] = ' a.rating in ( ? )';
				}

				if ($assoc_num_keys['_lm_active_atty'] && $assoc_num_keys['_lm_active_atty'] !== 0) {
					$condition_temp[] = ' a.lm_active_atty in ( ? )';
				} else {
					$condition_temp[] = ' a.lm_active_atty in ( 0 )';
				}

				$condition = @sizeOf($condition_temp) !== 0 ? ' AND '.implode(' AND ',$condition_temp) : '';

				$where = 'WHERE '.$state.' '.$condition;
			}

			return $where;
		}

		/**
		 * @return string|null
		 */
		public static function rand() {
			$assoc_string_keys = self::get_assoc_string_keys(self::$string_keys);
			$rand = '';

			if (!empty($assoc_string_keys) && $assoc_string_keys['_rand'] && $assoc_string_keys['_rand'] === 'yes') {
				$rand = 'ORDER BY rand()';
			}

			return $rand;
		}

		/**
		 * @return string|null
		 */
		public static function limit() {
			$assoc_num_keys = self::get_assoc_num_keys(self::$num_keys);
			$default_limit = 10;
			$limit = '';

			if (!empty($assoc_num_keys)) {
				$limit = $assoc_num_keys['_limit'] && $assoc_num_keys['_limit'] > $default_limit ? 'LIMIT 0, ?' : 'LIMIT 0, '.$default_limit;
			}

			return $limit;
		}

		/**
		 * @param array[] $result
		 * @return array
		 */
		public static function attorneys($result) {

			if ($result->num_rows === 0) {
				return parent::exit_error("There's no result in the query. Please try again.");
			} else {
				//Attorney Array
				$attorneys_arr = array();

				while($row = $result->fetch_assoc()) {
					extract($row);

					$attoney_item = array(
						'cat_name' => $name,
						'sf_name' => $sf_name,
						'id' => $id,
						'first_name' => $first_name,
						'last_name' => $last_name,
						'middle_name' => $middle_name,
						'rating' => $rating,
						'website_url' => $website_url,
						'linkedin_url' => $linkedin_url,
						'phone' => $phone,
						'email' => $email,
						'city' => $city,
						'state' => $state,
						'avvo_url' => $avvo_url
					);

					//Push to "data"
					array_push($attorneys_arr, $attoney_item);
				}

				return $attorneys_arr;
			}
			
		}

		/**
		 * @param array[] $result
		 * @return array
		 */
		public static function attorney_ids($result) {

			if ($result->num_rows === 0) {
				return parent::exit_error("There's no result in the query. Please try again.");
			} else {
				//Attorney Array
				$attorneys_arr = array();

				while($row = $result->fetch_assoc()) {
					extract($row);

					$attoney_item = array(
						'id' => $id
					);

					//Push to "data"
					array_push($attorneys_arr, $attoney_item);
				}

				return $attorneys_arr;
			}
			
		}
	}
?>