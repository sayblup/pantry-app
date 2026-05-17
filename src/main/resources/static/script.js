const API_URL = window.location.origin + '/api';

const CATEGORIES = [
    'Warzywa', 'Owoce', 'Mięso', 'Ryby i owoce morza',
    'Nabiał i jaja', 'Pieczywo i wypieki', 'Makarony, ryż i kasze',
    'Przyprawy i zioła', 'Oleje i tłuszcze', 'Przetwory i konserwy',
    'Słodycze i przekąski', 'Napoje', 'Mrożonki', 'Suche produkty', 'Inne'
];

const UNITS = ['g', 'kg', 'ml', 'l', 'szt'];

//
const TRANSLATIONS = {
  // vegetables
  'carrot': 'Marchew',
  'potato': 'Ziemniak',
  'sweet potato': 'Batat',
  'tomato': 'Pomidor',
  'cucumber': 'Ogórek',
  'lettuce': 'Sałata',
  'cabbage': 'Kapusta',
  'red cabbage': 'Czerwona kapusta',
  'cauliflower': 'Kalafior',
  'broccoli': 'Brokuł',
  'celery': 'Seler naciowy',
  'parsley root': 'Pietruszka korzeń',
  'parsnip': 'Pasternak',
  'bell pepper': 'Papryka',
  'chili pepper': 'Papryczka chili',
  'mushroom': 'Pieczarka',
  'wild mushrooms': 'Grzyby leśne',
  'pumpkin': 'Dynia',
  'avocado': 'Awokado',
  'olive': 'Oliwka',
  'pickles': 'Ogórki kiszone',
  'sauerkraut': 'Kapusta kiszona',
  'onion': 'Cebula',
  'onions': 'Cebule',

  'potato': 'Ziemniak',
  'potatoes': 'Ziemniaki',

  'salt': 'Sól',
  'sea salt': 'Sól morska',

  'soy milk': 'Mleko sojowe',

  'margarine': 'Margaryna',
  'earth balance margarine': 'Margaryna',

  'water': 'Woda'

  // fruits
  'apple': 'Jabłko',
  'banana': 'Banan',
  'orange': 'Pomarańcza',
  'lemon': 'Cytryna',
  'lime': 'Limonka',
  'pear': 'Gruszka',
  'grape': 'Winogrono',
  'strawberry': 'Truskawka',
  'blueberry': 'Borówka',
  'raspberry': 'Malina',
  'blackberry': 'Jeżyna',
  'cherry': 'Wiśnia',
  'pineapple': 'Ananas',
  'mango': 'Mango',
  'kiwi': 'Kiwi',
  'watermelon': 'Arbuz',
  'peach': 'Brzoskwinia',
  'plum': 'Śliwka',
  'coconut': 'Kokos',
  'dates': 'Daktyle',
  'raisins': 'Rodzynki',

  // meat & fish
  'chicken': 'Kurczak',
  'beef': 'Wołowina',
  'pork': 'Wieprzowina',
  'turkey': 'Indyk',
  'bacon': 'Boczek',
  'ham': 'Szynka',
  'sausage': 'Kiełbasa',
  'minced meat': 'Mięso mielone',
  'veal': 'Cielęcina',
  'lamb': 'Jagnięcina',

  'salmon': 'Łosoś',
  'tuna': 'Tuńczyk',
  'cod': 'Dorsz',
  'shrimp': 'Krewetki',
  'prawns': 'Krewetki',
  'crab': 'Krab',
  'lobster': 'Homar',

  // dairy & eggs
  'milk': 'Mleko',
  'cream': 'Śmietana',
  'sour cream': 'Kwaśna śmietana',
  'butter': 'Masło',
  'yogurt': 'Jogurt',
  'greek yogurt': 'Jogurt grecki',
  'egg': 'Jajko',
  'eggs': 'Jajka',
  'cream cheese': 'Serek śmietankowy',
  'cottage cheese': 'Twaróg',
  'ricotta': 'Ricotta',
  'blue cheese': 'Ser pleśniowy',

  // grains & bakery
  'rice': 'Ryż',
  'brown rice': 'Brązowy ryż',
  'pasta': 'Makaron',
  'spaghetti': 'Spaghetti',
  'noodles': 'Makaron noodles',
  'bread': 'Chleb',
  'baguette': 'Bagietka',
  'bun': 'Bułka',
  'flour': 'Mąka',
  'whole wheat flour': 'Mąka pełnoziarnista',
  'oats': 'Płatki owsiane',
  'oatmeal': 'Owsianka',
  'breadcrumbs': 'Bułka tarta',

  // oils & fats
  'olive oil': 'Oliwa z oliwek',
  'sunflower oil': 'Olej słonecznikowy',
  'vegetable oil': 'Olej roślinny',
  'coconut oil': 'Olej kokosowy',

  // spices & herbs
  'salt': 'Sól',
  'pepper': 'Pieprz',
  'black pepper': 'Czarny pieprz',
  'white pepper': 'Biały pieprz',
  'oregano': 'Oregano',
  'basil': 'Bazylia',
  'thyme': 'Tymianek',
  'rosemary': 'Rozmaryn',
  'dill': 'Koper',
  'parsley': 'Pietruszka',
  'mint': 'Mięta',
  'cinnamon': 'Cynamon',
  'vanilla': 'Wanilia',
  'bay leaf': 'Liść laurowy',
  'cumin': 'Kmin rzymski',
  'ginger': 'Imbir',

  // sauces & condiments
  'ketchup': 'Ketchup',
  'mustard': 'Musztarda',
  'mayonnaise': 'Majonez',
  'soy sauce': 'Sos sojowy',
  'fish sauce': 'Sos rybny',
  'hot sauce': 'Ostry sos',
  'barbecue sauce': 'Sos barbecue',
  'tomato sauce': 'Sos pomidorowy',
  'vinegar': 'Ocet',
  'balsamic vinegar': 'Ocet balsamiczny',
  'mustard sauce': 'Sos musztardowy',

  // baking & sweets
  'sugar': 'Cukier',
  'brown sugar': 'Brązowy cukier',
  'honey': 'Miód',
  'yeast': 'Drożdże',
  'baking powder': 'Proszek do pieczenia',
  'vanilla sugar': 'Cukier wanilinowy',
  'caramel': 'Karmel',

  // nuts & seeds
  'almonds': 'Migdały',
  'walnuts': 'Orzechy włoskie',
  'hazelnuts': 'Orzechy laskowe',
  'cashews': 'Nerkowce',
  'peanuts': 'Orzeszki ziemne',
  'pistachios': 'Pistacje',
  'sunflower seeds': 'Pestki słonecznika',
  'pumpkin seeds': 'Pestki dyni',

  // drinks
  'coffee': 'Kawa',
  'tea': 'Herbata',
  'green tea': 'Zielona herbata',
  'juice': 'Sok',
  'orange juice': 'Sok pomarańczowy',
  'sparkling water': 'Woda gazowana',


};

