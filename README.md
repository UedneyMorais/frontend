Frontend
This project was generated using Angular CLI version 20.0.1.

System Overview
This is the frontend of a Task Management system built with Angular (Standalone Components and SSR). It communicates with a NestJS backend to perform CRUD (Create, Read, Update, Delete) operations on tasks. The main goal is to provide a responsive and efficient user interface for managing study lists or any type of task.

System Architecture
The application is divided into two main parts:

Frontend (Angular): Developed with Angular (Standalone Components and SSR) for a modern and SEO-optimized user experience. It consumes the RESTful API provided by the NestJS backend.

Backend (NestJS): A robust API built with NestJS, responsible for business logic, database interaction (TypeORM with PostgreSQL), and data validation.

Communication between the frontend and backend occurs via HTTP requests (GET, POST, PATCH, DELETE) to the task API endpoints.

Backend (NestJS API)
The system's backend is a NestJS API that manages tasks. It exposes the following main endpoints for CRUD operations:

Base URL: http://localhost:3000/tasks (adjust the port if your backend is running on another)

GET /tasks: Lists all tasks.

GET /tasks/:id: Retrieves a specific task by ID.

POST /tasks: Creates a new task.

PATCH /tasks/:id: Updates an existing task by ID.

DELETE /tasks/:id: Deletes a task by ID.

Ensure that the NestJS backend server is running for the frontend to communicate with it.

Development Server
To start a local development server, run:

ng serve

Once the server is running, open your browser and navigate to http://localhost:4200/. The application will automatically reload whenever you modify any of the source files.

Code Scaffolding
Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

ng generate component component-name

For a complete list of available schematics (such as components, directives, or pipes), run:

ng generate --help

Building
To build the project, run:

ng build

This will compile your project and store the build artifacts in the dist/ directory. By default, the production build optimizes your application for performance and speed.

Running Unit Tests
To execute unit tests with the Karma test runner, use the following command:

ng test

Running End-to-End Tests
For end-to-end (e2e) testing, run:

ng e2e

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

Additional Resources
For more information on using the Angular CLI, including detailed command references, visit the Angular CLI Overview and Command Reference page.
