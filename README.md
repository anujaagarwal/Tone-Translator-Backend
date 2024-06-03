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
- [Deployment](#deployment)

Certainly! Here's a basic outline for a "Getting Started" documentation for the backend server.

## Getting Started

Welcome to the backend server of my AI Tone Translator application. Two texts will be the input, this system will analyze the tone, sentiment of first text and convert the tone of second text to the analyzed tone. This guide will help you get up and running with the server so that you can start building amazing features.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) installed on your development machine.
- A PostgreSQL database (e.g., [Vercel](https://vercel.com/)) set up and accessible.
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

2. Ensure that your connection with postresql is running.

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

My backend server provides API endpoint for frontend application. Refer to the API documentation for details on available endpoint and it's functionality.

### Testing

You can test using postman

### Conclusion

Congratulations! You've successfully set up backend server. You can now integrate it with your frontend application to build powerful features for AI Tone Translator.

## Domain Modelling

- RequestResponse Entity: This entity would represent a requestresponse table in the system. Attributes which includes id, sampleContent, newDraft, translatedText, sampleTone, sampleSentiment.

Have a look at the diagram below:-

```bash
[RequestResponse] 
|                 
| - id             
| - sampleContent   
| - newDraft 
| - translatedText
| - sampleTone
| - sampleSentiment

```
Reason for storing the data is, in future we can analyze the accuracy level of our system.
In this representation, the bullet points under RequestResponse entity represent attributes of that entity.

- Constraints is that id should be unique always.

## Schema Design

-  RequestResponse Table:-
   This table stores the high-level information about each process.

   - id: Primary Key, unique identifier for each input.
   - sampleContent: Text, content of which tone needs to be ananlyzed.
   - newDraft: Text, content whose tone needs to be changed.
   - translatedText : Text
   - sampleTone: Text, tone of sampleContent
   - sampleSentiment: Text, sentiment of sampleContent
   - createdAt: DateTime, timestamp when the process was created.
   - updatedAt: DateTime, timestamp when the process was last updated.


## Program Design

The program design of the backend of my application, uses Express.js along with controllers, routes, migrations, and models through Sequelize ORM, follows a typical MVC (Model-View-Controller) architectural pattern. Here's a brief description of each component and their roles in my backend design:

1. **Express.js**: Express is a fast and minimalist web framework for Node.js that simplifies the creation of robust and scalable web applications. That was the reason I used express for api development.

2. **Controllers**: Controllers are responsible for handling incoming HTTP requests, processing data, and sending HTTP responses. They act as intermediaries between the routes (endpoints) and the services. 

3. **Routes**: Routes define the available endpoints (URL paths) in my application and map them to specific controller methods. They determine how incoming requests should be handled based on the HTTP method (GET, POST, PUT, DELETE) and the URL.

4. **Services**: Services encapsulate the business logic of my application. They perform operations such as data validation, database interactions, and any other complex tasks required to fulfill a request. Services are typically called by controllers and can interact with models.

5. **Migrations**: Migrations are scripts that define the structure and schema of the database tables. They are used to create, modify, or update database tables and their relationships. Sequelize migrations help keep my database schema in sync with my application's models.

6. **Models**: Models define the data structure and relationships of the application's entities. They serve as an abstraction layer for interacting with the database. Sequelize models provide an object-oriented approach to database operations, allowing to create, read, update, and delete records easily.

The typical flow of a request in my backend application follows these steps:

1. An incoming HTTP request hits a specific route defined in my Express.js application.

2. The route maps the request to the appropriate controller method.

3. The controller method, in turn, call one service to perform business logic and data processing.

4. Services interact with Sequelize models to read from or write to the database.

5. The controller receives the results from the services and constructs an HTTP response.

6. The HTTP response is sent back to the client with the requested data or an appropriate status code.

Overall, this design separates concerns, making my backend code organized, maintainable, and easy to extend as application grows.

## Folder Structure

```bash
├── package.json
├── package-lock.json
├── README.md
├── server.js
|-- vercel.json
|-- .gitignore
|-- config
|   |- config.json
├── controllers
│   ├── TranslateController.js
├── models
|   ├── index.js
|   |-- requestresponse.js
├── migrations
|   ├── create-request-response.js
├── routes
│   ├── TranslateRoutes.js
├── seeders
└── services
    ├── TranslateService.js
```

## Technologies Used

1. **[Vercel](https://vercel.com/):**

- Used for the database.
- Provides a PostgreSQL database.
- Simplifies database management and reduces the need for complex server-side code.
- Deployed through it.

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

- Integrated to generate tone of text and translate a text to the analyzed tone.
- Utilized for AI-powered content generation.

6. **[Postman](https://www.postman.com/):** Used for testing the apis in local

## API Contract

Here is an high level definition of APIs I have used.

### AI Powered API

**Endpoint:** `/translate-tone`
**Method:** POST
**Description:** Analyze the text and translate the text and at the end create a record.

**Request:**

```json
{
    "sample_content": "Hey I just need a weekend to travel to some place near north and spend my night by star gazing",
    "new_draft": "Dear Team, I am pleased to share that our quarterly projections are signaling a robust growth trajectory in our core markets, foreseeing a 14% increase in revenue compared to the previous fiscal year. It is crucial that we develop strategic plans to optimize our resources and fully leverage this promising trend. Best Regards"
}
```

**Response (Success):**

```json
{
    "completion": {
        "sample_tone": "Informal, Personal",
        "sample_sentiment": "Positive",
        "translated_text": "Hey everyone, just wanted to let you know that our future's looking pretty bright! We're predicting about a 14% jump in revenue. We should definitely start thinking about how we can make the most of this. Cheers!"
    }
}
```



## Testing

Start the node server and use the above endpoint and the localhost url to test the api in postman.

## Deployment

Used Vercel to deloy my server, here is the link

```bash
  https://tone-translator-backend.vercel.app/
```
