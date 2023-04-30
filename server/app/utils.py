import requests
import json
from datetime import datetime, timedelta, timezone

'''Utility function to call the endpoints and create the response.'''
def get_reviews(id: str, page: str) -> dict:
    reviews = []
    next_page = True
    response = call_rss_feed(id, page)

    if response.status_code != 200:
        return []

    data = response.json()["feed"]["entry"]

    for review in data:
        review_date = review["updated"]["label"]
        if not check_date(review_date):
            next_page = False
            break

        reviews.append(format_values(review))

    if next_page:
        next_response = call_rss_feed(id, str(int(page) + 1))
        if next_response.status_code != 200:
            next_page = False

    # state_file = open("./store/state.json")
    # state_data = json.load(state_file)
    # state_file.close()
    # state_data[id] = reviews
    # state_file = open("./store/state.json", "w")
    # json.dump(state_data, state_file)
    # state_file.close()

    return {"reviews": reviews, "nextPage": next_page}

def call_rss_feed(id: str, page: int) -> dict:
    response = requests.get("https://itunes.apple.com/us/rss/customerreviews/id=" 
                            + id + "/sortBy=mostRecent/page=" + str(page) + "/json")

    return response

# Create a simpler json object to be processed by the UI
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

# Formats the date to look nice.
def format_date(date: str) -> str:
    return date.split("T")[0] + " " + date.split("T")[1].split("-")[0] + " MT Time"

# Checks that the date is 24 hours or less ago
def check_date(review_date: str) -> str:
    date = datetime.fromisoformat(review_date).astimezone(timezone.utc)
    yesterday = datetime.now(timezone.utc) - timedelta(hours=48)

    if date < yesterday:
        return False

    return True
    