function translateIngredient(name) {
    if (!name) return '';
    const lower = name.toLowerCase();
    // Szukamy w słowniku
    if (TRANSLATIONS[lower]) return TRANSLATIONS[lower];
    // Jeśli brak w słowniku - stosujemy regułę wielkiej litery jako fallback (zostaje po angielsku, ale wygląda ładnie)
    return lower.charAt(0).toUpperCase() + lower.slice(1);
}
let ingredients = [];
let recipes = [];
let depletedIngredients = [];
let shoppingItems = [];
let spoonacularCurrentRecipe = null;

// ─── INIT ───────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    populateSelects();
    setupTabs();
    setupEventListeners();
    loadAllData();
});

function populateSelects() {
    const categoryOptions = CATEGORIES.map(c => `<option value="${c}">${c}</option>`).join('');
    const unitOptions = UNITS.map(u => `<option value="${u}">${u}</option>`).join('');
    document.querySelectorAll('.category-select').forEach(sel => sel.innerHTML = categoryOptions);
    document.querySelectorAll('.unit-select').forEach(sel => sel.innerHTML = unitOptions);

    const filterCat = document.getElementById('pantryFilterCategory');
    filterCat.innerHTML = '<option value="">Wszystkie kategorie</option>' + categoryOptions;
}

function setupTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(s => s.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
        });
    });
}

