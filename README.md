# HL7 to JSON Parser

A simple HL7 parser to generate a properly nested JSON object.

## Getting Started

### Prerequisites

Before running this project, you will need both **NodeJS** and **MongoDB** installed and running.

### Installing

Clone the project from GitHub:

```
git clone https://github.com/jesseiancary/hl7-parser.git
```

Build the project:

```
cd hl7-parser/backend
npm install
cd ../client
npm install
cd ..
npm install
npm start
```

This will automatically launch the app in your browser. Create a new user login, then navigate to the HL7 section and paste an HL7 document to see the magic! (A couple of sample HL7 documents are located in /hl7_samples.)

**This app is not HIPPA compliant, REMOVE/REPLACE ANY SENSITIVE PATIENT IDENTIFIABLE INFORMATION LIKE Name, Address, Email, Phone, etc. For more information regarding HIPPA compliance and regulations, [click here](https://www.hhs.gov/hipaa/index.html).**

## Built With

* [NodeJS](https://nodejs.org/en/) - Application Layer
* [MongoDB](https://www.mongodb.com/) - Data Storage
* [HapiJS](https://hapi.dev/) - Backend API
* [ReactJS](https://reactjs.org/) - Frontend SPA