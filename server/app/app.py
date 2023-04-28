import requests
from utils import create_dict
from flask import Flask, request
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

'''Flask Backend'''
class AppReviews(Resource):
    def get(self):
        # 284882215 for facebook
        # 835599320 for tiktok
        app_id = request.args.get('app_id')
        # Utility function to call the necessary endpoints.
        response = create_dict(app_id)

        return response

api.add_resource(AppReviews, '/appReviews')

if __name__ == '__main__':
    app.run(debug=True)
    