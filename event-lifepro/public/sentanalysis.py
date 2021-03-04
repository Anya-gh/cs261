import sys
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk.tokenize import word_tokenize
def getPolarity(inputList):
    input = ' '.join(sys.argv[2:])
    output = analyzer.polarity_scores(input)
    return output

def getPositiveWordList(inputList):
    input = ' '.join(sys.argv[2:])
    tokenizedInput = nltk.word_tokenize(input)
    positiveWordList = []
    for word in tokenizedInput:
        if analyzer.polarity_scores(word)['compound'] > 0.1:
            postiveWordList.append(word)

    for x in positiveWordList:
        print(x)


def getNegativeWordList(inputList):
    input = ' '.join(sys.argv[2:])
    tokenizedInput = nltk.word_tokenize(input)
    negativeWordList = []
    for word in tokenizedInput:
        if analyzer.polarity_scores(word)['compound'] < -0.1:
            negativeWordList.append(word)

    for x in negativeWordList:
        print(x)



analyzer = SentimentIntensityAnalyzer()
if sys.argv[1] == "1":
    print(getPolarity(sys.argv))
elif sys.argv[1] == "2":
    getPositiveWordList(sys.argv)
elif sys.argv[1] == "3":
    getNegativeWordList(sys.argv)
