# Full stack template - React

<p align="center">
 <img src="./docs/logo.png" width="400">
</p>



Full stack template is a **React/Spring** based template webapp that provides set of functionalities that are necessary for almost any web app. The code and all components were structured so that project is easy to test, maintain and expand.

This is a repository for the frontend part written in React.

The template is running on the following url:  <a href="https://www.full-stack-template.com/" target="_blank">https://www.full-stack-template.com/</a>

Backend can be foun [HERE](https://github.com/Hasatori/fullstack-boilerplate-spring-backend)

## General supported functionalities
### User registration
  * username, email and password. Account has to be activated via email
  * O2 - Github, Google, Facebook
### User login
  * email + password
  * email + password + two-factor code. Two-factor can be set once user is logged in.
  * email + password + recovery code. In case two factor code can not be used.
  * O2 authentication - Github, Google, Facebook
  * O2 authentication + two-factor. Two-factor can be set once user is logged in
### Forgotten password 
   * Password change request is send on email
### Account management
  * profile picture, email, username update. If email is updated the change has to be approved from new email -
    otherwise email will not be updated
  * password change
  * cancel account

## React specific supported functionalities

### Localization
  Localization was implemented using  [react-i18next](https://react.i18next.com/). 
  All localization related stuff are stored under [./src/i18n](./src/i18n). [I18nConfig.ts](./src/i18n/I18nConfig.ts) contains basic configuration. All translations for specific language are then stored in translation.json file that is in the folder named based on given locale. 
  Translations are then loaded using **useTranslation()** hook. 
  For example:
  ```
 const {t, i18n} = useTranslation();
  ....
 <div>t('ns1:aboutAppLabel')}</div>
```
The locale is also used for communication with backed which also supports localization so messages comming from backed will also be translated into correct language.
### Theme support
  * Support for Light and Dark theme

## Configuration

Application can be configured via .env files. There are two configuration files:

* `.env` - configuration for production
* `.env.development` - configuration for **development** environment
