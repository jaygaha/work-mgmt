# Angular Laravel App

Simple Dashboard Admin App built using Angular CLI 8, Bootstrap 4.1.1 and Laravel 5.8.

Main motive to build this project is to handle 'arubaito' (part time) work and payment in Japan. While living and working as depentend in Japan, it was difficult for me to track my work and payment as working hour differs daily.

## Components
### 1. Haken
Haken is the Japanese term for temporary employees dispatched to companies by staffing agencies.

### 2. Company
Company is a place where people works. Companies can be salad, meat processing, restaurant, bread, soy souce etc.

### 3. Job
Company make a contract with haken to offer a job spicifying payment per hour and over time payment.

### 4. Employee
Employees are the arubaito (part time) workers.

### 5. Recruit
Under this employee is tied with a job and there every work log and payments are logged. Under this component there are two sub-components.

##### 1) Work Log
Every work's entry time and out in the particular recruitment are logged here. So we can track how much work hours have been worked including basic and overtime hours.
##### 2) Payment
This gives us the total days worked in the particular date and hours worked. Total amount earned in the particular month.

## Installation

**Note** that this seed project requires **node >=v8.9.0 and npm >=4**.

In order to start the project use:

```bash
$ git clone https://github.com/jaygaha/work-mgmt.git
```
For frontend
```bash
$ cd frontend
# install the project's dependencies
$ npm install
# watches your files and uses livereload by default run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
$ ng serve
```
For backend
```bash
$ cd backend
#install the project's dependencies
$ composer install
$ php artisan key:generate
$ php artisan migrate --seed
$ php artisan passport:install
$ php artisan serve
```

### TODO
* Delete feature
* Night work hours and payment calculation
* Admin information edit

### Security Vulnerabilities
If you discover a security vulnerability within this system, please send an e-mail to jaygaha@gmail.com. All security vulnerabilities will be promptly addressed.