# # Please read this file before using the application

# Online Examination System ( OES )

Online Examination System is a web application which will completely revolutionize the online education system. With OES, a school can conduct examinations completely online! During this pandemic, this is a need for schools. What separates OES from other platforms is the ability to create and reuse questions. A teacher can create a question and use it in more than one question paper. He/She can also use it the next year for revision purposes. Same is for question papers, they are extremely easy to create and reuse. On OES, members can have three roles:

Teachers, who can do the following tasks:-

1. Creating Questions (A question will have properties such as question statement, options, correct answer, marks, grade, subject and topic)
2. Creating Question Papers ( A collection of questions. Teachers can use the already created questions in question papers)
3. Activating or Deactivating Question Papers. ( Once activated, a question paper will appear in the exam tab and students will be able to attempt it. If kept deactivated, it will be saved as a draft for future use)

Admins, who can perform all the tasks performable by a teacher and :-

1. Add Users ( An admin can create an account with a specific username and password )

Students, who are able to :-

1. Attempt examinations created by their teachers. ( An exam is an activated question paper )
2. View their results instantly. ( Under the Exam Results Tab )

All members have a unique user ID ( case insensitive ) and a password with which they can login.

# Development related information

This application's frontend is built with React JS ( A javascript framework ). The styles are written in Sass, which is a CSS pre-processor. It is compiled to CSS code.

The backend (API, services and data handling) is written in Express JS. (A javascript framework)

The data is stored in the form of JSON files.

# Setup instructions

To run the application, follow these steps:

1. Install node js from https://nodejs.org/en/
2. Follow the installation guidelines.
3. After installation, open your machine's Command Prompt or Terminal
4. Type the following command :-
   npm install -g serve
5. After installing serve, go into the back-end folder of the project directory. ( In command prompt or terminal )
6. Type the following commands -
   npm install
   after `npm install` is executed, then type the following command -
   node app.js
7. The Back-end server will start
8. To start the front-end, go into the project directory ( In command prompt or terminal ) and then type the following command -
   serve -l 3000 -s build
   ** 9. Once this step is done, locate the file whose name is HomeBackground.png .
   ** 10. Cut that file (image) and paste it inside the build folder of the project.
9. The frontend server will start in your default browser, you can use the application!

# Sample Admin login :-

ID = admin
Password = admin

# Future Plans

Here are the plans we wish to incorporate in the future :-

1. The ability of a teacher to set time for the examination. ( The form will auto close on the specified time)
2. Using MongoDB as our database so as to improve efficiency and to incorporate the ability to delete and update users, questions and question papers.
3. Filter question papers by student's current grade. ( Students of x grade will only be able attempt exams for x grade )

# If there are any errors/problems during installation/execution or in case of any unexpected behaviour, feel free to call +91 777 403 5485

# Thank you and have a nice day.
