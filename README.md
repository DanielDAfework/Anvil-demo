# Anvil PDF Generation Demo

A Node.js Express server that integrates with Anvil API to generate and manage PDF lease agreements.

## Features

- PDF generation using Anvil API
- PostgreSQL database for storing agreement data
- RESTful API endpoints for agreement management
- File management for generated PDFs
- Error handling middleware
- Health check endpoint

## Prerequisites

### 1. Anvil Account Setup

1. Go to [Anvil](https://www.useanvil.com/) and create a developer account
2. Once logged in, upload your PDF template
3. Get your API key from the Anvil dashboard
4. Note your template ID for use in the application

### Template Aliases
The system uses the following aliases for agreement dates:
Make sure to set these aliases in your template
- `agreementDate` - Full date string
- `agreementMonth` - Month component
- `agreementDay` - Day component  
- `agreementYear` - Year component (last two digits, format: YY)

### 2. PostgreSQL Database

- Install PostgreSQL on your system
- Create a database named `anvil_demo`
- The system will automatically create a `postgres` user with password `postgres`
- Update your `.env` file with database credentials (optional, defaults are set)

## Installation & Setup

### Step 1: Clone and Install Dependencies
```bash
git clone <repository-url>
cd anvil-demo2
npm install
```

### Step 2: Environment Configuration
Create a `.env` file in the root directory with your Anvil API credentials:
```bash
# Database Configuration (optional - defaults are set)
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=anvil_demo

# Anvil API Configuration (required)
ANVIL_API_KEY=your_anvil_api_key_here
ANVIL_TEMPLATE_ID=your_template_id_here
```

### Step 3: Database Setup
```bash
# Run database migrations
npm run migrate
```

### Step 4: Create Agreements Directory
```bash
# Create directory for storing generated PDFs
mkdir agreements
```

## Usage

### Development Mode (with auto-restart)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in the `PORT` environment variable).

## API Endpoints

### PDF Generation
- **POST** `/pdf/save-pdf` - Generate and save a PDF lease agreement

### Agreement Management
- **GET** `/agreements` - Get all agreements from database
- **GET** `/agreements/formatted` - Get all agreements in formatted structure
- **GET** `/agreements/:id` - Get specific agreement by ID

### File Management
- **GET** `/agreements/[filename]` - Direct access to download PDF files

### Health & Status
- **GET** `/` - Server status and welcome message
- **GET** `/health` - Server health status and uptime

## Data Structure


### PDF File Storage
Generated PDF files are saved to the `agreements/` directory in the project root. Files are named with timestamps for uniqueness.

## Example API Usage

### Generate PDF Agreement
```bash
curl -X POST http://localhost:3000/pdf/save-pdf \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Lease Agreement",
    "data": {
      "tenantName": {
        "firstName": "John",
        "lastName": "Doe",
        "mi": "A"
      },
      "landlordName": {
        "firstName": "Jane",
        "lastName": "Smith",
        "mi": "B"
      },
      "propertyAddress": {
        "street1": "123 Main St",
        "street2": "Apt 4B",
        "city": "New York",
        "state": "NY",
        "zip": "10001",
        "country": "USA"
      },
      "leaseStartDate": "24-01-01",
      "leaseEndDate": "24-12-31",
      "monthlyRentAmount": 2000,
      "securityDepositAmount": 4000,
      "lateFeeAmount": 100,
      "returnedCheckFee": 25,
      "tenantsHoldOverRentAmount": 3000,
      "animalFee": 500,
      "agreementDate": "24-01-15",
      "agreementMonth": "01",
      "agreementDay": "15",
      "agreementYear": "24"
    }
  }'
```

### Get All Agreements
```bash
curl http://localhost:3000/agreements
```

### Get Formatted Agreements
```bash
curl http://localhost:3000/agreements/formatted
```

### Get Specific Agreement
```bash
curl http://localhost:3000/agreements/1
```



## Project Structure

```
├── server.js              # Main server file
├── routes/
│   ├── index.js          # Main routes
│   ├── pdf.js            # PDF generation routes
│   └── agreements.js     # Agreement management routes
├── controllers/
│   └── pdfController.js  # PDF generation controller
├── services/
│   ├── agreementService.js # Agreement data service
│   └── anvilService.js   # Anvil API service
├── models/
│   ├── Agreement.js      # Agreement model
│   └── index.js          # Model exports
├── migrations/
│   └── 001_create_agreements_table.js # Database migration
├── middleware/
│   └── errorHandler.js   # Error handling middleware
├── config/
│   └── database.js       # Database configuration
├── agreements/           # Generated PDF storage directory
├── public/              # Static files
└── package.json         # Project dependencies and scripts
```

## Dependencies

### Production Dependencies
- **express**: Web framework for Node.js
- **knex**: SQL query builder for PostgreSQL
- **pg**: PostgreSQL client for Node.js
- **dotenv**: Environment variable management

### Development Dependencies
- **nodemon**: Auto-restarting server for development

### Logs
Check the console output for detailed error messages and API responses. 