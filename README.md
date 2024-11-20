# Blood Bank Management System

## Overview
This project is a Blood Bank Management System that allows users to manage blood bank entries, including adding new donations, viewing available blood types, and handling requests for specific blood types. It provides RESTful API endpoints for creating, reading, updating, deleting, and searching blood bank records.

## Features
- **Create Blood Bank Entry**: Add new blood donations with details such as donor name, age, blood type, contact information, quantity, collection date, expiration date, and status.
- **Get All Entries**: View a list of all blood donations stored in the system.
- **Get Entry by ID**: Retrieve specific blood donation details by its unique ID.
- **Update Blood Bank Entry**: Modify an existing entry, including donor details, blood type, quantity, and status.
- **Delete Blood Bank Entry**: Remove a specific blood donation record from the system.
- **Pagination**: Fetch blood bank entries in paginated form for better performance with large datasets.
- **Search Entries**: Search blood donations by donor name or blood type.
  
## Technologies Used
- **Node.js**: Backend server running on Node.js to handle requests.
- **Express.js**: Web framework for building the API.
- **JavaScript**: Server-side scripting language for business logic and data management.

## API Endpoints

### 1. Create a New Blood Bank Entry
- **URL**: `/entries`
- **Method**: `POST`
- **Request Body**:
    ```json
    {
        "donorName": "John Doe",
        "age": 25,
        "bloodType": "O+",
        "contactInfo": "john.doe@example.com",
        "quantity": 2,
        "collectionDate": "2024-11-01",
        "expirationDate": "2024-11-30",
        "status": "Available"
    }
    ```
- **Response**:
    ```json
    {
        "id": 1,
        "donorName": "John Doe",
        "age": 25,
        "bloodType": "O+",
        "contactInfo": "john.doe@example.com",
        "quantity": 2,
        "collectionDate": "2024-11-01",
        "expirationDate": "2024-11-30",
        "status": "Available"
    }
    ```

### 2. Get All Blood Bank Entries
- **URL**: `/entries`
- **Method**: `GET`
- **Response**: List of all blood bank entries.

### 3. Get Blood Bank Entry by ID
- **URL**: `/entries/:id`
- **Method**: `GET`
- **Response**:
    ```json
    {
        "id": 1,
        "donorName": "John Doe",
        "age": 25,
        "bloodType": "O+",
        "contactInfo": "john.doe@example.com",
        "quantity": 2,
        "collectionDate": "2024-11-01",
        "expirationDate": "2024-11-30",
        "status": "Available"
    }
    ```

### 4. Update Blood Bank Entry
- **URL**: `/entries/:id`
- **Method**: `PUT`
- **Request Body**:
    ```json
    {
        "status": "Requested"
    }
    ```
- **Response**:
    ```json
    {
        "id": 1,
        "donorName": "John Doe",
        "age": 25,
        "bloodType": "O+",
        "contactInfo": "john.doe@example.com",
        "quantity": 2,
        "collectionDate": "2024-11-01",
        "expirationDate": "2024-11-30",
        "status": "Requested"
    }
    ```

### 5. Delete Blood Bank Entry
- **URL**: `/entries/:id`
- **Method**: `DELETE`
- **Response**: `204 No Content` (indicating successful deletion)

### 6. Get Paginated Entries
- **URL**: `/entries/page/:page/size/:size`
- **Method**: `GET`
- **Response**:
    ```json
    {
        "page": 1,
        "size": 2,
        "totalEntries": 8,
        "totalPages": 4,
        "data": [
            {
                "id": 1,
                "donorName": "John Doe",
                "age": 25,
                "bloodType": "O+",
                "contactInfo": "john.doe@example.com",
                "quantity": 2,
                "collectionDate": "2024-11-01",
                "expirationDate": "2024-11-30",
                "status": "Available"
            },
            {
                "id": 2,
                "donorName": "Jane Smith",
                "age": 30,
                "bloodType": "A+",
                "contactInfo": "jane.smith@example.com",
                "quantity": 3,
                "collectionDate": "2024-11-10",
                "expirationDate": "2024-12-05",
                "status": "Requested"
            }
        ]
    }
    ```

### 7. Search Entries by Donor Name or Blood Type
- **URL**: `/entries/search/:query`
- **Method**: `GET`
- **Response**: List of entries matching the search query.

## Installation

### Prerequisites
- **Node.js** and **npm** must be installed on your system.

### Steps to Install and Run Locally:
1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/tonystark5683/blood-bank-api.git
    ```
2. Navigate to the project directory:
    ```bash
    cd blood-bank-management
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the server:
    ```bash
    npm start
    ```

By default, the application will run on `http://localhost:3000`.

## Contributing
Feel free to fork this repository and submit pull requests. Contributions are welcome!

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
