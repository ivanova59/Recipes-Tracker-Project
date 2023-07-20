import React, { useState, useEffect } from 'react';
import { Recipes } from '../interface';

interface ContentDetailsProps {
  onAddRecipe: (newRecipe: Omit<Recipes, 'id'>) => void;
  onUpdateRecipe: (updatedRecipe: Recipes) => void;
  selectedRecipe: Recipes | null;
  publicationDate: Date | null;
}

const ContentDetails: React.FC<ContentDetailsProps> = ({ onAddRecipe, onUpdateRecipe, selectedRecipe, publicationDate }) => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [publicationDateState, setPublicationDate] = useState<Date | null>(null);
  const [shouldClearForm, setShouldClearForm] = useState(false);

  useEffect(() => {
    fillFormWithSelectedRecipe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRecipe]);

  useEffect(() => {
    if (publicationDate !== null) {
      setPublicationDate(publicationDate);
    }
  }, [publicationDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecipe: Omit<Recipes, 'id'> = {
      name,
      ingredients,
      instructions,
      cookingTime: parseInt(cookingTime),
      publicationDate: publicationDateState || new Date(),
    };

    if (selectedRecipe) {
      onUpdateRecipe({ ...selectedRecipe, ...newRecipe });
    } else {
      onAddRecipe(newRecipe);
    }

    clearForm();
  };

  const clearForm = () => {
    setName('');
    setIngredients('');
    setInstructions('');
    setCookingTime('');
    setPublicationDate(null);
    setShouldClearForm(false);
  };

  const fillFormWithSelectedRecipe = () => {
    if (selectedRecipe) {
      setName(selectedRecipe.name);
      setIngredients(selectedRecipe.ingredients);
      setInstructions(selectedRecipe.instructions);
      setCookingTime(selectedRecipe.cookingTime.toString());
      setPublicationDate(selectedRecipe.publicationDate);
    }
    setShouldClearForm(false);
  };

  return (
    <form className="content-details" onSubmit={handleSubmit}>
      <h2>{selectedRecipe ? 'Edit Recipe' : 'Add New Recipe'}</h2>

      <div>
        <label htmlFor="field1">
          Name: 
          <input type="text" id="field1" value={shouldClearForm ? '' : name} onChange={(e) => setName(e.target.value)} />
        </label>
      </div>

      <div>
        <label htmlFor="field2">
          Ingredients: 
          <input type="text" id="field2" value={shouldClearForm ? '' : ingredients} onChange={(e) => setIngredients(e.target.value)} />
        </label>
      </div>

      <div>
        <label htmlFor="field3">
          Instructions: 
          <textarea id="field3" value={shouldClearForm ? '' : instructions} onChange={(e) => setInstructions(e.target.value)} />
        </label>
      </div>

      <div>
        <label htmlFor="field4">
          Cooking Time: 
          <input type="number" id="field4" value={shouldClearForm ? '' : cookingTime} onChange={(e) => setCookingTime(e.target.value)} />
        </label>
      </div>

      <div>
        <label htmlFor="field5">
          Publication Date:
          <input
            type="date"
            id="field5"
            value={publicationDateState ? publicationDateState.toISOString().slice(0, 10) : ''}
            onChange={(e) => setPublicationDate(e.target.valueAsDate)}
          />
        </label>
      </div>

      <button type="submit" id="saveButton">{selectedRecipe ? 'Save Changes' : 'Add Recipe'}</button>
      <button type="button" onClick={clearForm} id="clearButton">Clear</button>
    </form>
  );
};

export default ContentDetails;
