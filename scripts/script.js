// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

// Adding functionality for popState
window.addEventListener('popstate', (e) => {
  router.setState("/"+e.target.location.hash, e.state);
});

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        let entryNum = document.querySelector('main').childElementCount + 1;
        let entryString = entryNum.toString();
        newPost.entry = entry;
        // adding an event listener for each entry
        newPost.addEventListener('click', () => {
          history.pushState({entry, entryNum}, null, "#entry"+entryString);
          router.setState("/#entry",{entry, entryNum});
        })

        document.querySelector('main').appendChild(newPost);
      });
    });
});

const body = document.getElementsByTagName("BODY")[0];
const h1 = body.firstElementChild.firstElementChild;
const settings = body.firstElementChild.lastElementChild;

h1.addEventListener('click', () => {
  history.pushState(null, null, "/");
  router.setState("/",null);
});

settings.addEventListener('click', () => {
  history.pushState(null, null, "#settings")
  router.setState("/#settings",null);
});