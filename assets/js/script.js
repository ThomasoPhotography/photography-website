// #region ***  DOM references                           ***********
const bodyEl = document.body;
const toggleBtn = document.getElementById(".theme-toggle");
const moonIcon = toggleBtn.querySelector(".moon-icon");
const sunIcon = toggleBtn.querySelector(".sun-icon");
// #endregion

// #region ***  Callback-Visualisation - show___         ***********
function showDarkMode(isDark) {
    bodyEl.classList.toggle("dark-mode", isDark);
    moonIcon.classList.toggle("hidden", isDark);
    sunIcon.classList.toggle("hidden", !isDark);
}
// #endregion

// #region ***  Callback-No Visualisation - callback___  ***********
function callbackToggleTheme() {
    const isDark = bodyEl.classList.contains("dark-mode");
    const newMode = !isDark;
    showDarkMode(newMode);
    localStorage.setItem("darkModeEnabled", newMode);
}
// #endregion

// #region ***  Data Access - get___                     ***********
function getInitialTheme() {
    const stored = localStorage.getItem("darkModeEnabled");
    if (stored !== null) {
        return stored === "true";
    }
    // default to match system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
// #endregion

// #region ***  Event Listeners - listenTo___            ***********
function listenToToggle() {
    toggleBtn.addEventListener("click", callbackToggleTheme);
}

// #endregion

// #region ***  Init / DOMContentLoaded                  ***********
document.addEventListener("DOMContentLoaded", function () {
    // Initialization code here
    console.log("Document is fully loaded and ready.");
    const initDark = getInitialTheme();
    showDarkMode(initDark);
    listenToToggle();
});
// #endregion