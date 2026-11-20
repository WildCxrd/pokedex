const TIMER_DELAY_MILLISECONDS = 400;
let timer;

function showMainListLoader() {
    const mainListLoader = document.getElementById("mainListLoader");
    mainListLoader.classList.add("open");
}

function closeMainListLoader() {
    const mainListLoader = document.getElementById("mainListLoader");
    mainListLoader.classList.remove("open");
}

function showPokemonDetailsLoaderDialog() {
    showDelayedDialogModal("pokemonDetailsLoaderDialog");
}

function closePokemonDetailsLoaderDialog() {
    closeDelayedDialog("pokemonDetailsLoaderDialog");
}

function showDelayedDialogModal(dialogName) {
    timer = setTimeout(function () {
        const dialog = document.getElementById(dialogName.toString());
        dialog.showModal();
    }, TIMER_DELAY_MILLISECONDS);
}

function closeDelayedDialog(dialogName) {
    clearTimeout(timer);
    const dialog = document.getElementById(dialogName.toString());
    dialog.close();
}