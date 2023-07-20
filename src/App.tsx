
import React, { useState, useRef } from 'react';
import './styles/main.css';
import { Recipes } from './interface';
import ContentDetails from './components/Content-Details';

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipes[]>([
    {
      id: 1,
      name: "Таратор",
      ingredients: "Кисело мляко, Краставица, Вода, Зехтин, Копър, Чесън, Орехи",
      instructions: "Обелете и настъргайте краставицата. Смесете киселото мляко с водата и останалите съставки в купа. Разбъркайте всичко заедно. Поднесете студено в купа.",
      cookingTime: 10,
      publicationDate: new Date(),
    },
    {
      id: 2,
      name: "Пържени филийки",
      ingredients: "хляб-1/2; яйца-2бр.; кис.мляко-4с.л.; брашно-4.с.л.; вода-1к.ч.; сода-щипка; олио",
      instructions: "Хляба се нарязва на филийки и после всяка филия на две половини. Разбиваме яйцата със киселото мляко, към което сме прибавили и щипката сода. Добавяме и водата като разбъркваме постоянно. Най накрая сипваме и брашното. Отново разбъркваме до получаването на гъста каша. Потапяме всяка филийка и пържим във сгорещено олио.",
      cookingTime: 25,
      publicationDate: new Date(),
    },
    {
      id: 3,
      name: "Плодови шишчета с пъпеш",
      ingredients: "пъпеш - 1/2 бр.; диня - 1 резен; банани - 1 бр.; сливи - 3 бр.; кафява захар - за поръсване, по желание",
      instructions: "Едно лятно настроение в чинийка - шишчета с пъпеш, така любими и ароматни. Бананът се нарязва на колелца, но по дебели. Пъпеша нарязваме на парченца, след като сме го почистили от семето. Динята също режем на парченца, аз я сложих само за цвят. Подреждаме ги на дървени шишчета. Завършваме със слива, може и с друг плод. Плодовите шишчета може да се поръсят с кафява захар, за по голяма сладост и хрупкав елемент. Плодовите шишчета с пъпеш са готови.",
      cookingTime: 15,
      publicationDate: new Date()
    },
    {
      id: 4,
      name: "Варена царевица на пара в мултикукър",
      ingredients: "царевица - 3 бр.; вода - 1 мерителна чаша около 150 мл.; сол; масло",
      instructions: "Налейте 1 мерителна чаша вода в съда за готвене на мултикукъра и сложете решетката. Почистете царевицата от листата и я наредете върху решетката за готвене на пара. Затворете и заключете капака на мултикукъра и изберете програма за готвене на пара. Настройте таймера на 15 минути и включете уреда. След като мине това време освободете налягането от клапана и извадете готовата царевица. Поръсете я с щипка сол и по желание я намажете с масло, докато е още гореща. Бърза, лесна и вкусна варена царевица на пара в мултикукър.",
      cookingTime: 20,
      publicationDate: new Date()
    },
    {
      id: 5,
      name: "Салата с рукола и чери домати",
      ingredients: "рукола - 100 гр.; чери домати - 200 гр.; пресни гъби - 100 гр.; краве сирене - 50 гр.; олио - 2 с.л.; балсамов оцет - 1 с.л.; сол и черен пипер - на вкус",
      instructions: "Измийте руколата и чери доматите и ги нарежете на половинки. Гъбите също нарежете на тънки филийки. Смесете руколата, чери доматите и гъбите в купа. Добавете кравето сирене на парченца. Пригответе заправка, като разбъркате олиото, балсамовия оцет, солта и черния пипер. Полейте салатата със заправката и разбъркайте добре. Салатата с рукола и чери домати е готова за сервиране!",
      cookingTime: 10,
      publicationDate: new Date()
    }
  ]);

  const deleteClickCount = useRef<number>(0);

  const handleDeleteRecipe = (id: number) => {
    if (deleteClickCount.current > 0) {
      return;
    }

    deleteClickCount.current = 1;

    setTimeout(() => {
      const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
      setRecipes(updatedRecipes);

      setRecipes((prevRecipes) => {
        return prevRecipes.map((recipe, index) => ({
          ...recipe,
          id: index + 1,
        }));
      });

      deleteClickCount.current = 0;
    }, 50);
  };

  const [selectedRecipe, setSelectedRecipe] = useState<Recipes | null>(null);

  const handleSelectRecipe = (recipe: Recipes) => {
    setSelectedRecipe(recipe);
  };

  const handleUpdateRecipe = (updatedRecipe: Recipes) => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    );
    setRecipes(updatedRecipes);

    setSelectedRecipe(null);
  };

  const handleAddRecipe = (newRecipe: Omit<Recipes, 'id'>) => {
    const lastId = recipes.length > 0 ? recipes[recipes.length - 1].id : 0;
    const newId = lastId + 1;

    const newPublicationDate = new Date();
  

    const completeNewRecipe: Recipes = {
      id: newId,
      ...newRecipe,
      publicationDate: newPublicationDate,
    };

  setRecipes([...recipes, completeNewRecipe]);

  setSelectedRecipe(null);
};

  return (
    <div className="container">
      <div className="navbar">Grandmother's Recipes</div>

      <ul className="content-list">
        {recipes.map((recipe) => (
          <li
            key={recipe.id}
            className={`recipe-box ${selectedRecipe?.id === recipe.id ? 'selected' : ''}`}
            onClick={() => handleSelectRecipe(recipe)}
          >
            <div>
              <p className="id">Number: {recipe.id}</p>
              <p className="field1">Name: {recipe.name}</p>
              <p className="field2">Ingredients: {recipe.ingredients}</p>
              <p className="field3">Instructions: {recipe.instructions}</p>
              <p className="field4">Coking Time(min): {recipe.cookingTime}</p>
              <p className="field5">Publication Date: {recipe.publicationDate.toDateString()}</p>
            </div>
            <button className="deleteButton" onClick={() => handleDeleteRecipe (recipe.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <ContentDetails
  onAddRecipe={handleAddRecipe}
  onUpdateRecipe={handleUpdateRecipe}
  selectedRecipe={selectedRecipe}
  publicationDate={selectedRecipe ? selectedRecipe.publicationDate : null}
/>

      <div className="footer">© 2023 Grandmother's Recipes System. All rights reserved.</div>
    </div>
  );
};

export default App;