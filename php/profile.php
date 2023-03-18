<?php
    // Connect to MongoDB
    use MongoDB\Client;
    use MongoDB\Collection;
    use MongoDB\Driver\Query;
    $manager = new MongoDB\Driver\Manager("mongodb+srv://anishmahi946:anishadmin@cluster0.rempjqu.mongodb.net/?retryWrites=true&w=majority");

    // Select the database and collection
    $database = "guvi_db";
    $collection = "profiles";

    $type = $_POST['type'];

    if($type == 'get'){
        $name = $_POST['username'];
        $criteria = ['username' => $name];

        $query = new Query($criteria);

        $result = $manager->executeQuery("$database.$collection", $query);
        $details = $result->toArray();
        echo json_encode($details);
    }
    else{
        $id = $_POST['id'];
        $email = $_POST['email'];
        $fname = $_POST['fname'];
        $lname = $_POST['lname'];
        $number = $_POST['number'];
        $dob = $_POST['dob'];
        $address = $_POST['address'];
        $state = $_POST['state'];
        $city = $_POST['city'];
        $about = $_POST['about'];


        $filter = ['_id' => new MongoDB\BSON\ObjectID($id)];
        $update = ['$set' => [
            'email' => $email,
            'fname' => $fname,
            'lname' => $lname,
            'number' => $number,
            'dob' => $dob,
            'address' => $address,
            'state' => $state,
            'city' => $city,
            'about' => $about
        ]];
        $bulk = new MongoDB\Driver\BulkWrite;
        $bulk->update($filter, $update);
        
        $manager->executeBulkWrite("$database.$collection", $bulk);
    }



?>