import requests
from datetime import datetime, timedelta, timezone

'''Utility function to call the endpoints and create the response.'''
def create_dict(id: str) -> dict:
    reviews = {"1": []}

    # The RSS feed can only go to ten pages, according to this error message:
    # CustomerReviews RSS page depth is limited to 10
    for i in range(1, 11): 
        response = requests.get("https://itunes.apple.com/us/rss/customerreviews/id=" 
                                + id + "/sortBy=mostRecent/page=" + str(i) + "/json")

        if response == "<!-- Empty -->":
            break

        data = response.json()["feed"]["entry"]
        reviews[str(i)] =  []
        
        invalid_date = False

        for review in data:
            review_date = review["updated"]["label"]
            if not check_date(review_date):
                invalid_date = True
                break

            # Add each review to the data response, sorted by page.
            reviews[str(i)].append(format_values(review))
          
        if invalid_date:
            break

    return reviews

# Create a simpler json object to be processed by the UI
def format_values(raw_review: dict):
    formatted_review = {
        "author": raw_review["author"]["name"]["label"],
        "title": raw_review["title"]["label"],
        "content": raw_review["content"]["label"],
        "rating": raw_review["im:rating"]["label"],
        "date": format_date(raw_review["updated"]["label"])
    }

    return formatted_review

# Formats the date to look nice.
def format_date(date: str) -> str:
    return date.split("T")[0] + " " + date.split("T")[1].split("-")[0] 

# Checks that the date is 24 hours or less ago
def check_date(review_date: str) -> str:
    date = datetime.fromisoformat(review_date).replace(tzinfo=None)
    yesterday = datetime.now() - timedelta(hours=48)
    
    if date < yesterday:
        return False

    return True
    