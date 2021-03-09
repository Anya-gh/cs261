from flask import Flask, request
from flask_restful import Resource, Api
from flask import jsonify
from sentimentanalysis import getPolarity 

app = Flask(__name__)
api = Api(app)

class SentimentAnalysis(Resource):
    def get(self, text):
        polarity = getPolarity(text)
        return jsonify(polarity)

class HomeRoute(Resource):
    def get(self):
        return "Home"
        
api.add_resource(SentimentAnalysis, '/analysis/<string:text>')
api.add_resource(HomeRoute, '/')

if __name__ == "__main__":
    app.run(debug=True)
