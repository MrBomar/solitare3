import GameState from './Classes/GameState/GameState';
import './index.css';

let GAME = new GameState();

const onResizeRotate = (mode) => {
    GAME.allPiles.forEach(i => i.refresh(mode));
}

onResizeRotate(); //Execute function
window.addEventListener('resize', onResizeRotate);
window.addEventListener('orientationchange', onResizeRotate);
document.body.addEventListener('mousemove', (e) => {
    GAME.onMouseMove(e);
    if((e.clientX < 10) || (e.clientY < 10) || (e.clientX > window.innerWidth - 10) || (e.clientY > window.innerHeight - 10)) {
        if(GAME.selection) {
            GAME.selection.cards[0].onMouseUp(e);
        }
    }
})
export { onResizeRotate, GAME };