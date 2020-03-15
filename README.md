This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Required Functionality

* Entries from SKUNinja-sample-logs are displayed in a table
* Row color is determined by type: 1-green, 2-yellow, 3-red
* Clicking on an event causes a popup to appear with the body of the event displayed. Note: if the event does not have a body the message "This log message doesn't have a body." is displayed instead.
* Bootstrap is used for the layout/colors

## Extra Functionality

* Can filter rows by date, time, subject text, and log type. Date and time can be used independently of each other.
* Clicking on table column headers sorts table by that column from DESC to ASC or vice versa. Example: clicking on "Subject" sorts from Z to A, clicking it again sorts from A-Z, and so on.
* Can export filtered table in JSON format.
* Can export filtered table in CSV format
* Page is mobile responsive.
* added a test warning message to the json file
* added some basic tests to App.test.tsx