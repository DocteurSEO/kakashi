import { handleRequest } from './controller.js';

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});
