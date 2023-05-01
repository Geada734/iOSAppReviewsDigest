'''Utility functions for the server app.'''
import requests
import json
from datetime import datetime, timedelta, timezone

'''
Calls the endpoints and create the response,
and update the state.json file.
'''
def get_reviews(id: str, page: str) -> dict:
    reviews = []
    # This variable will be returned to indicate to the UI
    # that there's nothing in the subsequent page.
    next_page = True
    response = call_rss_feed(id, page)

    # An empty page brings back either a 400 error
    # (when the page number is more than 10) or a 500 error
    # (when there is no data in the current page.)
    if response.status_code != 200:
        # Return an empty array on an empty or errored
        # response.
        return []

    data = response.json()["feed"]["entry"]

    for review in data:
        # Checks the date before appending a review to the response.
        review_date = review["updated"]["label"]
        if not check_date(review_date):
            # If it is older, there is no next page as the reviews are sorted
            # by most recent.
            next_page = False
            # Stop appending reviews.
            break

        reviews.append(format_values(review))

    # In case all of the reviews in the current page are within 48 hours ago.
    if next_page:
        # Calls the next page.
        next_response = call_rss_feed(id, str(int(page) + 1))
        if next_response.status_code != 200:
            # If it's empty, the UI is let know that there's nothing in the
            # next page.
            next_page = False

    # Save all values in the state.json pertaining to the state the app was in
    # when calling the endpoint.
    state_file = open("./store/state.json", "r")
    state_data = json.load(state_file)
    state_file.close()
    state_data["data"] = reviews
    state_data["page"] = int(page)
    state_data["appId"] = id
    state_data["nextPage"] = next_page
    state_file = open("./store/state.json", "w")
    json.dump(state_data, state_file)
    state_file.close()

    return {"reviews": reviews, "nextPage": next_page}

'''Calls the RSS Feed endpoint.'''
def call_rss_feed(id: str, page: int) -> dict:
    response = requests.get("https://itunes.apple.com/us/rss/customerreviews/id=" 
                            + id + "/sortBy=mostRecent/page=" + str(page) + "/json")

    return response

''' Creates a simpler json object to be processed by the UI'''
def format_values(raw_review: dict):
    formatted_review = {
        "author": raw_review["author"]["name"]["label"],
        "title": raw_review["title"]["label"],
        "content": raw_review["content"]["label"],
        "rating": raw_review["im:rating"]["label"],
        "date": format_date(raw_review["updated"]["label"]),
        "id": raw_review["id"]["label"]
    }

    return formatted_review

'''Formats the date to look nicer.'''
def format_date(date: str) -> str:
    # By the -7:00 suffix I assume these reviews are all in MT Time,
    # so I'm adding the 'MT Time' suffix to all of them.
    return date.split("T")[0] + " " + date.split("T")[1].split("-")[0] + " MT Time"

'''
Checks that the date is 48 hours or less ago, as per a change
in the scope of the assignment.
'''
def check_date(review_date_string: str) -> str:
    # Turning the review date to UTC.
    review_date = datetime.fromisoformat(review_date_string).astimezone(timezone.utc)
    # Getting 48 hours ago in utc time.
    two_days_ago = datetime.now(timezone.utc) - timedelta(hours=48)

    # Comparing both dates.
    if review_date < two_days_ago:
        return False

    return True
    