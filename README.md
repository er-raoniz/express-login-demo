# express-login-demo

## Overview

A JavaScript based Node - Express - MySQL app, with following functionalities:

* **Registration** - Register a user with First Name, Last Name, Email ID, Password, a unique employeeID and Organization Name.
* **Login** - The user must use their Email ID and Password to login.
* **UserList** - Get all list of users with following criteria:
    - Search using First Name, Last Name and employeeID
    - Sort data by First Name, Last Name, Email ID, employeeID and Organization Name
    - Add pagination to your API to filter the records

## Assumptions

* A user can use atmost one email, different emails are to be treated as different users.
* Employee IDs are unique across multiple organisations (a user can be registered with multiple Employee IDs within/across organisations).
* Response can be sorted with atmost one parameter at a time.

## Folder structure

<pre>
express-login-demo
  ├ bin
  | └ www
  ├ config
  | └ config.js
  ├ controllers
  | ├ loginController.js
  | ├ registerController.js
  | └ userListController.js
  ├ middlewares
  | ├ authenticator.js
  | └ validator.js
  ├ routes
  | ├ index.js
  | └ user.js
  ├ services
  | └ mysqlService.js
  ├ utils
  | ├ common.js
  | └ jwt.js
  ├ .gitignore
  ├ app.js
  ├ package-lock.json
  ├ package.json
  └ README.md
</pre>

## Database Schema

* user
  * email_id (Primary Key)
  * first_name
  * last_name
  * pwd_hash
  * timestamp
* employee
  * emp_id (Primary Key)
  * org_name
  * user_id (Foreign Key - linked to user.email_id)

## API Description and cURLs

### Registration

#### Parameters & Validations

1. email_id - required and valid email
2. password - required and alphanumeric with 8 to 16 characters
3. first_name - required and only alphabets
4. last_name - required and only alphabets
5. emp_id - required and alphanumeric characters
6. org_name - required and only alphabets

#### cURL
```
curl --location --request POST 'express-login-demo.herokuapp.com/user/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email_id": "jocelia.vieira@example.com",
    "password": "soccer12",
    "first_name": "Jocelia",
    "last_name": "Vieira",
    "emp_id": "890",
    "org_name": "whitepanda"
}'
```

### Login


#### Parameters & Validations

1. email_id - required and valid email
2. password - required and alphanumeric with 8 to 16 characters

#### cURL
```
curl --location --request POST 'https://express-login-demo.herokuapp.com/user/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email_id": "jocelia.vieira@example.com",
    "password": "soccer12"
}'
```

### UserList

#### Parameters & Validations

1. first_name - optional and only alphabets
2. last_name - optional and only alphabets
3. emp_id - optional and alphanumeric characters
4. page - optional and only numbers
5. limit - optional and only numbers
6. sort_by - optional and possible values = ('first_name', 'last_name', 'email_id', 'emp_id', 'org_name')
7. order - optional and possible values = ('asc', 'desc')

#### cURL
```
curl --location --request GET 'https://express-login-demo.herokuapp.com/user/list?first_name=a&last_name=a&sort_by=emp_id&emp_id=9&order=desc&limit=1&page=1' \
--header 'Content-Type: application/json' \
--header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZWRfdG8iOiJqb2NlbGlhLnZpZWlyYUBleGFtcGxlLmNvbSIsImlhdCI6MTYyNjAxOTI2NSwiZXhwIjoxNjI2MDIxMDY1fQ.mPmDfO17EOl00X1vc4-cRCv7g3xIAL2Jaf3iminImuA' \
--data-raw '{
    "email_id": "foo@test.com",
    "password": "x1231231"
}'
```

App developed & hosted with :heart: on [Heroku](https://express-login-demo.herokuapp.com)
