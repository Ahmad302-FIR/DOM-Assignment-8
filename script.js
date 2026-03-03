// Key names for localStorage
const STORAGE_KEYS = {
    USER_NAME: 'userName',
    DARK_MODE: 'darkMode'
};

// ==================== DOM Elements ====================
const nameInput = document.getElementById('nameInput');
const saveNameBtn = document.getElementById('saveNameBtn');
const displayName = document.getElementById('displayName');
const removeNameBtn = document.getElementById('removeNameBtn');
const toggleDarkBtn = document.getElementById('toggleDarkBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const storageInfo = document.getElementById('storageInfo');

// ==================== Utility Functions ====================

/**
 * Updates the storage info display with current localStorage contents
 */
function updateStorageInfo() {
    const storageData = {};
    
    // Get all items from localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        try {
            // Try to parse as JSON, otherwise store as string
            storageData[key] = JSON.parse(localStorage.getItem(key));
        } catch {
            storageData[key] = localStorage.getItem(key);
        }
    }
    
    // Display formatted JSON
    storageInfo.textContent = JSON.stringify(storageData, null, 2);
}

/**
 * Displays the saved name from localStorage
 */
function displaySavedName() {
    const savedName = localStorage.getItem(STORAGE_KEYS.USER_NAME);
    
    if (savedName) {
        try {
            // Parse if it's JSON stringified
            const parsedName = JSON.parse(savedName);
            displayName.textContent = parsedName;
        } catch {
            // If not JSON, display as is
            displayName.textContent = savedName;
        }
    } else {
        displayName.textContent = 'Not set';
    }
}

/**
 * Applies dark mode based on localStorage value
 */
function applyDarkMode() {
    const darkMode = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
    
    if (darkMode === 'true') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// ==================== Event Handlers ====================

/**
 * Task 1 & 3: Save/Update Name
 * Saves input value to localStorage and updates display
 */
function handleSaveName() {
    const name = nameInput.value.trim();
    
    if (name) {
        // Save to localStorage using JSON.stringify
        localStorage.setItem(STORAGE_KEYS.USER_NAME, JSON.stringify(name));
        
        // Update display
        displayName.textContent = name;
        
        // Clear input field
        nameInput.value = '';
        
        // Update storage info
        updateStorageInfo();
    } else {
        alert('Please enter a name');
    }
}

/**
 * Task 4: Remove Name
 * Removes only the name from localStorage
 */
function handleRemoveName() {
    // Remove specific item from localStorage
    localStorage.removeItem(STORAGE_KEYS.USER_NAME);
    
    // Update display
    displayName.textContent = 'Not set';
    
    // Update storage info
    updateStorageInfo();
}

/**
 * Task 5: Toggle Dark Mode
 * Toggles dark mode class and saves state to localStorage
 */
function handleToggleDarkMode() {
    // Toggle class
    document.body.classList.toggle('dark-mode');
    
    // Check if dark mode is active
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Save state to localStorage (as string 'true' or 'false')
    localStorage.setItem(STORAGE_KEYS.DARK_MODE, isDarkMode);
    
    // Update storage info
    updateStorageInfo();
}

/**
 * Task 6: Clear All Data
 * Clears all localStorage items
 */
function handleClearAll() {
    // Clear all localStorage
    localStorage.clear();
    
    // Reset UI
    displayName.textContent = 'Not set';
    document.body.classList.remove('dark-mode');
    
    // Update storage info
    updateStorageInfo();
}

// ==================== Event Listeners ====================

// Task 1 & 3: Save Name button
saveNameBtn.addEventListener('click', handleSaveName);

// Task 4: Remove Name button
removeNameBtn.addEventListener('click', handleRemoveName);

// Task 5: Toggle Dark Mode button
toggleDarkBtn.addEventListener('click', handleToggleDarkMode);

// Task 6: Clear All button
clearAllBtn.addEventListener('click', handleClearAll);

// Optional: Allow Enter key to save name
nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSaveName();
    }
});

// ==================== Initialize on Page Load ====================

/**
 * Task 2: Display Saved Data on Page Load
 * Task 5: Apply Dark Mode on Page Load
 */
document.addEventListener('DOMContentLoaded', () => {
    // Display saved name (Task 2)
    displaySavedName();
    
    // Apply dark mode if it was enabled (Task 5)
    applyDarkMode();
    
    // Display initial storage info
    updateStorageInfo();
});

// Also handle page reload via pageshow event (for bfcache)
window.addEventListener('pageshow', () => {
    displaySavedName();
    applyDarkMode();
    updateStorageInfo();
});

// ==================== Bonus: Monitor Storage Changes ====================

// Listen for storage events (changes in other tabs)
window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEYS.USER_NAME) {
        displaySavedName();
    } else if (e.key === STORAGE_KEYS.DARK_MODE) {
        applyDarkMode();
    }
    updateStorageInfo();
});

// Log when localStorage is used (for learning purposes)
console.log('LocalStorage Assignment Loaded');
console.log('Available methods:');
console.log('- setItem()');
console.log('- getItem()'); 
console.log('- removeItem()');
console.log('- clear()');
console.log('- JSON.stringify()');
console.log('- JSON.parse()');