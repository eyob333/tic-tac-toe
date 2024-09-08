import { useState } from "react"
import Players from "./componets/Players"
import GameBord from "./componets/GameBord"
import Log from "./componets/Log"
import { WINNING_COMBINATIONS } from "./WiningCombination"
import GameOver from "./componets/GameOver"

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2',
}

function deriveActivePlayer(prevTurn){
  let currentplayer='X'

  if (prevTurn.length > 0 && prevTurn[0].player === 'X') {
    currentplayer = 'O'
  };
  return currentplayer
}

function deriveWinner(gameBoard, players){
  let winner = ''
  WINNING_COMBINATIONS.forEach( combination => {
    const firstSquraeSymbol = gameBoard[combination[0].row] [combination[0].column]
    const secondSquraeSymbol = gameBoard[combination[1].row] [combination[1].column]
    const thirdSquraeSymbol = gameBoard[combination[2].row] [combination[2].column]


    if (
      firstSquraeSymbol && 
      firstSquraeSymbol == secondSquraeSymbol && 
      firstSquraeSymbol == thirdSquraeSymbol 
      ){
        winner = players[firstSquraeSymbol]
        }
  })
  return winner
}


function App() {
  const [players, setPlayers] = useState(PLAYERS);

  const [gameTurns, setGameTurns] = useState([]);
  const isActive = deriveActivePlayer(gameTurns);

  let gameBoard = [...INITIAL_GAME_BOARD.map( array => [...array])];
    
  gameTurns.forEach(  turn => {
      const {square, player} = turn
      const {row, col} = square

      gameBoard[row][col] = player
  })

const winner = deriveWinner(gameBoard, players);

let draw = gameTurns.length == 9 && !winner;


function handeleTurn(rowIndex, colIndex){
    setGameTurns(prevTurn => {
      const activePlayer = deriveActivePlayer(prevTurn);
      const updatedTurns = [
        { square: {row: rowIndex, col: colIndex},
          player: activePlayer }, 
        ...prevTurn
      ];
      return updatedTurns
    }
)};

function handeleRestart(){
  setGameTurns([])
};

function handlePlayerName(symbol, newName){

  setPlayers( prevState => {
    return {
      ...prevState,
      [symbol]: newName,
    }
  });
};

  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
      <Players initialName={PLAYERS.X} symbol={'X'} isActive={ isActive === 'X'} onChangeName={handlePlayerName} />
      <Players initialName={PLAYERS.O} symbol={'O'} isActive={ isActive === 'O'} onChangeName={handlePlayerName} />
      </ol>

      { (winner || draw) && <GameOver winner={winner} onSelect={handeleRestart} /> } 
      <GameBord onSelect={handeleTurn}  board={gameBoard} /> 
      
    </div> 
    <Log turns={gameTurns} />
  </main>
  }

export default App