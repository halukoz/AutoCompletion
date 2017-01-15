# AutoCompletion Project

This project provides search boxes with autoCompletion property. For example, If you start typing as "ge", this search box show suggestions such as Germany, Argentina because names of the countries contain "ge".
* To see the web site https://halukoz.github.io/autoCompletion/

For this implementation, I used two different type of data
* Dummy data: I added names of some countries (not all countries) as dummy data.
* Live data: I receive live data from Google API and find your address and some addresses which are near you. (To use this functionality, when you open the url, you will see a pop up and please "click share location")

## Technologies
* Frontend: HTML-5, CSS-3, AngularJS, Javascript
* Unit Test: Karma, Jasmine. (tests with Crome and Mozilla)

## How to install
* Clone the project from this github page
* Find index.html under this project folder
* Open the file with a browser
* To use google API, please click share location.

## How to install and test with Karma
* Firstly you should install Npm
* Then, you can install Karma with the command: npm install karma --save-dev
* You can install chrome launcher with the command: npm install karma-chrome-launcher --save-dev
* You can install firefox launcher with the command: npm install karma-firefox-launcher --save-dev
* Then, you should install jasmine, you can install with the command: npm install karma jasmine --save-dev
* Then, you can go to tests folder and run the command: karma start
* Finally, You will see the result of the tests. (Note: chrome and firefox browsers will be opened automatically)
