# iOSAppReviewsDigest
React App that brings back the reviews of a given iOS app id.

## Requirements
- Python3
- Yarn

## Specs
The app consists of two main modules, the backend server, written on Python3's Flask, and the UI written using the React framework on vanilla JS. 

## Scope
The app returns the latest reviews from the iOS App Store for a selected app, going as far back as 48 hours before refreshing the data. Hitting the "Refresh Feed" text, switching pages, or switching apps will ensure we're getting the latest data on the frontend.

Refreshing the page, or stopping the frontend service, and restarting it will incurr in no loss of data or state, showing the same selected app, on the same page, and the same data saved in the state file on serverside. However, switching apps or pages will refresh the review data on the backend and the frontend.

Each review card displays the review content, rating, author, date (and MT time) of the review, as well as the review title.

## Running the App

### Flask Server
Go into the "server" directory, there is a "requirements.txt" file with the necessary pip requirements, run the following command: 

`pip3 install -r requirements.txt`

It is recommended to run the server and install the dependencies inside a Python virtual environment (my personal preference is [venv](https://docs.python.org/3/library/venv.html)).

After installing the dependencies (if using a virtual environment, make sure it's active), go the "app" subfolder and run the server, the app is contained in the "app.py" file:

`python3 app.py`

It is necessary to run the "app.py" file from inside the app subfolder due to the file calls to the "state.json" file.

The backend server is now running. If using a virtual environment, make sure you deactivate it after closing the server with the `deactivate` command.

### React UI

Go into the "reviewsdigest" folder, and install the dependencies:

`yarn install`

And run the app:

`yarn start`

Make sure the server in the "config.json" file inside the "config" folder in the frontend project is set to the localhost port your backend server is currently running on (set by default to `http://localhost:5000`).

## Troubleshooting
Windows users might experience a problem when running the Flask server after installing the requirements where the Flask-Cors module is not recognized. Installing flask-cors separately using pip, usually solves this problem.

`pip3 install flask-cors`

