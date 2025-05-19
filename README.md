# Salesforce Node.js API Integration

This project demonstrates a Node.js application that integrates with Salesforce using JWT authentication and provides a web interface for data entry.

## Features

- JWT Authentication with Salesforce
- Web form interface for data entry
- REST API endpoints for Salesforce operations
- Secure token management
- Real-time feedback on form submissions

## Prerequisites

- Node.js (v12 or higher)
- npm (Node Package Manager)
- Salesforce Developer Account
- Connected App in Salesforce with JWT authentication enabled

## Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd salesforce-node-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Salesforce credentials:
```
SF_CLIENT_ID=your_connected_app_client_id
SF_USERNAME=your_salesforce_username
SF_LOGIN_URL=https://login.salesforce.com
```

4. Generate a private key for JWT authentication:
   - Create a private key file named `private.pem`
   - Place it in the root directory of the project

## Project Structure

```
salesforce-node-api/
├── index.js          # Main server file with JWT authentication
├── test.js           # Web form server and Salesforce data operations
├── public/           # Static files
│   └── index.html    # Web form interface
├── private.pem       # JWT private key
├── .env             # Environment variables
└── README.md        # This file
```

## Running the Application

1. Start the authentication server:
```bash
node index.js
```
This will run on port 3000

2. Start the web form server:
```bash
node test.js
```
This will run on port 3001

3. Open your browser and navigate to:
```
http://localhost:3001
```

## API Endpoints

### Authentication Server (Port 3000)
- `GET /`: Returns authentication status

### Web Form Server (Port 3001)
- `GET /`: Serves the web form interface
- `POST /submit`: Handles form submissions to Salesforce

## Form Fields

The web form includes the following fields:
- Name
- Email
- Cohort

## Error Handling

The application includes comprehensive error handling for:
- Authentication failures
- Salesforce API errors
- Form validation
- Network issues

## Security Features

- JWT-based authentication
- Environment variable configuration
- Secure token management
- Input validation

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
