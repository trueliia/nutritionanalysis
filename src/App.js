
import { useEffect, useState } from 'react';
import './App.css';
import { LoaderPage } from './LoaderPage';
import { Nutrition } from './Nutrition';

function App() {

  const [mySearch, setMySearch] = useState();
  const [wordSubmitted, setWordSubmitted] = useState('');
  const [myNutrition, setMyNutrition] = useState();
  const [stateLoader, setStateLoader] = useState(false);

  const APP_ID = "e8ac92c1";
  const APP_KEY = "1acd11f6f37c72c1e2d4c1920341496c";
  const APP_URL = "https://api.edamam.com/api/nutrition-details";

    const fetchData = async (ingr) => {
      setStateLoader(true);
      const response = await fetch(`${APP_URL}?app_id=${APP_ID}&app_key=${APP_KEY}`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingr: ingr })
      })
      if(response.ok){
        setStateLoader(false);
        const data = await response.json();
        setMyNutrition(data);
      } else {
        setStateLoader(false);
        alert ('ingredients entered incorrectly')
      }
      
    }
  const myRecipeSearch = e =>{
    setMySearch(e.target.value)
  }
  const finalSearch = e =>{
    e.preventDefault();
    setWordSubmitted(mySearch);
  }
  useEffect(()=>{
    if (wordSubmitted !==''){
      let ingr = wordSubmitted.split(/[,,;\n,\r]/);
      fetchData(ingr)
    }
  }, [wordSubmitted])

  return (
    <div className='App'>
    <div className='container'>
      {stateLoader && <LoaderPage/>}
      <h1>Nutrition Analysis</h1>
      </div>
      <div className='description'>
      <p>Track your dietary intake easily! Just enter the ingredients separated by comma: "1 cup of milk, 100g of rice", and detailed nutrient analysis will appear on the screen.</p>
      </div>
      <div className='container'>
      <form onSubmit={finalSearch}>
        <input className='search' placeholder='Search...'
        onChange={myRecipeSearch}/>
        <div className='container'>
        <button type="submit">COMPUTE</button>
        </div>
      </form>
      </div>
      <div className='container'>
    <div className='nutritionLabel'>
    {
      myNutrition && Object.values(myNutrition.totalNutrients)
      .map(({ label, quantity, unit }) =>
      <Nutrition
      label = { label }
      quantity = { quantity.toFixed(2) }
      unit = { unit }
      />
      )
    }
    </div>
    </div>
    </div>
  );
}

export default App;
