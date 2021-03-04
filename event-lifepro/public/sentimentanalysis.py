import sys
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
def getPolarity(inputString):
    analyzer = SentimentIntensityAnalyzer()
    return analyzer.polarity_scores(inputString)
