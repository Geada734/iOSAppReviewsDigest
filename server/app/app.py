'''Flask Backend for the iOS Reviews Digest app'''
import json
from flask_cors import CORS
from utils import get_reviews
from flask import Flask, request
from flask_restful import Resource, Api

app = Flask(__name__)
CORS(app)
api = Api(app)

'''Reviews Endpoints'''
class AppReviews(Resource):
    '''
    Endpoint to get all the reviews for a given app
    on a given page.
    '''
    def get(self):
        app_id = request.args.get('app_id')
        page = request.args.get('page')
        # Utility function to call the RSS feed endpoint
        # and save the app's state.
        response = get_reviews(app_id, page)

        return response

'''App State's Endpoints'''
class AppState(Resource):
    '''
    Gets the current app's state based on the last 
    backend call.
    '''
    def get(self):
        # Retrieves the app's state from the json file
        # in the 'store' folder.
        state_file = open("./store/state.json", "r")
        response = json.load(state_file)
        state_file.close()

        return response

api.add_resource(AppReviews, '/appReviews')
api.add_resource(AppState, '/appState')

if __name__ == '__main__':
    app.run()
    