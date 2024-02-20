
# Full-Stack Exercise: React and Express Integration

## Objective
Build a full-stack application using React for the frontend and Express for the backend. This exercise focuses on creating, reading, updating, and deleting (CRUD) a specific resource via a RESTful API and interfacing with this API using a React application.

## Backend: Resource Specification

### Resource: Task
- **Fields:**
  - `id` (number): Unique identifier for the task.
  - `title` (string): Title of the task.
  - `description` (string): A brief description of the task.
  - `status` (string): Current status of the task (e.g., "pending", "completed").

### API Endpoints
- **GET `/tasks`**: Retrieves a list of all tasks.
- **POST `/tasks`**: Creates a new task. Expects `title`, `description`, and `status` in the request body.
- **GET `/tasks/:id`**: Retrieves a single task by its `id`.
- **PUT `/tasks/:id`**: Updates the task identified by `id`. Can update `title`, `description`, and/or `status`.
- **DELETE `/tasks/:id`**: Deletes the task identified by `id`.

## Frontend: UI Components

### List Component (`TaskList`)
- Displays all tasks in a list or table format.
- Each list item should have buttons or links to view its details, edit it, or delete it.

### Single Display Component (`TaskDetails`)
- Shows detailed information about a single task.
- Should be displayed when a user clicks to view more details about a task from the `TaskList`.

### Form Component (`TaskForm`)
- Used for both creating a new task and editing an existing one.
- Should include form fields for `title`, `description`, and `status`.
- Determine whether it's in "edit" mode or "create" mode based on the presence of an existing task `id`.

## Setup Instructions

### Forking and Cloning
- Fork the provided repository to create a copy in your GitHub account.
- Clone your fork to your local machine for development.

### Backend Setup
- Inside the `backend` directory, initialize your project and install necessary packages (`express`, etc.).
- Implement the specified API endpoints, ensuring data is stored and managed in memory.

### Frontend Setup
- Use `create-react-app` in the `frontend` directory to bootstrap your React application.
- Develop the specified UI components, ensuring they interact with the backend API to perform CRUD operations.

## Testing and Submission

### Local Testing
- Test the backend independently using tools like Postman.
- Test the frontend by running the React development server and interacting with the UI.

### Submission Guidelines
- Push your completed project to your forked repository on GitHub.
- Submit a pull request to the original repository for review, including any setup and run instructions in your PR description.

## Tips for Success
- Ensure proper error handling in both the backend API and frontend components.
- Use state management effectively in your React components to reflect changes in the UI.
- Adhere to RESTful principles in your backend API design for clarity and maintenance.

