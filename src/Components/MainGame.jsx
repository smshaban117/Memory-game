import {useState, useEffect} from 'react';

export default function GameUI(){
    
  
   
  
  return(
        <div className='mainGameUI'>
            <div className='header'>
            <h1>Memory Game</h1>
            <h3>Get points by clicking on an image but don't click any more than once!</h3>
            
            <div className='memTiles'>

             
                <MemoryTile />
                
              
            </div>
            </div>
        </div>
    )
}

function shuffleArray(array){
  const shuffled = [...array];
  for (let i = shuffled.length -1; i > 0; i--){
    const j = Math.floor(Math.random()*(i + 1));
    [shuffled[i],shuffled[j]] = [shuffled[j],shuffled[i]]
  }
  return shuffled;
}






function MemoryTile(){
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [score, setScore] = useState(0)
    const [bestScore, setBestScore] = useState(0)
    const [clickedCharacters,setClickedCharacters] = useState([]);

function handleCharacterClick(character){
  if (clickedCharacters.some(clicked => clicked.id === character.id)){
    if (score > bestScore){
    setBestScore(score) } 
   setScore(0)
   setClickedCharacters([])
   return;
  } else {
    setScore(score + 1)
    setClickedCharacters([...clickedCharacters,character])
    return;
  }
}


function handleShuffle(){
  const shuffledCharacters = shuffleArray(characters)
  setCharacters(shuffledCharacters)
} 

function GamePlay(character){
  handleCharacterClick(character);
  handleShuffle();
  return;
}

    const characterUrls = 
    [
      
      'https://data.jujutsukaisenapi.site/api/v1/characters/1',
      'https://data.jujutsukaisenapi.site/api/v1/characters/2',
      'https://data.jujutsukaisenapi.site/api/v1/characters/3',
      'https://data.jujutsukaisenapi.site/api/v1/characters/4',
      'https://data.jujutsukaisenapi.site/api/v1/characters/5',
      'https://data.jujutsukaisenapi.site/api/v1/characters/6',
      'https://data.jujutsukaisenapi.site/api/v1/characters/13',
      'https://data.jujutsukaisenapi.site/api/v1/characters/14',
      'https://data.jujutsukaisenapi.site/api/v1/characters/15',
      'https://data.jujutsukaisenapi.site/api/v1/characters/17',
      'https://data.jujutsukaisenapi.site/api/v1/characters/20',
      'https://data.jujutsukaisenapi.site/api/v1/characters/21'


      
    ]
  useEffect(() => {
    const loadCharacters = async () => {
      try { 
      const promises = characterUrls.map((characterUrl) =>{
      return  fetch(characterUrl)
        .then((response) => response.json())
        
      }
        
    )
    
    const loadedCharacters = await Promise.all(promises);
    setCharacters(loadedCharacters);
    } catch (error) { console.error('failed to load images',error);
    } finally { setLoading(false);
    }
  }
  loadCharacters();
  },[])
     
  if (loading) return <p>Loading images...</p>

  return (
    <div>
      <div className='scoreBoard'>
       <h3>Score:{score}</h3> 
       <h3> BestScore:{bestScore}</h3>
      </div>
      <h2>Sorcerers</h2>
      <div className='jjk'>
      {characters.map((character) => (
        <button key = {character.id} className='characterTile' onClick={()=>GamePlay(character)} >
          <img src={character.image}  alt={character.name}/>
          <p>{character.name}</p>
        </button>
        
      )
      )}
      </div>
    </div>
  )}





