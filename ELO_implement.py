from flask import Flask
import random, numpy, math


app = Flask(__name__)

def K_function(num_comparisons):
    return math.pow(math.e, (-num_comparisons/24) + 4.8) + 10


# Function to calculate the Probability 

def Probability(rating1, rating2): 
    return 1.0 * 1.0 / (1 + 1.0 * math.pow(10, 1.0 * (rating1 - rating2) / 360)) 
  
# Function to calculate Elo rating 
# d is the outcome (Win = 1, Lose = 2, draw = 3)
#@app.route('/calc_change/<float: Ra>/<float: Rb>/<int: numCompA>/<int: numCompB>/<int: d>', methods = ['GET', 'POST'])
@app.route('/calc_change/<Ra>/<Rb>/<numCompA>/<numCompB>/<d>', methods = ['GET', 'POST'])
def EloRating(Ra, Rb, numCompA, numCompB, d):
    Ra = float(Ra)
    Rb = float(Rb)
    numCompA = int(numCompA)
    numCompB = int(numCompB)
    d = int(d)
    
    # Getting the Winning Probability of Player B
    Pb = Probability(Ra, Rb) 
  
    # Getting the Winning Probability of Player A 
    Pa = Probability(Rb, Ra) 
  
    #Getting K values based on number of comparisons
    Ka = K_function(numCompA)
    Kb = K_function(numCompB)
    
    # Case -1 When Player A wins 
    # Updating the Elo Ratings 
    if (d == 1) : 
        Ra = Ra + Ka * (1 - Pa) 
        Rb = Rb + Kb * (0 - Pb) 
      
  
    # Case -2 When Player B wins 
    # Updating the Elo Ratings 
    elif(d==2): 
        Ra = Ra + Ka * (0 - Pa) 
        Rb = Rb + Kb * (1 - Pb) 
    
    elif(d==3):
        Ra = Ra + Ka * (0.5 - Pa) 
        Rb = Rb + Kb * (0.5 - Pb) 
    
    else:
        raise Exception
        #invalid input
    
    #print("Pa, pb", Pa, Pb)
    #print("Updated Ratings:-") 
    #print("Ra =", round(Ra, 6)," Rb =", round(Rb, 6)) 
  
    ans = str(Ra) + ', ' + str(Rb)
    return ans

    
"""
def test(First, Actual, numComp = 0, iters = 1000):
    opponent_list = numpy.random.normal(loc = 1500.0, scale = 360, size = iters)
    
    for i in range(iters):
        opp = opponent_list[i]
        #print("My rating:", First)
        #print("Opp rating:", opp)
        
        outcomes = [1,2]
        winProb = Probability(opp, Actual)
        weights = [winProb, 1-winProb]
        result = random.choices(outcomes, weights)
        """
        
"""if (result[0] == 1):
            #print("Won against ", opp)
        else:
            pass
            #print("Lost against ", opp)"""

"""
        First, opponent_list[i] = EloRating(First, opp, numComp, random.randint(0,10000), result[0])
        numComp += 1
    print(First)
    return First

def mult_test(First, Actual, iter = 100):
    res = []
    for i in range(iter):
        res.append(test(First, Actual))
    print("Average:", numpy.average(res))"""
    
    
if __name__ == '__main__':
    app.run(debug = True)
    app.run(host = '0.0.0.0', port = 5000)
    
    