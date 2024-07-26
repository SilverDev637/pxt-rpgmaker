//% block="RPG - Player" weight=10
//% color="#a44d69" icon="\uf1e5"
namespace Player {
    //% block="create new npc on x$x y$y"
    //% weight=100 color="#83335b" inlineInputMode=inline
    export function createPlayer(x: number, y: number): player {
        return new player(x, y)
    }

    export class player {
        private _sprite: game.LedSprite
        private _direction: number = 0
        private _move = true
        constructor(x: number, y: number) {
            this._sprite = game.createSprite(x, y)
            this._sprite.setBrightness(255)
        }

        //% block="$this set x to$newX"
        //% weight=99
        //% this.defl=player
        //% this.shadow=variables_get
        setX(newX: number) {
            this._sprite.setX(newX)
        }

        //% block="$this set y to$newY"
        //% weight=98
        //% this.defl=player
        //% this.shadow=variables_get
        setY(newY: number) {
            this._sprite.setY(newY)
        }

        //% block="$this change x by$newX"
        //% weight=97
        //% this.defl=player
        //% this.shadow=variables_get
        changeX(newX: number) {
            this._sprite.changeXBy(newX)
        }

        //% block="$this change y by$newY"
        //% weight=96
        //% this.defl=player
        //% this.shadow=variables_get
        changeY(newY: number) {
            this._sprite.changeYBy(newY)
        }

        //% block="$this go to x$x y$y"
        //% weight=95
        //% this.defl=player
        //% this.shadow=variables_get
        goTo(x: number, y: number) {
            this._sprite.goTo(x, y)
        }

        //% block="$this get x"
        //% weight=94 color="#83335b"
        //% this.defl=player
        //% this.shadow=variables_get
        x(): number {
            return this._sprite.x()
        }

        //% block="$this get y"
        //% weight=93 color="#83335b"
        //% this.defl=player
        //% this.shadow=variables_get
        y(): number {
            return this._sprite.y()
        }

        //% block="$this get direction"
        //% weight=91 color="#83335b"
        //% this.defl=player
        //% this.shadow=variables_get
        direction(): number {
            return this._direction
        }

        //% block="$this enable movement controls"
        //% weight=92
        //% this.defl=player
        //% this.shadow=variables_get
        enableMovementControls() {
            control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_A, EventBusValue.MICROBIT_BUTTON_EVT_DOWN, function () {
                control.inBackground(() => {
                    this._sprite.change(this._direction, -1)
                    if (RPGMaker.ledState(this._sprite.x(), this._sprite.y())) {
                        this._sprite.change(this._direction, 1)
                    }
                })
            })
            control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_B, EventBusValue.MICROBIT_BUTTON_EVT_DOWN, function () {
                control.inBackground(() => {
                    this._sprite.change(this._direction, 1)
                    if (RPGMaker.ledState(this._sprite.x(), this._sprite.y())) {
                        this._sprite.change(this._direction, -1)
                    }
                })
            })
            control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_AB, EventBusValue.MICROBIT_BUTTON_EVT_DOWN, function () {
                this._direction = this._direction == 1 ? 0 : 1
            })
        }
    }
}