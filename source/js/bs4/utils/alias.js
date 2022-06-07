'use strict';

document.off = document.removeEventListener;
document.on = document.addEventListener;

Element.prototype.off = Element.prototype.removeEventListener;
Element.prototype.on = Element.prototype.addEventListener;

window.off = window.removeEventListener;
window.on = window.addEventListener;

export function onMulti(el, events, handler) {
    events.forEach(event => el.on(event, handler));
}

export function offMulti(el, events, handler) {
    events.forEach(event => el.off(event, handler));
}