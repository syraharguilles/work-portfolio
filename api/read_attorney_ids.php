<?php
	/**
	 * Script that generates attorney ids API endpoint
	 * To use this, add the keys below with the corresponding value at the end of this file
	 * @link https://legalmatch.atlassian.net/browse/LMS-10898
	 */
	
	// Include Utils, Database, & Data Classes if not exists
	if(!class_exists('Utils') && !class_exists('Database') && !class_exists('Data')) {
		require_once realpath(dirname(__DIR__) . '/api/Attorneys/Utils.php');
		require_once realpath(dirname(__DIR__) . '/api/Attorneys/Database.php');
		require_once realpath(dirname(__DIR__) . '/api/Attorneys/Data.php');
	}

	// Required headers
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	$mysqli = Database::mysqli_connect();

	$query = Data::select_ids().' '.Data::where().' '.Data::rand().' '.Data::limit().';';

	$stmt = $mysqli->stmt_init();

	if (!$stmt->prepare($query)) {
		Utils::exit_error("Statement failed: Failed to prepare statement. _state is required.");
	} else {
		// Prepare Query Statement
		$stmt = $mysqli->prepare($query);

		//Bind Variables
		/* use call_user_func_array, as $stmt->bind_param('s', $param); does not accept params array */
		@call_user_func_array(array($stmt, 'bind_param'), array_merge(array(Utils::types(Data::args())), Utils::ref_values(Data::args())));

		//Execute Query
		$stmt->execute();

		$result = $stmt->get_result();

		if (!$result) {
			Utils::exit_error(sprintf("Result failed: %s", $stmt->error));
		} else {
			Utils::exit_success(Data::attorney_ids($result));
		}
	}

	@$stmt->close();
	$mysqli->close();
?>