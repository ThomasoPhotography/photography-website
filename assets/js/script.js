// #region ***  DOM references
const bodyEl = document.body;
const toggleBtn = document.querySelector(".c-btn__toggle--theme");
const moonIcon = toggleBtn.querySelector(".moon-icon");
const sunIcon = toggleBtn.querySelector(".sun-icon");
// #endregion

// #region ***  Callback-Visualisation
function showDarkMode(isDark) {
    bodyEl.classList.toggle("dark-mode", isDark);
    moonIcon.classList.toggle("hidden", isDark);
    sunIcon.classList.toggle("hidden", !isDark);
}
// #endregion

// #region ***  Callback-No Visualisation
function callbackToggleTheme() {
    const newMode = !bodyEl.classList.contains("dark-mode");
    showDarkMode(newMode);
    localStorage.setItem("darkModeEnabled", newMode);
}
// #endregion

// #region ***  Data Access
function getInitialTheme() {
    // Only use stored value; otherwise default to light
    return localStorage.getItem("darkModeEnabled") === "true";
}
// #endregion

// #region ***  Event Listeners
function listenToToggle() {
    toggleBtn.addEventListener("click", callbackToggleTheme);
}
// #endregion

// #region ***  Init / DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
    // apply saved theme (false if never set)
    showDarkMode(getInitialTheme());
    listenToToggle();
});
// #endregion
