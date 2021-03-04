<<<<<<< HEAD:event-lifepro/public/sentanalysis.py
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
=======
import sys
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk.tokenize import word_tokenize
def getPolarity(inputList):
    input = ' '.join(sys.argv[2:])
    output = analyzer.polarity_scores(input)
    return output
#
#
#
#to be added - takes string input, space separated
def getPolarity(inputString):
    analyzer = SentimentIntensityAnalyzer()
    return analyzer.polarity_scores(inputString)
#just this
#
#
#



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
>>>>>>> 4978a18fae974059ea37f92716f29e6d4d2a0b70:event-lifepro/public/sentimentanalysisTEST.py
