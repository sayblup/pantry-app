const API_URL = 'http://localhost:8080/api';

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
    document.getElementById('addIngredientForm').addEventListener('submit', handleAddIngredient);
    document.getElementById('editIngredientForm').addEventListener('submit', handleEditIngredient);
    document.getElementById('restoreIngredientForm').addEventListener('submit', handleRestoreIngredient);
    
    document.getElementById('pantrySearch').addEventListener('input', filterPantry);
    document.getElementById('recipeSearch').addEventListener('input', filterRecipes);
    
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
        ingredients = await response.json();
        renderPantry();
    } catch (error) {
        console.error('Error loading ingredients:', error);
    }
}

async function loadRecipes() {
    try {
        const response = await fetch(`${API_URL}/recipes`);
        recipes = await response.json();
        renderRecipes();
    } catch (error) {
        console.error('Error loading recipes:', error);
    }
}

async function loadDepleted() {
    try {
        const response = await fetch(`${API_URL}/depleted`);
        depletedIngredients = await response.json();
        renderDepleted();
    } catch (error) {
        console.error('Error loading depleted:', error);
    }
}

function renderPantry() {
    const container = document.getElementById('pantryList');
    const searchTerm = document.getElementById('pantrySearch').value.toLowerCase();
    
    const filtered = ingredients.filter(ing => 
        ing.name.toLowerCase().includes(searchTerm)
    );
    
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
    
    container.innerHTML = filtered.map(recipe => `
        <div class="recipe-item">
            <div class="recipe-header" onclick="toggleRecipe(${recipe.id})">
                <span class="recipe-name">${recipe.name}</span>
                <span>▼</span>
            </div>
            <div class="recipe-details" id="recipe-${recipe.id}">
                ${recipe.ingredients.map((ing, idx) => `
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
                `).join('')}
                <button class="btn-execute" onclick="executeRecipe(${recipe.id})">
                    Zatwierdź i odejmij ze spiżarni
                </button>
            </div>
        </div>
    `).join('');
}

function renderDepleted() {
    const container = document.getElementById('depletedList');
    
    container.innerHTML = depletedIngredients.map(depleted => `
        <div class="depleted-item" onclick="openRestoreModal(${depleted.id}, '${depleted.name}')">
            <div class="depleted-info">
                <div class="depleted-name">${depleted.name}</div>
                <div class="depleted-date">${formatDate(depleted.dateAdded)}</div>
            </div>
        </div>
    `).join('');
}

function filterPantry() {
    renderPantry();
}

function filterRecipes() {
    renderRecipes();
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
    document.getElementById('restoreIngredientName').textContent = name;
    document.getElementById('restoreIngredientForm').reset();
    
    document.getElementById('restoreModal').classList.add('active');
}

function closeModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
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

async function executeRecipe(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;
    
    const selectedIngredients = [];
    
    recipe.ingredients.forEach((ing, idx) => {
        const checkbox = document.getElementById(`ing-${recipeId}-${idx}`);
        const qtyInput = document.getElementById(`qty-${recipeId}-${idx}`);
        
        if (checkbox.checked) {
            selectedIngredients.push({
                ingredientName: ing.ingredientName,
                quantity: parseFloat(qtyInput.value),
                unit: ing.unit
            });
        }
    });
    
    if (selectedIngredients.length === 0) {
        alert('Wybierz przynajmniej jeden składnik');
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
