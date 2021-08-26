import {GAME} from '../index';
import Conversion from '../Conversion/Conversion';

const _Print_undoArray = () => {
    let duplicateID = GAME.undoArray.map(i => i.id);
    let uniqueID = [];
    for(let i = 0; i < duplicateID.length; i++) {
        if(i != duplicateID.length - 1) {
            if(duplicateID[i] != duplicateID[i+1]){
                uniqueID.push(duplicateID[i]);
            }
        } else {
            uniqueID.push(duplicateID[i]);
        }
    }

    uniqueID.forEach(i => {
        GAME.undoArray.filter(j => j.id == i).forEach(k => {
            if(k.hasOwnProperty('action')){
            } else {
                let cardString = "";
                k.selection.cards.forEach(l => {cardString += Conversion.InterpretID(l.id) + " "});
            }
        })
    })
}

const Undo = {
    _Print_undoArray: _Print_undoArray
}

export default Undo;