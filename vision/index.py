import json

STATE_FILE = './state-file.json'

def createPlayer(hero, ultCharge, isAlive, health, username):
    out = {}
    out['hero'] = hero
    out['ultCharge'] = ultCharge
    out['isAlive'] = isAlive
    out['health'] = health
    out['username'] = username
    return out

def createInputState(winner, homeTeam, awayTeam, homePlayers, awayPlayers):
    out = {}
    if winner == "HOME" or winner == "AWAY":
        out['winner'] = winner
    else:
        out['winner'] = ''
    out['home'] = {}
    out['away'] = {}

    #set teams
    out['home']['team'] = homeTeam
    out['away']['team'] = awayTeam

    #init player arrays
    out['home']['players'] = homePlayers
    out['away']['players'] = awayPlayers

    return out

def writeStateToFile(state, file):
    with open(file, 'w') as outfile:
        json.dump(state, outfile)

players = [
    createPlayer("ANA", 80, False, 100, "playerWan"),
    createPlayer("ANA", 80, True, 100, "player1"),
    createPlayer("ANA", 80, False, 100, "player1"),
    createPlayer("ANA", 80, False, 100, "player1"),
    createPlayer("ANA", 80, False, 100, "player1"),
    createPlayer("ANA", 80, False, 100, "player1"),
    createPlayer("ANA", 80, False, 100, "player1"),
    createPlayer("ANA", 80, False, 100, "player1"),
    createPlayer("ANA", 80, False, 100, "player1"),
    createPlayer("ANA", 80, False, 100, "player1"),
    createPlayer("ANA", 80, False, 100, "player1"),
    createPlayer("ANA", 80, False, 100, "player1"),
]

out_state = createInputState("", "SPARK", "JUSTICE", players[:6], players[6:])

writeStateToFile(out_state, STATE_FILE)

