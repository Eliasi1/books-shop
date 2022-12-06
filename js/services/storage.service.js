'use strict';

function saveToStorage(key,value){
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key){
    var val =localStorage.getItem(key)
    return JSON.parse(val)
}