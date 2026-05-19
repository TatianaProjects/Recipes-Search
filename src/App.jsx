import { useEffect, useState } from 'react'
import './App.css'
import MyRecipesComponent from './MyRecipesComponent';
import { FiSearch } from "react-icons/fi";

function App() {
  
const MY_ID = "84c8e79a";
const MY_KEY = "68b1a08a83cbf3c13e4ca349969981c7";

const [mySearch,setMySearch] = useState("");
const [wordSubmitted,setWordSubmitted] = useState("chicken");

const [myRecipes, setMyRecipes] = useState([]);
const [error,setError] = useState("");



useEffect(() => {

  const getRecipe = async () => {

    try {

      const response = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=${MY_ID}&app_key=${MY_KEY}`
      );

      if(response.status===429){

        setError(
          "Demo version: API request limit has been reached. This project was created for learning purposes. Please try again later."
        );

        return;
      }

      const data = await response.json();

      if(data.hits){
        setMyRecipes(data.hits);
      } else{
        setMyRecipes([]);
      }

      setError("");
    }

    catch(error){
      setError("Something went wrong.");
    }

  };

  getRecipe();

},[wordSubmitted]);

const myRecipeSearch = (e) => {
  setMySearch(e.target.value);
}

const finalSearch = (e) =>{
  e.preventDefault ();
  setWordSubmitted(mySearch);
}

  return (
    <div className="App">

      <div className="container">
        <div className="animated-bg"></div>
          <h1>Discover Recipes</h1>
        </div>

        <div className="search-area">
            <form onSubmit={finalSearch}>
                <input className='search' placeholder='Search...' onChange={myRecipeSearch} value ={mySearch}/>
            </form>
        
            <button className="search-btn" onClick ={finalSearch}>
                <FiSearch />
              </button>
        </div>
      
      {error &&
      <p className="error">
        {error}
      </p>}

        <div className="recipes-grid">

          {myRecipes.map((element,index) => (
            <MyRecipesComponent key={index}
            label={element.recipe.label} 
            image={element.recipe.image} 
            ingredients={element.recipe.ingredientLines} 
            calories ={element.recipe.calories}
            time={element.recipe.totalTime}
            servings={element.recipe.yield}
            cuisine={element.recipe.cuisineType[0]}
            meal={element.recipe.mealType[0]}
            url={element.recipe.url}
            />
          ))}

        </div>

    </div>
  )
}

export default App;
