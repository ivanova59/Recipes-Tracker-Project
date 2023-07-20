import React from "react";
import { Recipes } from '../interface';

interface RecipeListProps {
  recipes: Recipes[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  return (
    <div className="content-list">
      <h2>Recipe List</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <p className="id">Id: {recipe.id}</p>
            <p className="field1">Name: {recipe.name}</p>
            <p className="field2">Ingredients: {recipe.ingredients}</p>
            <p className="field3">Instructions: {recipe.instructions}</p>
            <p className="field4">Cooking Time: {recipe.cookingTime} minutes</p>
            <p className="field5">Publication Date: {recipe.publicationDate.toDateString()}</p>
            <button className="deleteButton">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
