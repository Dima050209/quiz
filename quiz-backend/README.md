# API Routes Documentation

## Authentication

### `POST /api/auth/login`
- Authenticates a user.
- **Body:** `{ email, password }`
- **Response:** JWT token.

### `GET /api/auth/refresh`
- Returns new access token.
- **Response:** JWT token.


---

## User

### `GET /api/user`
- Returns current user.
- **Response:** User object.

### `GET /api/user/:userId`
- Returns user by id.
- **Response:** User object.

### `POST /api/user/register`
- Registers a new user. Admin only.
- **Response:** User object.

---

## Quizzes

### `GET /api/quizzes`
- Retrieves all quizzes.
- **Response:** Array of quiz objects.

### `POST /api/quizzes`
- Creates a new quiz.
- **Body:** `{ title, description, questions }`
- **Response:** Created quiz object.

### `GET /api/quizzes/:quizId`
- Retrieves a quiz by ID.
- **Response:** Quiz object.

### `PUT /api/quizzes/`
- Updates a quiz by ID.
- **Body:** `{ id, title, description, questions }`
- **Response:** Updated quiz object.

### `DELETE /api/quizzes/:id`
- Archives a quiz by ID.
- **Response:** Success message.

### `GET /api/quizzes/:quizId/questions?page=n`
- Retrieves all quiz questions if page not provided, otherwise returns 5 questions.
- **Response:** Page number, array of question objects.

---

## Questions

### `GET /api/questions/:id`
- Retrieves a question by ID.
- **Response:** Question object.

### `GET /api/questions/task/:questionId`
- Retrieves a question task wothout answer by ID.
- **Response:** Question object without correct_options.

### `PUT /api/questions/`
- Updates a question.
- **Body:** `{ id, question_text, options, correct_options }`
- **Response:** Updated question object.

### `DELETE /api/questions/:id`
- Deletes a question.
- **Response:** Success message.

---

## Answers

### `POST /api/answers`
- Submits an answer to a question.
- **Body:** `{ quizId, questionId, selectedOption }`
- **Response:** Result object (correct/incorrect).

---

## Users

### `GET /api/users/:id`
- Retrieves user profile.
- **Response:** User object.

### `PUT /api/users/:id`
- Updates user profile.
- **Body:** `{ username, email }`
- **Response:** Updated user object.

---

## Results

### `GET /api/results/:userId`
- Retrieves quiz results for a user.
- **Response:** Array of result objects.

---

> **Note:** All routes may require authentication via JWT in the `Authorization` header.