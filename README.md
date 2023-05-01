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

### Flask server
Go into the "server" directory, there is a "requirements.txt" file with the necessary pip requirements. 

`pip3 install -r requirements.txt`

It is recommended to run the server and install the dependencies inside a Python virtual environment (my personal preference is [venv](https://docs.python.org/3/library/venv.html)).

After installing the dependencies (if using a virtual environment, make sure it's active), run the server in the "app" subfolder, the app is contained in the "app.py" file.

`python3 app/app.py`

The backend server is now running.