function setupEventListeners() {
    document.getElementById('refreshBtn').addEventListener('click', loadAllData);

    document.getElementById('addIngredientBtn').addEventListener('click', () => openModal('addModal'));
    document.getElementById('addRecipeBtn').addEventListener('click', openAddRecipeModal);
    document.getElementById('addShoppingItemBtn').addEventListener('click', () => openModal('addShoppingModal'));
    document.getElementById('moveToPantryBtn').addEventListener('click', moveCheckedToPantry);
    document.getElementById('deleteCheckedBtn').addEventListener('click', deleteCheckedShopping);

    document.getElementById('addIngredientForm').addEventListener('submit', handleAddIngredient);
    document.getElementById('detailIngredientForm').addEventListener('submit', handleSaveDetail);
    document.getElementById('restoreIngredientForm').addEventListener('submit', handleRestoreIngredient);
    document.getElementById('addRecipeForm').addEventListener('submit', handleAddRecipe);
    document.getElementById('addShoppingItemForm').addEventListener('submit', handleAddShoppingItem);
    document.getElementById('addRecipeIngredientBtn').addEventListener('click', addRecipeIngredientRow);

    document.getElementById('pantrySearch').addEventListener('input', renderPantry);
    document.getElementById('pantryFilterCategory').addEventListener('change', renderPantry);
    document.getElementById('recipeSearch').addEventListener('input', renderRecipes);

    document.getElementById('spoonacularSearchBtn').addEventListener('click', searchSpoonacular);
    document.getElementById('spoonacularSearch').addEventListener('keydown', e => {
        if (e.key === 'Enter') searchSpoonacular();
    });
    document.getElementById('importSpoonacularBtn').addEventListener('click', importSpoonacularRecipe);

    document.querySelectorAll('.close').forEach(btn => btn.addEventListener('click', closeModals));
    window.addEventListener('click', e => { if (e.target.classList.contains('modal')) closeModals(); });
}

// ─── DATA LOADING ────────────────────────────────────────────────────────────

async function loadAllData() {
    await Promise.all([loadIngredients(), loadRecipes(), loadDepleted(), loadShopping()]);
}

async function loadIngredients() {
    try {
        const data = await fetchJSON(`${API_URL}/ingredients`);
        ingredients = Array.isArray(data) ? data : [];
        renderPantry();
    } catch { ingredients = []; renderPantry(); }
}

async function loadRecipes() {
    try {
        const data = await fetchJSON(`${API_URL}/recipes`);
        recipes = Array.isArray(data) ? data : [];
        renderRecipes();
    } catch { recipes = []; renderRecipes(); }
}

async function loadDepleted() {
    try {
        const data = await fetchJSON(`${API_URL}/depleted`);
        depletedIngredients = Array.isArray(data) ? data : [];
        renderDepleted();
    } catch { depletedIngredients = []; renderDepleted(); }
}

async function loadShopping() {
    try {
        const data = await fetchJSON(`${API_URL}/shopping`);
        shoppingItems = Array.isArray(data) ? data : [];
        renderShopping();
    } catch { shoppingItems = []; renderShopping(); }
}

async function fetchJSON(url) {
    const r = await fetch(url);
    return r.json();
}

// ─── RENDER: SPIŻARNIA ───────────────────────────────────────────────────────

