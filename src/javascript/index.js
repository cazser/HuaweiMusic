import './icons.js';
import $ from './jquery-3.6.0.js'

console.log($);
class Player{
    constructor(node){
        this.root = $(node)
    
    }
}

const app = new Player('#player')
