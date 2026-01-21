Part 1: Data Model

Each task has an id to uniquely identify it, a title to describe the task, a status to track its progress, and a createdAt timestamp.

The status is limited to TODO, IN_PROGRESS, and DONE to avoid invalid states and to keep task flow simple and consistent.

Part 2: Backend APIs

The backend provides APIs to create a task, fetch all tasks, and update a task’s status.

Input data is validated on the backend. If invalid or missing data is sent, the API returns a 400 error. Valid requests return 200, ensuring clear and predictable behavior.

Part 3: UI

The UI includes a task creation form, a task list, and buttons to update task status.

The frontend fetches data from the backend and stores it in state. Any change in state automatically updates the UI. Components are used to keep the code modular and easy to maintain.

Part 4: Business Logic

A task cannot move directly from TODO to DONE.

This rule is enforced in the backend to prevent invalid updates, and the frontend only allows valid status transitions to improve user experience.

Part 5: AI Usage

AI tools were used to help structure the APIs, write initial code, and think through edge cases.
This improved understanding of backend validation and saved around 30–40% development time.
All generated code was reviewed and refined manually.
