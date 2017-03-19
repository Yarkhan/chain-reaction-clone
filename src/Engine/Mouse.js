class Mouse{
    constructor(el){
        this.el = el;
        this.el.addEventListener('mouseup', e => this.mouseUp(e));
        this.el.addEventListener('mousedown', e => this.mouseDown(e));
        this.el.addEventListener('mousemove', e => this.mouseMove(e));
        this.el.addEventListener('touchstart', e => this.touchStart(e));
        this.el.addEventListener('touchend', e => this.touchEnd(e));
        this.isDown = false;
        this.position = {x:0,y:0};
    }
    mouseUp(e){
        this.isDown = false;
    }
    mouseDown(e){
        this.isDown = true;
    }
    touchStart(e){
        this.isDown = true;
        this.mouseMove(e.changedTouches[0]);
    }
    touchEnd(e){
        this.isDown = false;
    }
    mouseMove(e){
        this.position.x = e.clientX;
        this.position.y = e.clientY;
    }
}
export default Mouse;
