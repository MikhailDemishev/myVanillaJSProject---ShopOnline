import initApp from './components/uiHandlers.js';
import { updateFromServerView } from './components/updateView.js'; 

window.addEventListener('DOMContentLoaded', async () => {
    //initializing event listeners
    initApp();
    //Get data and render on DOMContentLoaded
    updateFromServerView();


    //Refresh and render in an interval (every 2 min for instance) 
    setInterval(updateFromServerView, 120000);

});
