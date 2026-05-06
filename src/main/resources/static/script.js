const API_URL = window.location.origin + '/api';

let ingredients = [];
let recipes = [];
let depletedIngredients = [];

document.addEventListener('DOMContentLoaded', () => {
    loadAllData();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('refreshBtn').addEventListener('click', loadAllData);
    document.getElementById('addIngredientBtn').addEventListener('click', openAddModal);
    document.getElementById('addRecipeBtn').addEventListener('click', openAddRecipeModal);
    document.getElementById('addIngredientForm').addEventListener('submit', handleAddIngredient);
    document.getElementById('editIngredientForm').addEventListener('submit', handleEditIngredient);
    document.getElementById('restoreIngredientForm').addEventListener('submit', handleRestoreIngredient);
    document.getElementById('addRecipeForm').addEventListener('submit', handleAddRecipe);
    document.getElementById('addRecipeIngredientBtn').addEventListener('click', addRecipeIngredientRow);

    document.getElementById('pantrySearch').addEventListener('input', renderPantry);
    document.getElementById('recipeSearch').addEventListener('input', renderRecipes);

    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', closeModals);
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModals();
        }
    });
}

async function loadAllData() {
    await loadIngredients();
    await loadRecipes();
    await loadDepleted();
}

async function loadIngredients() {
    try {
        const response = await fetch(`${API_URL}/ingredients`);
        const data = await response.json();
        ingredients = Array.isArray(data) ? data : [];
        renderPantry();
    } catch (error) {
        console.error('Error loading ingredients:', error);
        ingredients = [];
        renderPantry();
    }
}

async function loadRecipes() {
    try {
        const response = await fetch(`${API_URL}/recipes`);
        const data = await response.json();
        recipes = Array.isArray(data) ? data : [];
        renderRecipes();
    } catch (error) {
        console.error('Error loading recipes:', error);
        recipes = [];
        renderRecipes();
    }
}

async function loadDepleted() {
    try {
        const response = await fetch(`${API_URL}/depleted`);
        const data = await response.json();
        depletedIngredients = Array.isArray(data) ? data : [];
        renderDepleted();
    } catch (error) {
        console.error('Error loading depleted:', error);
        depletedIngredients = [];
        renderDepleted();
    }
}

function renderPantry() {
    const container = document.getElementById('pantryList');
    const searchTerm = document.getElementById('pantrySearch').value.toLowerCase();

    const filtered = ingredients.filter(ing =>
        ing.name.toLowerCase().includes(searchTerm)
    );

    if (filtered.length === 0) {
        container.innerHTML = '<p class="empty-info">Brak produktów w spiżarni.</p>';
        return;
    }

    container.innerHTML = filtered.map(ingredient => `
        <div class="ingredient-item">
            <div class="ingredient-info">
                <div class="ingredient-name">${ingredient.name}</div>
                <div class="ingredient-quantity">${ingredient.quantity} ${ingredient.unit}</div>
            </div>
            <div class="ingredient-actions">
                <button class="btn-edit" onclick="openEditModal(${ingredient.id})">Edytuj</button>
                <button class="btn-depleted" onclick="markAsDepleted(${ingredient.id})">Skończyło się</button>
            </div>
        </div>
    `).join('');
}

