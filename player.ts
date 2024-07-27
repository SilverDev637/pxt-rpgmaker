//% block="RPG - Player" weight=10
//% color="#a44d69" icon="\uf1e5"
namespace Player {
    //% block="create new player on x$x y$y"
    //% x.min=0 x.max=4 y.min=0 y.max=4
    //% weight=100 color="#83335b" inlineInputMode=inline
    export function createPlayer(x: number, y: number): player {
        return new player(x, y)
    }

    export class player {
        private _direction: number = 0
        constructor(x: number, y: number) {
            RPGMaker._player = game.createSprite(x, y)
            RPGMaker._player.setBrightness(255)
        }

        //% block="$this set x to$newX"
        //% newX.min=0 newX.max=4
        //% weight=99
        //% this.defl=player
        //% this.shadow=variables_get
        setX(newX: number) {
            RPGMaker._player.setX(newX)
        }

        //% block="$this set y to$newY"
        //% newY.min=0 newY.max=4
        //% weight=98
        //% this.defl=player
        //% this.shadow=variables_get
        setY(newY: number) {
            RPGMaker._player.setY(newY)
        }

        //% block="$this change x by$newX"
        //% newX.min=0 newX.max=4
        //% weight=97
        //% this.defl=player
        //% this.shadow=variables_get
        changeX(newX: number) {
            RPGMaker._player.changeXBy(newX)
        }

        //% block="$this change y by$newY"
        //% newY.min=0 newY.max=4
        //% weight=96
        //% this.defl=player
        //% this.shadow=variables_get
        changeY(newY: number) {
            RPGMaker._player.changeYBy(newY)
        }

        //% block="$this go to x$x y$y"
        //% x.min=0 x.max=4 y.min=0 y.max=4
        //% weight=95
        //% this.defl=player
        //% this.shadow=variables_get
        goTo(x: number, y: number) {
            RPGMaker._player.goTo(x, y)
        }

        //% block="$this get x"
        //% weight=94 color="#83335b"
        //% this.defl=player
        //% this.shadow=variables_get
        x(): number {
            return RPGMaker._player.x()
        }

        //% block="$this get y"
        //% weight=93 color="#83335b"
        //% this.defl=player
        //% this.shadow=variables_get
        y(): number {
            return RPGMaker._player.y()
        }

        //% block="$this set direction to$direction"
        //% weight=91 color="#83335b"
        //% this.defl=player
        //% this.shadow=variables_get
        setDirection(direction: Directions) {
            this._direction = direction + 0
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
                if (RPGMaker._move) {
                    control.inBackground(() => {
                        let old_pos = [RPGMaker._player.x(), RPGMaker._player.y()]
                        RPGMaker._player.change(this._direction, -1)
                        if (RPGMaker.ledState(RPGMaker._player.x(), RPGMaker._player.y())) {
                            RPGMaker._player.change(this._direction, 1)
                        } else {
                            RPGMaker.checkForStacks(RPGMaker._player.x(), RPGMaker._player.y())
                            RPGMaker.checkForTriggers(TriggerActivation.OnStepOut, old_pos[0], old_pos[1])
                            RPGMaker.checkForTriggers(TriggerActivation.OnStepIn, RPGMaker._player.x(), RPGMaker._player.y())
                            RPGMaker.checkForWarps(RPGMaker._player.x(), RPGMaker._player.y())
                        }
                    })
                }
            })
            control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_B, EventBusValue.MICROBIT_BUTTON_EVT_DOWN, function () {
                if (RPGMaker._move) {
                    control.inBackground(() => {
                        let old_pos = [RPGMaker._player.x(), RPGMaker._player.y()]
                        RPGMaker._player.change(this._direction, 1)
                        if (RPGMaker.ledState(RPGMaker._player.x(), RPGMaker._player.y())) {
                            RPGMaker._player.change(this._direction, -1)
                        } else {
                            RPGMaker.checkForTriggers(TriggerActivation.OnStepOut, old_pos[0], old_pos[1])
                            RPGMaker.checkForTriggers(TriggerActivation.OnStepIn, RPGMaker._player.x(), RPGMaker._player.y())
                            RPGMaker.checkForWarps(RPGMaker._player.x(), RPGMaker._player.y())
                        }
                    })
                }
            })
            control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_AB, EventBusValue.MICROBIT_BUTTON_EVT_DOWN, function () {
                if (RPGMaker._move) { this._direction = this._direction == 1 ? 0 : 1 }
            })
        }
    }
}