# Fancy Todo

Fancy-Todo-App to handle our todo-list

This app has :

- RESTful endpoint for asset's CRUD operation
- JSON formatted response

&nbsp;

Tech Stack used to build this app :

- Node JS
- Express JS framework
- PostgreSQL

## RESTful endpoints

### POST /todos

> Create todo list

_Request Header_

```json
{
  "Content-Type": "application/json"
}
```

_Request Body_

```json
{
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due date>"
}
```

_Response (201)_

```json
{
  "id": "<given id by system>",
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due date>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z"
}
```

_Response (400)_

```json
{
  "message": "Bad Request: <validation error message>"
}
```

_Response (500)_

```json
{
  "message": "Internal Server Error"
}
```

---

### GET /todos

> Get all todo-list

_Request Header_

```json
{
  "Content-Type": "application/json"
}
```

_Request Body_

```
not needed
```

_Response (200)_

```json
[
  {
    "id": 1,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
  },
  {
    "id": 2,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
  }
]
```

_Response (500)_

```json
{
  "message": "Internal Server Error"
}
```

---

### GET /todos/:id

> Get single todo based on id provided

_Request Header_

```json
{
  "Content-Type": "application/json"
}
```

_Request Body_

```
not needed
```

_Response (200)_

```json
{
  "id": 1,
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due date>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z"
}
```

_Response (404)_

```json
{
  "message": "Data Not Found"
}
```

_Response (500)_

```json
{
  "message": "Internal Server Error"
}
```

---

### PUT /todos/:id

> Update single todo based on id provided

_Request Header_

```json
{
  "Content-Type": "application/json"
}
```

_Request Body_

```json
{
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due date>"
}
```

_Response (200)_

```json
{
  "id": "<given id by system>",
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due date>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z"
}
```

_Response (400)_

```json
{
  "message": "Bad Request: <validation error message>"
}
```

_Response (404)_

```json
{
  "message": "Data Not Found"
}
```

_Response (500)_

```json
{
  "message": "Internal Server Error"
}
```

---

### PATCH /todos/:id

> Update single attribute of todo based on id provided

_Request Header_

```json
{
  "Content-Type": "application/json"
}
```

_Request Body_

```json
{
  "status": "<todo status>"
}
```

_Response (200)_

```json
{
  "id": "<given id by system>",
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due date>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z"
}
```

_Response (400)_

```json
{
  "message": "Bad Request: <validation error message>"
}
```

_Response (404)_

```json
{
  "message": "Data Not Found"
}
```

_Response (500)_

```json
{
  "message": "Internal Server Error"
}
```

---

### DELETE /todos/:id

> Delete single todo based on id provided

_Request Header_

```json
{
  "Content-Type": "application/json"
}
```

_Request Body_

```
not needed
```

_Response (200)_

```json
{
  "message": "todo success to delete"
}
```

_Response (404)_

```json
{
  "message": "Data Not Found"
}
```

_Response (500)_

```json
{
  "message": "Internal Server Error"
}
```

---