function renderPantry() {
    const container = document.getElementById('pantryList');
    const search = document.getElementById('pantrySearch').value.toLowerCase();
    const catFilter = document.getElementById('pantryFilterCategory').value;

    const grouped = {};
    const filtered = ingredients.filter(ing =>
        ing.name.toLowerCase().includes(search) &&
        (!catFilter || ing.category === catFilter)
    );

    filtered.forEach(ing => {
        const cat = ing.category || 'Inne';
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(ing);
    });

    if (filtered.length === 0) {
        container.innerHTML = '<p class="empty-info">Brak produktów.</p>';
        return;
    }

    container.innerHTML = Object.keys(grouped).sort().map(cat => `
        <div class="category-group">
            <div class="category-label">${cat}</div>
            ${grouped[cat].map(ing => `
                <div class="ingredient-item" onclick="openDetailModal(${ing.id})" title="Kliknij aby edytować szczegóły">
                    <div class="ingredient-info">
                        <div class="ingredient-name">${ing.name}</div>
                        <div class="ingredient-quantity">${ing.quantity} ${ing.unit}</div>
                        ${ing.description ? `<div class="ingredient-desc">${ing.description}</div>` : ''}
                    </div>
                    <div class="ingredient-actions" onclick="event.stopPropagation()">
                        <button class="btn-depleted" onclick="markAsDepleted(${ing.id})">Skończyło się</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `).join('');
}

// ─── RENDER: PRZEPISY ────────────────────────────────────────────────────────

function getPantryStatus(ingName, neededQty, neededUnit) {
    const found = ingredients.find(i => i.name.toLowerCase() === ingName.toLowerCase());
    if (!found) return { have: 0, haveUnit: neededUnit, enough: false };

    const haveBase = toBase(found.quantity, found.unit);
    const needBase = toBase(neededQty, neededUnit);
    const sameType = sameBaseType(found.unit, neededUnit);

    if (!sameType) return { have: found.quantity, haveUnit: found.unit, enough: null };

    const enough = haveBase >= needBase;
    return { have: found.quantity, haveUnit: found.unit, enough, diff: found.quantity - toTarget(needBase, found.unit) };
}

function toBase(qty, unit) {
    const f = { g: 1, kg: 1000, ml: 1, l: 1000, szt: 1 };
    return qty * (f[unit] || 1);
}

function toTarget(baseQty, targetUnit) {
    const f = { g: 1, kg: 1000, ml: 1, l: 1000, szt: 1 };
    return baseQty / (f[targetUnit] || 1);
}

function sameBaseType(u1, u2) {
    const weight = ['g', 'kg'];
    const volume = ['ml', 'l'];
    if (weight.includes(u1) && weight.includes(u2)) return true;
    if (volume.includes(u1) && volume.includes(u2)) return true;
    if (u1 === u2) return true;
    return false;
}

function renderRecipes() {
    const container = document.getElementById('recipesList');
    const search = document.getElementById('recipeSearch').value.toLowerCase();
    const filtered = recipes.filter(r => r.name.toLowerCase().includes(search));

    if (filtered.length === 0) {
        container.innerHTML = '<p class="empty-info">Brak przepisów.</p>';
        return;
    }

    container.innerHTML = filtered.map(recipe => {
        const ings = recipe.ingredients || [];
        const allOk = ings.every(i => getPantryStatus(i.ingredientName, i.quantity, i.unit).enough === true);
        const statusDot = ings.length > 0
            ? (allOk ? '<span class="dot-ok" title="Masz wszystkie składniki">●</span>'
                     : '<span class="dot-warn" title="Brakuje niektórych składników">●</span>')
            : '';

        return `
        <div class="recipe-item">
            <div class="recipe-header" onclick="toggleRecipe(${recipe.id})">
                <span class="recipe-name">${statusDot} ${recipe.name}</span>
                <span class="toggle-icon">▼</span>
            </div>
            <div class="recipe-details" id="recipe-${recipe.id}">
                ${ings.length > 0 ? ings.map((ing, idx) => {
                    const st = getPantryStatus(ing.ingredientName, ing.quantity, ing.unit);
                    let statusHtml = '';
                    if (st.enough === true)
                        statusHtml = `<span class="pantry-ok">✓ Masz: ${st.have}${st.haveUnit} | Zostanie: ${Math.round(st.diff * 100) / 100}${st.haveUnit}</span>`;
                    else if (st.enough === false)
                        statusHtml = `<span class="pantry-warn">✗ Masz: ${st.have}${st.haveUnit} | Brakuje: ${Math.round(Math.abs(st.diff) * 100) / 100}${st.haveUnit}</span>`;
                    else
                        statusHtml = `<span class="pantry-unknown">? Masz: ${st.have} ${st.haveUnit}</span>`;

                    return `
                    <div class="recipe-ingredient">
                        <input type="checkbox" id="ing-${recipe.id}-${idx}" checked>
                        <label for="ing-${recipe.id}-${idx}">${ing.ingredientName}</label>
                        <div class="quantity-controls">
                            <input type="number" value="${ing.quantity}" step="0.01" id="qty-${recipe.id}-${idx}">
                            <span>${ing.unit}</span>
                        </div>
                    </div>
                    <div class="pantry-status">${statusHtml}</div>`;
                }).join('') : '<p class="empty-info">Brak składników.</p>'}
                <div class="recipe-actions">
                    <button class="btn-execute" onclick="executeRecipe(${recipe.id})">Zatwierdź i odejmij ze spiżarni</button>
                    <button class="btn-shopping-recipe" onclick="addMissingToShopping(${recipe.id})">🛒 Brakujące na listę zakupów</button>
                    <button class="btn-delete-recipe" onclick="deleteRecipe(event, ${recipe.id})">Usuń przepis</button>
                </div>
            </div>
        </div>`;
    }).join('');
}

// ─── RENDER: LISTA ZAKUPÓW ───────────────────────────────────────────────────

function renderShopping() {
    const container = document.getElementById('shoppingList');
    if (shoppingItems.length === 0) {
        container.innerHTML = '<p class="empty-info">Lista zakupów jest pusta.</p>';
        return;
    }

    const grouped = {};
    shoppingItems.forEach(item => {
        const cat = item.category || 'Inne';
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(item);
    });

    container.innerHTML = Object.keys(grouped).sort().map(cat => `
        <div class="category-group">
            <div class="category-label">${cat}</div>
            ${grouped[cat].map(item => `
                <div class="shopping-item ${item.checked ? 'checked' : ''}">
                    <input type="checkbox" ${item.checked ? 'checked' : ''}
                           onchange="toggleShoppingItem(${item.id})">
                    <span class="shopping-name">${item.name}</span>
                    <span class="shopping-qty">${item.quantity} ${item.unit}</span>
                    <button class="btn-remove-small" onclick="deleteShoppingItem(${item.id})">✕</button>
                </div>
            `).join('')}
        </div>
    `).join('');
}

// ─── RENDER: SKOŃCZYŁO SIĘ ──────────────────────────────────────────────────

function renderDepleted() {
    const container = document.getElementById('depletedList');
    
    if (depletedIngredients.length === 0) {
        container.innerHTML = '<p class="empty-info">Lista jest pusta.</p>';
        return;
    }

    container.innerHTML = depletedIngredients.map(d => `
        <div class="depleted-item" onclick="openRestoreModal(${d.id}, '${d.name}')">
            <div class="depleted-info">
                <div class="depleted-name">${d.name}</div>
                <div class="depleted-date">${formatDate(d.dateAdded)}</div>
            </div>
            <div class="depleted-actions">
                <span class="restore-hint">kliknij, aby przywrócić</span>
                <button class="btn-remove-small" style="margin-left:15px; font-size:1.2em;" onclick="deleteDepletedPermanently(event, ${d.id})" title="Usuń na stałe">🗑️</button>
            </div>
        </div>
    `).join('');
}

// ─── MODAL HELPERS ───────────────────────────────────────────────────────────

function openModal(id) {
    document.getElementById(id).classList.add('active');
}

function closeModals() {
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
}

function openDetailModal(ingredientId) {
    const ing = ingredients.find(i => i.id === ingredientId);
    if (!ing) return;
    document.getElementById('detailModalTitle').textContent = ing.name;
    document.getElementById('detailIngredientId').value = ing.id;
    document.getElementById('detailIngredientQuantity').value = ing.quantity;
    setSelectValue('detailIngredientUnit', ing.unit);
    setSelectValue('detailIngredientCategory', ing.category || 'Inne');
    document.getElementById('detailIngredientDescription').value = ing.description || '';
    openModal('detailModal');
}

function openRestoreModal(depletedId, name) {
    document.getElementById('restoreIngredientId').value = depletedId;
    document.getElementById('restoreIngredientName').textContent = `Przywróć: ${name}`;
    document.getElementById('restoreIngredientForm').reset();
    openModal('restoreModal');
}

function openAddRecipeModal() {
    document.getElementById('addRecipeForm').reset();
    document.getElementById('recipeIngredientsContainer').innerHTML = '';
    addRecipeIngredientRow();
    openModal('addRecipeModal');
}

function setSelectValue(selectId, value) {
    const sel = document.getElementById(selectId);
    const opt = [...sel.options].find(o => o.value === value);
    if (opt) sel.value = value;
}

function toggleRecipe(recipeId) {
    document.getElementById(`recipe-${recipeId}`).classList.toggle('active');
}

// ─── SPIŻARNIA: AKCJE ───────────────────────────────────────────────────────

async function handleAddIngredient(e) {
    e.preventDefault();
    await post(`${API_URL}/ingredients`, {
        name: document.getElementById('ingredientName').value,
        quantity: parseFloat(document.getElementById('ingredientQuantity').value),
        unit: document.getElementById('ingredientUnit').value,
        category: document.getElementById('ingredientCategory').value
    });
    closeModals();
    await loadIngredients();
}

async function handleSaveDetail(e) {
    e.preventDefault();
    const id = document.getElementById('detailIngredientId').value;
    await put(`${API_URL}/ingredients/${id}`, {
        quantity: parseFloat(document.getElementById('detailIngredientQuantity').value),
        unit: document.getElementById('detailIngredientUnit').value,
        category: document.getElementById('detailIngredientCategory').value,
        description: document.getElementById('detailIngredientDescription').value
    });
    closeModals();
    await loadIngredients();
}

async function markAsDepleted(ingredientId) {
    if (!confirm('Oznaczyć jako "skończyło się"?')) return;
    await fetch(`${API_URL}/ingredients/${ingredientId}/depleted`, { method: 'DELETE' });
    await loadIngredients();
    await loadDepleted();
}

async function handleRestoreIngredient(e) {
    e.preventDefault();
    const id = document.getElementById('restoreIngredientId').value;
    await post(`${API_URL}/depleted/${id}/restore`, {
        quantity: parseFloat(document.getElementById('restoreIngredientQuantity').value),
        unit: document.getElementById('restoreIngredientUnit').value
    });
    closeModals();
    await loadDepleted();
    await loadIngredients();
}

// ─── PRZEPISY: AKCJE ─────────────────────────────────────────────────────────

function addRecipeIngredientRow() {
    const container = document.getElementById('recipeIngredientsContainer');
    const row = document.createElement('div');
    row.className = 'recipe-ingredient-row';
    const unitOpts = UNITS.map(u => `<option value="${u}">${u}</option>`).join('');
    row.innerHTML = `
        <input type="text" placeholder="Nazwa składnika" class="ri-name" required>
        <input type="number" placeholder="Ilość" step="0.01" class="ri-quantity" required>
        <select class="ri-unit">${unitOpts}</select>
        <button type="button" class="btn-remove-row" onclick="this.parentElement.remove()">✕</button>
    `;
    container.appendChild(row);
}

async function handleAddRecipe(e) {
    e.preventDefault();
    const name = document.getElementById('recipeName').value.trim();
    const rows = document.querySelectorAll('.recipe-ingredient-row');
    const ingredientsList = [];
    let valid = true;

    rows.forEach(row => {
        const ingredientName = row.querySelector('.ri-name').value.trim();
        const quantity = parseFloat(row.querySelector('.ri-quantity').value);
        const unit = row.querySelector('.ri-unit').value;
        if (!ingredientName || isNaN(quantity) || quantity <= 0) { valid = false; return; }
        ingredientsList.push({ ingredientName, quantity, unit });
    });

    if (!valid || ingredientsList.length === 0) {
        alert('Wypełnij poprawnie wszystkie pola składników.');
        return;
    }
    await post(`${API_URL}/recipes`, { name, ingredients: ingredientsList });
    closeModals();
    await loadRecipes();
}

async function deleteRecipe(event, recipeId) {
    event.stopPropagation();
    if (!confirm('Usunąć przepis?')) return;
    await fetch(`${API_URL}/recipes/${recipeId}`, { method: 'DELETE' });
    await loadRecipes();
}

async function executeRecipe(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;
    const selected = [];
    (recipe.ingredients || []).forEach((ing, idx) => {
        const cb = document.getElementById(`ing-${recipeId}-${idx}`);
        const qty = document.getElementById(`qty-${recipeId}-${idx}`);
        if (cb && cb.checked) selected.push({ ingredientName: ing.ingredientName, quantity: parseFloat(qty.value), unit: ing.unit });
    });
    if (selected.length === 0) { alert('Wybierz przynajmniej jeden składnik.'); return; }
    await post(`${API_URL}/recipes/${recipeId}/execute`, selected);
    await loadIngredients();
    await loadDepleted();
}

async function addMissingToShopping(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;
    const missing = [];
    (recipe.ingredients || []).forEach(ing => {
        const st = getPantryStatus(ing.ingredientName, ing.quantity, ing.unit);
        if (st.enough === false) {
            const shortfall = Math.round(Math.abs(st.diff) * 100) / 100;
            missing.push({ name: ing.ingredientName, quantity: shortfall, unit: ing.unit, category: 'Inne' });
        } else if (st.enough === null) {
            missing.push({ name: ing.ingredientName, quantity: ing.quantity, unit: ing.unit, category: 'Inne' });
        }
    });
    if (missing.length === 0) { alert('Masz wszystkie składniki tego przepisu!'); return; }
    await post(`${API_URL}/shopping/batch`, missing);
    await loadShopping();
    alert(`Dodano ${missing.length} brakujących składników do listy zakupów.`);
    
}
// Trwałe usunięcie z historii
async function deleteDepletedPermanently(event, id) {
    event.stopPropagation(); // Zapobiega otwarciu modala przywracania
    if (!confirm('Czy na pewno chcesz usunąć ten element całkowicie z pamięci aplikacji?')) return;
    
    await fetch(`${API_URL}/depleted/${id}`, { method: 'DELETE' });
    await loadDepleted();
}
// ─── LISTA ZAKUPÓW: AKCJE ────────────────────────────────────────────────────

async function handleAddShoppingItem(e) {
    e.preventDefault();
    await post(`${API_URL}/shopping`, {
        name: document.getElementById('shoppingItemName').value,
        quantity: parseFloat(document.getElementById('shoppingItemQuantity').value),
        unit: document.getElementById('shoppingItemUnit').value,
        category: document.getElementById('shoppingItemCategory').value
    });
    closeModals();
    await loadShopping();
}

async function toggleShoppingItem(id) {
    await post(`${API_URL}/shopping/${id}/toggle`, {});
    await loadShopping();
}

async function deleteShoppingItem(id) {
    await fetch(`${API_URL}/shopping/${id}`, { method: 'DELETE' });
    await loadShopping();
}

async function moveCheckedToPantry() {
    const checked = shoppingItems.filter(i => i.checked);
    if (checked.length === 0) { alert('Zaznacz produkty do przeniesienia.'); return; }
    await post(`${API_URL}/shopping/move-to-pantry`, {});
    await loadShopping();
    await loadIngredients();
}

async function deleteCheckedShopping() {
    const checked = shoppingItems.filter(i => i.checked);
    if (checked.length === 0) { alert('Zaznacz produkty do usunięcia.'); return; }
    await fetch(`${API_URL}/shopping/checked`, { method: 'DELETE' });
    await loadShopping();
}

// ─── SPOONACULAR ─────────────────────────────────────────────────────────────

async function searchSpoonacular() {
    const query = document.getElementById('spoonacularSearch').value.trim();
    if (!query) return;
    const container = document.getElementById('spoonacularResults');
    container.innerHTML = '<p class="empty-info">Wyszukiwanie...</p>';
    try {
        const data = await fetchJSON(`${API_URL}/spoonacular/search?query=${encodeURIComponent(query)}`);
        const results = data.results || [];
        if (results.length === 0) {
            container.innerHTML = '<p class="empty-info">Brak wyników.</p>';
            return;
        }
        container.innerHTML = `<div class="spoonacular-grid">
            ${results.map(r => `
                <div class="spoonacular-card" onclick="openSpoonacularDetail(${r.id}, '${escapeAttr(r.title)}')">
                    ${r.image ? `<img src="${r.image}" alt="${escapeAttr(r.title)}">` : '<div class="no-img">🍽️</div>'}
                    <div class="spoon-card-title">${r.title}</div>
                </div>
            `).join('')}
        </div>`;
    } catch {
        container.innerHTML = '<p class="empty-info">Błąd połączenia z Spoonacular.</p>';
    }
}

async function openSpoonacularDetail(id, title) {
    document.getElementById('spoonacularDetailTitle').textContent = title;
    document.getElementById('spoonacularDetailContent').innerHTML = '<p class="empty-info">Ładowanie składników...</p>';
    openModal('spoonacularDetailModal');

    try {
        const data = await fetchJSON(`${API_URL}/spoonacular/recipe/${id}`);
        spoonacularCurrentRecipe = data;
        const ings = data.extendedIngredients || [];
        document.getElementById('spoonacularDetailContent').innerHTML = `
            <p class="spoon-servings">Porcje: ${data.servings || '?'}</p>
            <ul class="spoon-ingredients">
                ${ings.map(i => {
    const converted = processSpoonacularIngredient(i.amount, i.unit);
    return `<li>${translateIngredient(i.name)} — ${Math.round(converted.amount * 100) / 100} ${converted.unit}</li>`;
}).join('')}
            </ul>
            ${data.sourceUrl ? `<a href="${data.sourceUrl}" target="_blank" class="spoon-source">Otwórz oryginalny przepis ↗</a>` : ''}
        `;
    } catch {
        document.getElementById('spoonacularDetailContent').innerHTML = '<p class="empty-info">Błąd ładowania przepisu.</p>';
    }
}

async function importSpoonacularRecipe() {
    if (!spoonacularCurrentRecipe) return;
    const ings = (spoonacularCurrentRecipe.extendedIngredients || []).map(i => {
        const converted = processSpoonacularIngredient(i.amount, i.unit);
        return {
            ingredientName: translateIngredient(i.name),
            quantity: Math.round(converted.amount * 100) / 100, // Zapisze przeliczoną wartość
            unit: converted.unit // Zapisze prawidłową jednostkę (g, ml, szt itd.)
        };
    });
    
    await post(`${API_URL}/recipes`, { name: spoonacularCurrentRecipe.title, ingredients: ings });
    closeModals();
    await loadRecipes();
    alert(`Przepis "${spoonacularCurrentRecipe.title}" został dodany do Twoich przepisów.`);
}

// Nowa funkcja przeliczająca jednostki i ilości
function processSpoonacularIngredient(amount, unit) {
    if (!unit) return { amount: amount, unit: 'szt' };
    const u = unit.toLowerCase();

    // Metryczne 
    if (['g', 'gram', 'grams'].includes(u)) return { amount: amount, unit: 'g' };
    if (['kg', 'kilogram', 'kilograms'].includes(u)) return { amount: amount, unit: 'kg' };
    if (['ml', 'milliliter', 'milliliters', 'millilitre'].includes(u)) return { amount: amount, unit: 'ml' };
    if (['l', 'liter', 'liters', 'litre'].includes(u)) return { amount: amount, unit: 'l' };

    // Amerykańskie objętości 
    if (['cup', 'cups', 'c'].includes(u)) return { amount: amount * 250, unit: 'ml' };
    if (['tablespoon', 'tablespoons', 'tbsp', 'tbs'].includes(u)) return { amount: amount * 15, unit: 'ml' };
    if (['teaspoon', 'teaspoons', 'tsp', 't'].includes(u)) return { amount: amount * 5, unit: 'ml' };
    if (['fluid ounce', 'fluid ounces', 'fl oz'].includes(u)) return { amount: amount * 30, unit: 'ml' };

    // Amerykańskie wagi 
    if (['ounce', 'ounces', 'oz'].includes(u)) return { amount: amount * 28.35, unit: 'g' };
    if (['pound', 'pounds', 'lb', 'lbs'].includes(u)) return { amount: amount * 453.6, unit: 'g' };

  
    return { amount: amount, unit: 'szt' };
}

// ─── UTILS ───────────────────────────────────────────────────────────────────

async function post(url, body) {
    return fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
}

async function put(url, body) {
    return fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
}

function formatDate(dateString) {
    const date = new Date(dateString + 'Z');
    return date.toLocaleString('pl-PL', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit',
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    });
}

function escapeAttr(str) {
    return (str || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
}
