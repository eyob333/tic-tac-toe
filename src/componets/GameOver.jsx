function GameOver({winner, onSelect}){
    return <div id="game-over">
        <h2>Game Over</h2>
        { winner !== '' ? <p>{winner.toUpperCase()} won!!</p>: <p>it's a Draw</p>}
        <p>
            <button type="submit" onClick={onSelect}>Rematch</button>
        </p>
    </div>
}

export default GameOver