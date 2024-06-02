# Backend of AI Powered Tone Translator

## Table of Contents

- [Getting Started](#getting-started)
- [Domain Modelling](#project-overview)
- [Schema Design](#getting-started)
- [Program Design](#design-decision)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [API Contract](#api-contract)
- [Testing](#testing)
- [Known Issues](#known-issues)
- [Deployment](#deployment)

Certainly! Here's a basic outline for a "Getting Started" documentation for the backend server.

## Getting Started

Welcome to the backend server of my AI Tone Translator application. This guide will help you get up and running with the server so that you can start building amazing features.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) installed on your development machine.
- A PostgreSQL database (e.g., [Supabase](https://supabase.io/)) set up and accessible.
- An [OpenAI API Key](https://beta.openai.com/account/api-keys) for AI-powered content generation.

### Installation

1. Clone the repository:

   ```bash
   git clone "https://github.com/anujaagarwal/Tone-Translator-Backend.git"
   ```

2. Install dependencies:

   ```bash
   cd Tone-Translator-Backend
   npm install
   ```

### Configuration

1. Create a `.env` file in the root directory of the backend server with the following environment variables:

   ```dotenv
   # Database configuration
   DB_USERNAME=your_database_username
   DB_PASSWORD=your_database_password
   DB_HOST=your_database_host
   DB_DATABASE=your_database_name
   DB_DIALECT=postgres

   # OpenAI API Key
   OPENAI_API_KEY=your_openai_api_key
   ```

   Replace `your_database_username`, `your_database_password`, `your_database_host`, `your_database_name`, and `your_openai_api_key` with your actual database and OpenAI API details.

2. Ensure that your connection with postresql is running and accessible by running /healthcheck api. Described below in API contracts

### Database Migration

To set up the database schema, run the following command:

```bash
npx sequelize-cli db:migrate
```

This command will execute database migrations using Sequelize to create the necessary tables.

### Start the Server

To start the backend server, run the following command:

```bash
node server.js
```

The server should now be running on the specified port (usually 3000).

### API Endpoints

My backend server provides API endpoints for frontend application. Refer to the API documentation for details on available endpoints and their functionality.

### Testing

You can run tests or test using postman

### Conclusion

Congratulations! You've successfully set up backend server. You can now integrate it with your frontend application to build powerful features for AI Tone Translator.

## Domain Modelling

1. Request Entity: This entity would represent a request in the system. Attributes which includes id, sample_content, new_draft.

2. Response Entity: This entity would represent the translated_text. Attributes includes id, request_id, translated_text.

- Relationship between Request and Response is 1:1.

Have a look at the diagram below:-

```bash
[Request] 1 ---- 1 [Response]
|                |
|                |
| - ProcessID    | - StepID
| - ProcessName  | - StepName
| - Description  | - StepDescription
|                | - StepOrder
                 | - ProcessID(FK)

```

In this representation, the line between [Request] and [Response] shows the relationship, with '1' on the Request side and '1' on the Response side, indicating that one Process can have one Response. The bullet points under each entity represent attributes of that entity.

- Constraints is that request_Id should be unique always.

## Schema Design

1. Processes Table:-
   This table stores the high-level information about each process.

   - id: Primary Key, unique identifier for each process.
   - name: Text, name of the process.
   - description: Text, a brief description of the process.
   - created_at: DateTime, timestamp when the process was created.
   - updated_at: DateTime, timestamp when the process was last updated.

2. Steps Table
   This table stores individual steps for each process.

- id: Primary Key, unique identifier for each step.
- process_id: Foreign Key, links to the Processes table.
- title: Text, title of the step.
- description: Text, detailed description of the step.
- order: Integer, the order of the step within the process.
- metadata: Text, for storing any additional information related to the step.
- created_at: DateTime, timestamp when the step was created.
- updated_at: DateTime, timestamp when the step was last updated.

## Program Design

The program design of the backend of my application, uses Express.js along with migrations, and models through Sequelize ORM. Here's a brief description of each component and their roles in my backend design:

1. **Express.js**: Express is a fast and minimalist web framework for Node.js that simplifies the creation of robust and scalable web applications. That was the reason I used express for api development.


2. **Migrations**: Migrations are scripts that define the structure and schema of the database tables. They are used to create, modify, or update database tables and their relationships. Sequelize migrations help keep my database schema in sync with my application's models.

3. **Models**: Models define the data structure and relationships of the application's entities. They serve as an abstraction layer for interacting with the database. Sequelize models provide an object-oriented approach to database operations, allowing to create, read, update, and delete records easily.

The typical flow of a request in my backend application follows these steps:

1. An incoming HTTP request hits a specific route defined in my Express.js application.

2. The route maps the request to the appropriate controller method.

3. The controller method, in turn, call one or more services to perform business logic and data processing.

4. Services interact with Sequelize models to read from or write to the database.

5. The controller receives the results from the services and constructs an HTTP response.

6. The HTTP response is sent back to the client with the requested data or an appropriate status code.

Overall, this design separates concerns, making my backend code organized, maintainable, and easy to extend as application grows.

## Folder Structure

```bash
├── package.json
├── package-lock.json
├── README.md
├── app.js
├── controllers
│   ├── processController.js
│   └── stepController.js
├── models
    ├── process.js
│   └── step.js
├── migrations
    ├── create-process.js
│   └── create-step.js
├── routes
│   ├── processRoutes.js
│   └── stepsRoutes.js
├── seeders
└── services
    ├── openaiService.js
    ├── processService.js
    └── stepsService.js
```

## Technologies Used

1. **[Supabase](https://supabase.com/):**

- Used for the database.
- Provides a PostgreSQL database with a user-friendly interface.
- Simplifies database management and reduces the need for complex server-side code.

2. **[NodeJs](https://nodejs.org/en):**

- Chosen as the runtime environment for the backend.
- Known for its speed and scalability.

3. **[ExpressJs](https://expressjs.com/):**

- A minimal and fast web framework for Node.js.
- Used to create routes, handle HTTP requests, and structure the backend.
- Simplifies the development of RESTful APIs and web services.

4. **[Sequelize](https://sequelize.org/):**

- An Object-Relational Mapping (ORM) library for Node.js.
- Simplifies database interactions by using JavaScript objects instead of raw SQL queries.
- Provides data modeling, validation, and migration capabilities.

5. **[OpenAI API](https://platform.openai.com/docs/overview):**

- Integrated to generate step-by-step instructions from text descriptions.
- Utilized for AI-powered content generation.

6. **[Postman](https://www.postman.com/):** Used for testing the apis in local

## API Contract

Here is an high level definition of APIs I have used.

### Process Creation

**Endpoint:** `/api/create-process`
**Method:** POST
**Description:** Create a new process.

**Request:**

```json
{
  "name": "Name of Process",
  "description": "Description of the process"
}
```

**Response (Success):**

```json
{
  "createdAt": "2023-12-11T04:16:59.616Z",
  "updatedAt": "2023-12-11T04:16:59.616Z",
  "id": "id of the process",
  "name": "Nameof the process",
  "description": "Description of process"
}
```

**Response (Error):**

```json
{
  "error": "Error message"
}
```

### AI Powered Api which interacts with LLM

**Endpoint:** `/api/process-description`
**Method:** POST
**Description:** Create a new process in the db and generates steps by interacting with AI and stores those step in the database.

**Request:**

```json
{
  "description": "Description of process"
}
```

**Response (Success):**

```json
{
  "processId": 1,
  "steps": [
    {
      "order": 1,
      "title": "Title of step",
      "description": "Description of step",
      "processId": 1
    },
    {
      "order": 2,
      "title": "Title of step",
      "description": "Description of step",
      "processId": 1
    }
  ]
}
```

**Response (Error):**

```json
{
  "error": "Error message"
}
```

### Step Update

**Endpoint:** `/api/update-step/:processId/:order`
**Method:** PUT
**Description:** Update an existing step.

**Request:**

```json
{
  "title": "Updated Title",
  "description": "Updated Description"
}
```

**Response (Success):**

```json
{
  "id": 1,
  "processId": 1,
  "title": "Updated Title",
  "description": "Updated Description",
  "order": 1
}
```

**Response (Error):**

```json
{
  "error": "Error message"
}
```

### Bulk Upload of all the steps linked to a processId

**Endpoint:** `/api/save-all-steps`
**Method:** GET
**Description:** Retrieve process details by ID.
**Request:**

```json
{
  "steps": [
    {
      "processId": 1,
      "order": 1,
      "title": "hey 1",
      "description": "hey 1"
    },
    {
      "processId": 1,
      "order": 2,
      "title": "hey 2",
      "description": "hey 2"
    }
  ]
}
```

**Response (Success):**

```json
{
  "message": "Steps saved successfully"
}
```

**Response (Error):**

```json
{
  "error": "Error message"
}
```

### Health Check

**Endpoint:** `/healthcheck`
**Method:** GET
**Description:** Check the health status of the server.

**Response (Success):** `"I'm healthy!"`

**Response (Error):** `"Unable to connect to server"`

## Testing

Start the node server and one by one use the above endpoints and the localhost url to test the apis in postman.

## Known Issues

- Now the openAI api is giving response slow, so have to optimise it.

## Deployment

Used Render to deloy my server, here is the link

```bash
  https://ai-process-builder.onrender.com
```
