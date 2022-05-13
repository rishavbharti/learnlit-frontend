<img src="https://learnlit.tech/assets/learnlit.svg" style="height: 50px; width: 150px; object-fit: contain;" />

<br />

**learnlit** - an online learning and teaching marketplace.

## Frontend project for learnlit

This project is built using Next.js as the core library and various other libraries including redux-toolkit, material-ui, tailwindcss, etc.
Includes features for course creation and management, and course preview, enrollment, and learning.

The base branch for this project is maintained in `main`.

## Project Setup

- Install git and setup git config.
- Clone the repo to your working directory.
- Install VSCode editor.
- Make sure Node.JS version 14LTS or later is installed.
- Run `npm i` in the project root to install dependencies.

## Environment variables setup

The project requires some environment variables to work after the setup. Follow the steps below to supply the necessary environment variables.

Create a **.env.local** file in the project root and add the following envs to it.

<br />

**1. NEXT_PUBLIC_API_ENDPOINT**

`The backend api endpoint of learnlit. This api endpoint will be used to fetch all the data regarding courses, user etc.`

## Running the project

After finishing the setup, run `npm run dev` to start the development server and visit `http://localhost:3000` to view app running in your browser.
Any changes made to the app will reflect in the browser.

<br />
<hr />
<br />

### Application Overview

## 1. Tech Stack

<h4>This project is built using Next.js. This section gives an overview of all the important libraries used for the development.</h4>

- **NextJS**:

  Next.js is an open-source web development framework built on top of Node.js enabling React based web applications functionalities.
  It gives you building blocks to create fast web applications. Next.js handles the tooling and configuration needed for React, and provides additional structure, features, and optimizations for your application.

#####

- **Material UI**

  This project uses Material UI (MUI) as the base for its component library. Most components such as inputs, buttons, radio, select etc., are built by extending the material ui compoennts.

#####

- **Tailwind CSS**

  This project uses utility class based css library tailwind for all styles customizations. All the tailwind custom config can be found in tailwind.config.js.

#####

- **Redux, Redux Toolkit**:

  Redux provides a centralized data store for storing all the data in the app.

  The project uses redux-toolkit, which is an opinionated redux starter, that comes with many redux utilites and enables handling redux store following best practices, including but not limited to immutable data structures for store.

#####

- **axios**

  APIs for this project are RESTful. axios is used as the client to handle all network requests.

#####

- **Disqus**

  Disqus is an add-on tool for comments and discussion. This project uses disqus for user engagement on the course preview page.

## 2. Techninical overview

learnlit consists of a module for instructors to create and manage courses, and manage profile of various other instructors part of their team.
It also consists of pages for learners to preview, wishlist or add to cart courses, and pursue courses.

  <br />

### Pages
The app is divided into multiple pages, which are routes for different features in the application.
  - `app.js`: is the entry point to the application.
  - `index.js` (`/`): loads the home page.

  Here are some of the important pages. 
  Other pages can be found under `page` directory of the application.

### /home

The home page lists some of the most popular courses across multiple sections available on this platform.
For an authenticated user, it lists courses belonging to the topics the user is interested in.
For an unauthenticated user, it lists some of the popular categories of courses.

<br />

### /course/[course-slug]

This is the course preview page. It lists details of a course, its curriculum. It also has CTAs for wishlist, enrollment or learning if the user is already enrolled in.

This page also has a disqus thread embedded for discussions or reviews about the respective course.

`course-slug` is a unique identifier like id (but human-readable) generated for each course while creation.

<br />

- **/course/[course-slug]/learn**

  This is the course learning page, accessible to only those enrolled in the course.

  <br />

### /courses/[category]/[sub-category]

This page lists courses based on either the category or sub-category, present in the url.

<br />

### /courses/search

This page lists the available courses for a search query.

<br />

### /wishlist

This page lists all the courses that the authenticated user has wishlisted.

<br />

### /cart

This page lists all the courses that the authenticated user has added to their cart for enrolling.

<br />

### /my-courses

This page lists all the courses that the authenticated user has enrolled in.

<br />

### /instructor

This page has is accessible only for those authenticated users having the role if `instructor`.

  - **/courses**

    This page list all the courses created by the instructor.

    - **/courses/manage/[id]**

      This page features various forms for managing course content and its details, inluding but not limited to managing curriculum.

<br />

 - **/team**

    This page lists profiles of all the instructors who're part of the instructor's team.

    - **/team/add**

      This page features a form for creating profile of team members of the instructor.

<br />

## 3. Authentication flow

The authentication in this project works based on JWT auth. Every authentication request provides in response a moderately lived `token`.

This bearer token is stored in a `local storage` and `redux` store, and is send in the Authorization header when making requests to APIs.


## 4. Authorization

The `withAuth` higher-order component checks if the user is authorized to access the current route. If either the role or course access prevents the logged in user from accesing the route, the user is redirected to home page. If the user is not logged in, then the user is redirected to `/login` route.