function renderRecipes() {
    const container = document.getElementById('recipesList');
    const searchTerm = document.getElementById('recipeSearch').value.toLowerCase();

    const filtered = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm)
    );

    if (filtered.length === 0) {
        container.innerHTML = '<p class="empty-info">Brak przepisów.</p>';
        return;
    }

    container.innerHTML = filtered.map(recipe => `
        <div class="recipe-item">
            <div class="recipe-header" onclick="toggleRecipe(${recipe.id})">
                <span class="recipe-name">${recipe.name}</span>
                <div class="recipe-header-actions">
                    <button class="btn-delete-recipe" onclick="deleteRecipe(event, ${recipe.id})">Usuń</button>
                    <span class="toggle-icon">▼</span>
                </div>
            </div>
            <div class="recipe-details" id="recipe-${recipe.id}">
                ${recipe.ingredients && recipe.ingredients.length > 0
                    ? recipe.ingredients.map((ing, idx) => `
                        <div class="recipe-ingredient">
                            <input type="checkbox" id="ing-${recipe.id}-${idx}" checked>
                            <label for="ing-${recipe.id}-${idx}">${ing.ingredientName}</label>
                            <div class="quantity-controls">
                                <input type="number"
                                       value="${ing.quantity}"
                                       step="0.01"
                                       id="qty-${recipe.id}-${idx}">
                                <span>${ing.unit}</span>
                            </div>
                        </div>
                    `).join('')
                    : '<p class="empty-info">Brak składników.</p>'
                }
                <button class="btn-execute" onclick="executeRecipe(${recipe.id})">
                    Zatwierdź i odejmij ze spiżarni
                </button>
            </div>
        </div>
    `).join('');
}

function renderDepleted() {
    const container = document.getElementById('depletedList');

    if (depletedIngredients.length === 0) {
        container.innerHTML = '<p class="empty-info">Lista jest pusta.</p>';
        return;
    }

    container.innerHTML = depletedIngredients.map(depleted => `
        <div class="depleted-item" onclick="openRestoreModal(${depleted.id}, '${depleted.name}')">
            <div class="depleted-info">
                <div class="depleted-name">${depleted.name}</div>
                <div class="depleted-date">${formatDate(depleted.dateAdded)}</div>
            </div>
            <span class="restore-hint">kliknij, aby przywrócić</span>
        </div>
    `).join('');
}

function toggleRecipe(recipeId) {
    const details = document.getElementById(`recipe-${recipeId}`);
    details.classList.toggle('active');
}

function openAddModal() {
    document.getElementById('addModal').classList.add('active');
    document.getElementById('addIngredientForm').reset();
}

function openEditModal(ingredientId) {
    const ingredient = ingredients.find(i => i.id === ingredientId);
    if (!ingredient) return;

    document.getElementById('editIngredientId').value = ingredient.id;
    document.getElementById('editIngredientQuantity').value = ingredient.quantity;
    document.getElementById('editIngredientUnit').value = ingredient.unit;

    document.getElementById('editModal').classList.add('active');
}

function openRestoreModal(depletedId, name) {
    document.getElementById('restoreIngredientId').value = depletedId;
    document.getElementById('restoreIngredientName').textContent = `Przywróć: ${name}`;
    document.getElementById('restoreIngredientForm').reset();
    document.getElementById('restoreModal').classList.add('active');
}

function openAddRecipeModal() {
    document.getElementById('addRecipeModal').classList.add('active');
    document.getElementById('addRecipeForm').reset();
    document.getElementById('recipeIngredientsContainer').innerHTML = '';
    addRecipeIngredientRow();
}

function closeModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

function addRecipeIngredientRow() {
    const container = document.getElementById('recipeIngredientsContainer');

    const row = document.createElement('div');
    row.className = 'recipe-ingredient-row';
    row.innerHTML = `
        <input type="text" placeholder="Nazwa składnika" class="ri-name" required>
        <input type="number" placeholder="Ilość" step="0.01" class="ri-quantity" required>
        <select class="ri-unit">
            <option value="g">g</option>
            <option value="kg">kg</option>
            <option value="ml">ml</option>
            <option value="l">l</option>
        </select>
        <button type="button" class="btn-remove-row" onclick="this.parentElement.remove()">✕</button>
    `;
    container.appendChild(row);
}

