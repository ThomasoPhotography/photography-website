// #region ***  DOM references                           ***********
const toggleModes = document.querySelectorAll(`.js-modes`);
// #endregion

// #region ***  Callback-Visualisation - show___         ***********
try {
    for (const mode of toggleModes) {
        mode.addEventListener('click', function () {
            console.log(`Mode ${mode.dataset.mode} activated`);
        });
    };
} catch (error) {
    console.error(`Error: ${error}`);
}
// #endregion

// #region ***  Callback-No Visualisation - callback___  ***********
// #endregion

// #region ***  Data Access - get___                     ***********
// #endregion

// #region ***  Event Listeners - listenTo___            ***********
// #endregion

// #region ***  Init / DOMContentLoaded                  ***********
document.addEventListener('DOMContentLoaded', function () {
    // Initialization code goes here
    console.log('Document is ready!');
});
// #endregion