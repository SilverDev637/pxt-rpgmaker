//% block="RPG - Triggers" weight=4
//% color="#004000" icon="\uf1e5"
namespace Triggers {
    //% block="create new trigger at x$x y$y target at x$targetX y$targetY do transition?$doTransition to map id$targetMapId"
    //% inlineInputMode=inline weight=120 color="#400040"
    export function createTrigger(x: number, y: number, activation: TriggerActivation): trigger {
        return new trigger(x, y, activation)
    }

    export class trigger {
        kind: 'trigger' = 'trigger'
        private _x: number
        private _y: number
        private _activation: TriggerActivation
        private _action = () => { }
        private _enabled = true
        private _display_mode = ElementDisplayMode.Local
        constructor(x: number, y: number, activation: TriggerActivation) {
            this._x = x
            this._y = y
            this._activation = activation
        }

        //% block="$this set x to$newX"
        //% weight=95
        //% this.defl=trigger
        //% this.shadow=variables_get
        setX(newX: number) {
            this._x = newX
        }

        //% block="$this set y to$newY"
        //% weight=90
        //% this.defl=trigger
        //% this.shadow=variables_get
        setY(newY: number) {
            this._y = newY
        }

        //% block="$this change x by$addX"
        //% weight=85
        //% this.defl=trigger
        //% this.shadow=variables_get
        changeX(addX: number) {
            this._x += addX
        }

        //% block="$this change y by$addY"
        //% weight=80
        //% this.defl=trigger
        //% this.shadow=variables_get
        changeY(addY: number) {
            this._x += addY
        }

        //% block="$this go to x$x y$y"
        //% weight=75
        //% this.defl=trigger
        //% this.shadow=variables_get
        goTo(x: number, y: number) {
            this._x = x
            this._y = y
        }

        //% block="$this get x"
        //% weight=70 color="#400040"
        //% this.defl=trigger
        //% this.shadow=variables_get
        x(): number {
            return this._x
        }

        //% block="$this get y"
        //% weight=65 color="#400040"
        //% this.defl=trigger
        //% this.shadow=variables_get
        y(): number {
            return this._y
        }
        
        //% block="$this set activation$activation"
        //% weight=60
        //% this.defl=trigger
        //% this.shadow=variables_get
        setActivation(activation: TriggerActivation) {
            this._activation = activation
        }

        //% block="$this get activation"
        //% weight=55 color="#400040"
        //% this.defl=trigger
        //% this.shadow=variables_get
        activation(): number {
            return this._activation + 0
        }

        //% block="$this on trigger event"
        //% weight=50
        //% this.defl=trigger
        //% this.shadow=variables_get
        onTriggerEvent(a: () => void) {
            this._action = a
        }

        //% block="$this enable"
        //% weight=45
        //% this.defl=trigger
        //% this.shadow=variables_get
        enable() {
            this._enabled = true
        }

        //% block="$this disable"
        //% weight=40
        //% this.defl=trigger
        //% this.shadow=variables_get
        disable() {
            this._enabled = true
        }

        //% block="$this is enabled?"
        //% weight=35 color="#400040"
        //% this.defl=trigger
        //% this.shadow=variables_get
        isEnabled(): boolean {
            return this._enabled
        }

        //% block="$this is disabled?"
        //% weight=30 color="#400040"
        //% this.defl=trigger
        //% this.shadow=variables_get
        isDisabled(): boolean {
            return !this._enabled
        }

        //% block="$this set display mode to$newDisplay"
        //% weight=25
        //% this.defl=trigger
        //% this.shadow=variables_get
        //% newDisplay.defl=ElementDisplayMode.Local
        setDisplayMode(newDisplay: ElementDisplayMode) {
            this._display_mode = newDisplay
        }
    }
}