async function handleAddIngredient(e) {
    e.preventDefault();

    const data = {
        name: document.getElementById('ingredientName').value,
        quantity: parseFloat(document.getElementById('ingredientQuantity').value),
        unit: document.getElementById('ingredientUnit').value
    };

    try {
        await fetch(`${API_URL}/ingredients`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        closeModals();
        await loadIngredients();
    } catch (error) {
        console.error('Error adding ingredient:', error);
    }
}

async function handleEditIngredient(e) {
    e.preventDefault();

    const id = document.getElementById('editIngredientId').value;
    const data = {
        quantity: parseFloat(document.getElementById('editIngredientQuantity').value),
        unit: document.getElementById('editIngredientUnit').value
    };

    try {
        await fetch(`${API_URL}/ingredients/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        closeModals();
        await loadIngredients();
    } catch (error) {
        console.error('Error editing ingredient:', error);
    }
}

async function handleRestoreIngredient(e) {
    e.preventDefault();

    const id = document.getElementById('restoreIngredientId').value;
    const data = {
        quantity: parseFloat(document.getElementById('restoreIngredientQuantity').value),
        unit: document.getElementById('restoreIngredientUnit').value
    };

    try {
        await fetch(`${API_URL}/depleted/${id}/restore`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        closeModals();
        await loadDepleted();
        await loadIngredients();
    } catch (error) {
        console.error('Error restoring ingredient:', error);
    }
}

async function handleAddRecipe(e) {
    e.preventDefault();

    const name = document.getElementById('recipeName').value.trim();
    const rows = document.querySelectorAll('.recipe-ingredient-row');

    if (!name) {
        alert('Podaj nazwę przepisu.');
        return;
    }

    const ingredientsList = [];
    let valid = true;

    rows.forEach(row => {
        const ingredientName = row.querySelector('.ri-name').value.trim();
        const quantity = parseFloat(row.querySelector('.ri-quantity').value);
        const unit = row.querySelector('.ri-unit').value;

        if (!ingredientName || isNaN(quantity) || quantity <= 0) {
            valid = false;
            return;
        }

        ingredientsList.push({ ingredientName, quantity, unit });
    });

    if (!valid || ingredientsList.length === 0) {
        alert('Wypełnij poprawnie wszystkie pola składników.');
        return;
    }

    try {
        await fetch(`${API_URL}/recipes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, ingredients: ingredientsList })
        });
        closeModals();
        await loadRecipes();
    } catch (error) {
        console.error('Error adding recipe:', error);
    }
}

async function markAsDepleted(ingredientId) {
    if (!confirm('Czy na pewno oznaczyć jako "skończyło się"?')) return;

    try {
        await fetch(`${API_URL}/ingredients/${ingredientId}/depleted`, {
            method: 'DELETE'
        });
        await loadIngredients();
        await loadDepleted();
    } catch (error) {
        console.error('Error marking as depleted:', error);
    }
}

async function deleteRecipe(event, recipeId) {
    event.stopPropagation();
    if (!confirm('Czy na pewno usunąć przepis?')) return;

    try {
        await fetch(`${API_URL}/recipes/${recipeId}`, {
            method: 'DELETE'
        });
        await loadRecipes();
    } catch (error) {
        console.error('Error deleting recipe:', error);
    }
}

async function executeRecipe(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    const selectedIngredients = [];

    recipe.ingredients.forEach((ing, idx) => {
        const checkbox = document.getElementById(`ing-${recipeId}-${idx}`);
        const qtyInput = document.getElementById(`qty-${recipeId}-${idx}`);

        if (checkbox && checkbox.checked) {
            selectedIngredients.push({
                ingredientName: ing.ingredientName,
                quantity: parseFloat(qtyInput.value),
                unit: ing.unit
            });
        }
    });

    if (selectedIngredients.length === 0) {
        alert('Wybierz przynajmniej jeden składnik.');
        return;
    }

    try {
        await fetch(`${API_URL}/recipes/${recipeId}/execute`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(selectedIngredients)
        });
        await loadIngredients();
        await loadDepleted();
    } catch (error) {
        console.error('Error executing recipe:', error);
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('pl-PL', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}
