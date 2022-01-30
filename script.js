import { ADD, REMOVE } from "./constants.js";

const heroesContainer = document.querySelector('.heroes');

class Hero {
    #powerCount = 10;

    constructor(name) {
        this.name = name; 
    }

    getCurrentPowerCount() {
        return this.#powerCount;
    }

    addPower() {
        this.#powerCount += 1;
    }

    removePower() {
        this.#powerCount -= 1;
    }
};

const heroes = [new Hero('Hulk'), new Hero('Geralt'), new Hero('SpiderMan'), new Hero('Batman')];

const printHallOfFame = () => {
    heroes.map(hero => {
        const html = `
            <div class='hero'>
                <p>Name: ${hero.name}</p> 
                <p id=${hero.name}>Power: ${hero.getCurrentPowerCount()}</p> 
                <button class='power-up' data-name=${hero.name}>Power Up Hero</button>
                <button class='power-remove' data-name=${hero.name}>Power Remove Hero</button>
            </div>
        `;

        heroesContainer.insertAdjacentHTML('beforeend', html);
    });

    document.querySelector('.hero-count').textContent = `Hero count: ${heroes.length}`;
};
printHallOfFame();

const buttonsAdd = document.querySelectorAll('.power-up');
const buttonsRemove = document.querySelectorAll('.power-remove');

const changePowerHandler = (change, event) => {
    const heroName = event.target.dataset.name;
    const findHero = heroes.find(hero => hero.name === heroName);
    if(change === ADD) findHero.addPower();
    if(change === REMOVE) findHero.removePower();
    const powerHero = findHero.getCurrentPowerCount();
    document.getElementById(heroName).innerHTML = `Power: ${powerHero}`;
};

buttonsAdd.forEach(btn => btn.addEventListener('click', changePowerHandler.bind(null, ADD)));
buttonsRemove.forEach(btn => btn.addEventListener('click', changePowerHandler.bind(null, REMOVE)));


