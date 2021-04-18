import { GAME } from '../index';
import Conversion from '../Conversion/Conversion';

const getPilesAndCards = (piles_arr) => {
    piles_arr.forEach(i => {
        console.log(`${i.id} Cards: [${getStringOfCardsArray(i.cards)}]`);
    })
}

const getStringOfCardsArray = (cards_arr) => {
    let cardString = " ";
    cards_arr.forEach(j => {
        cardString += Conversion.InterpretID(j.id) + " ";
    })
    return cardString;
}

const _Print_Tableau_Cards = () => getPilesAndCards(GAME.getTableau());

const _Print_All_Piles_Cards = () => getPilesAndCards(GAME.allPiles);

const Piles = {
    _Print_Tableau_Cards: _Print_Tableau_Cards,
    _Print_All_Piles_Cards: _Print_All_Piles_Cards
}

export default Piles;