import { useState } from "react"


function Players({initialName, symbol, isActive, onChangeName}){
    
    const [isEditing, setIsEditing] = useState(false);
    const [PlayerName, setPlayerName] = useState(initialName);    

    // {e} is the event object
    // {prevState} is the previous value of the state Hook

    function handeleEditClick(){
        setIsEditing( prevState => !prevState);
        if (isEditing){onChangeName(symbol, PlayerName) };
    };

    return <li className={isActive? 'active': null}>
        <span className="player">
            {isEditing? <input type="text" required value={PlayerName} onChange={ e => setPlayerName(e.target.value)} /> 
            : <span className="player-name"> {PlayerName} </span>}

            <span className="player-symbol"> {symbol} </span>          
        </span>
        <button onClick={handeleEditClick} >
            {isEditing ? 'save' : 'edit'}
        </button>
    </li>
}

export default Players