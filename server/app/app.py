import json
from utils import get_reviews
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app)

'''Flask Backend'''
class AppReviews(Resource):
    def get(self):
        # 284882215 for facebook
        # 835599320 for tiktok
        app_id = request.args.get('app_id')
        page = request.args.get('page')
        # Utility function to call the necessary endpoints.
        response = get_reviews(app_id, page)

        return response

class AppState(Resource):
    def get(self):
        state_file = open("./store/state.json")
        response = json.load(state_file)
        state_file.close()

        return response      

api.add_resource(AppReviews, '/appReviews')
api.add_resource(AppState, '/appState')

if __name__ == '__main__':
    app.run(debug=True)
    