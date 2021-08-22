# Fullstack boilerplate react frontend

This is a template react frontend web fullstack app.

It provides basic functionalities that are necessary for any app such as (detail description can be found here):

* **User registration**
  * username, email and password. Account has to be activated via email
  * O2 - Github, Google, Facebook
* **User login**
  * email + password
  * email + password + two-factor code. Two-factor can be set once user is logged in.
  * email + password + recovery code. In case two factor code can not be used.
  * O2 authentication - Github, Google, Facebook
  * O2 authentication + two-factor. Two-factor can be set once user is logged in
* **Forgotten password** - Password change request is send on email
* **Account management**
  * profile picture, email, username update. If email is updated the change has to be approved from new email -
    otherwise email will not be updated
  * password change
  * cancel account
* **i18n support**

Backend template repository:
* [Spring Boot](https://github.com/Hasatori/fullstack-boilerplate-spring-backend) - REST api

## Configuration

Application can be configured via .env files. There are two configuration files:

* `.env` - configuration for production
* `.env.development` - configuration for **development** environment
