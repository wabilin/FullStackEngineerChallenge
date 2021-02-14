# About

## Requirement
- Node.js 15
- Yarn

## Setup
```
yarn
yarn build
yarn start
```
And visit http://localhost:3000

### Login Info
Admin user
- username: `ChosenOne`
- password: `adminPassword`

Normal user
- Can be created by admin

## Design

### Database
#### User
- Roles: Admin and normal employees.
- Has many feedbackRequests.
- Has many reviews.
- Password encrypted.

#### Review
- Belongs to user.
- Has many feedbackRequests.
- Has many feedback.

#### Feedback
- Belongs to user.
- Belongs to review.

### APIs
RESTful, built with Next.js.

## Techs
### Next.js
Want to have a try.
And it also provide basic functions and components for both frontend and backend.
Since no SEO requirements, it only do client side rendering.

### Prisma
ORM, easy migration, and clear schema.

### SQLite
Performance is not very important in this project. Easy setup.

## Assumptions
- Data amount is quite few. (No pagination)
- An Employee can not be deleted after his/her review or feedbacks created
- An Employee can feedback to a review only once.
- An employee can be reviewed many times.
- Auth is simplified. It's not really secure.
- Only support latest FireFox, Edge and Chrome on Desktop.

## Features
### Admin view
* Add/remove/view employees
* Add/update/view performance reviews
* Assign employees to participate in another employee's performance review

### Employee view
* List of performance reviews requiring feedback
* Submit feedback
