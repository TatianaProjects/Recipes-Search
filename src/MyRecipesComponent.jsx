import {
  FiClock,
  FiUsers,
  FiActivity
} from "react-icons/fi";

function MyRecipesComponent ({label,image,calories,ingredients,time,servings,cuisine,meal,url}) {

  return (
    <div className="recipe-card">

        <div className="card-body">

            <img src={image} alt="dish" />
            <h2>{label}</h2>

            <div className="recipe-meta">

                <span>
                <FiClock />
                {time ? `${time} min` : "⏱ N/A"}
                </span>

                <span>
                <FiUsers />
                {servings}
                </span>

                <span>
                <FiActivity />
                {calories.toFixed()} cal
                </span>

            </div>

            <div className="tags">
                <span>{cuisine}</span>
                <span>{meal}</span>
            </div>

            <ul className="list">
                {ingredients.slice(0,4).map((ingredient,index) => (

                <li key={index}>{ingredient}</li>

                ))}

            </ul>

        </div>

        <div className="recipe-actions">
        <a href={url} target="_blank" rel="noopener noreferrer">
            <button className="view-btn">View Recipe</button>
        </a>
        </div>
      
    </div>
  )
}

export default MyRecipesComponent;