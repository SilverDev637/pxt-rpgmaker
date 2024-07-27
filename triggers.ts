//% block="RPG - Triggers" weight=1
//% color="#aa9118" icon="\uf1e5"
namespace Triggers {
    //% block="create new trigger at x$x y$y activate$activation for$times times"
    //% x.min=0 x.max=4 y.min=0 y.max=4
    //% inlineInputMode=inline weight=120 color="#906d23"
    export function createTrigger(x: number, y: number, activation: TriggerActivation, times?: number): trigger {
        return new trigger(x, y, activation, isNaN(times)?-1:times)
    }

    export class trigger {
        kind: 'trigger' = 'trigger'
        private _x: number
        private _y: number
        private _activation: TriggerActivation
        private _action = () => { }
        private _times: number
        private _enabled = true
        constructor(x: number, y: number, activation: TriggerActivation, times: number) {
            this._x = x
            this._y = y
            this._activation = activation
            this._times = times
        }

        activate() {
            if (this._times > 0 || this._times <= -1) {
                this._action()
                this._times = Math.max(this._times-1, -1)
            }
        }

        //% block="$this set x to$newX"
        //% newX.min=0 newX.max=4
        //% weight=95
        //% this.defl=trigger
        //% this.shadow=variables_get
        setX(newX: number) {
            this._x = newX
        }

        //% block="$this set y to$newY"
        //% newY.min=0 newY.max=4
        //% weight=90
        //% this.defl=trigger
        //% this.shadow=variables_get
        setY(newY: number) {
            this._y = newY
        }

        //% block="$this change x by$addX"
        //% addX.min=0 addX.max=4
        //% weight=85
        //% this.defl=trigger
        //% this.shadow=variables_get
        changeX(addX: number) {
            this._x += addX
        }

        //% block="$this change y by$addY"
        //% addY.min=0 addY.max=4
        //% weight=80
        //% this.defl=trigger
        //% this.shadow=variables_get
        changeY(addY: number) {
            this._x += addY
        }

        //% block="$this go to x$x y$y"
        //% x.min=0 x.max=4 y.min=0 y.max=4
        //% weight=75
        //% this.defl=trigger
        //% this.shadow=variables_get
        goTo(x: number, y: number) {
            this._x = x
            this._y = y
        }

        //% block="$this get x"
        //% weight=70 color="#906d23"
        //% this.defl=trigger
        //% this.shadow=variables_get
        x(): number {
            return this._x
        }

        //% block="$this get y"
        //% weight=65 color="#906d23"
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
        //% weight=55 color="#906d23"
        //% this.defl=trigger
        //% this.shadow=variables_get
        activation(): number {
            return this._activation + 0
        }

        //% block="$this activate for$times times"
        //% times.min=-1 times.max=100
        //% weight=54
        //% this.defl=trigger
        //% this.shadow=variables_get
        setTimes(times: number) {
            this._times = times
        }

        //% block="$this set infinite times"
        //% weight=53
        //% this.defl=trigger
        //% this.shadow=variables_get
        setInfTimes() {
            this._times = -1
        }

        //% block="$this activate times"
        //% weight=52
        //% this.defl=trigger
        //% this.shadow=variables_get
        times(): number {
            return this._times
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
        //% weight=35 color="#906d23"
        //% this.defl=trigger
        //% this.shadow=variables_get
        isEnabled(): boolean {
            return this._enabled
        }

        //% block="$this is disabled?"
        //% weight=30 color="#906d23"
        //% this.defl=trigger
        //% this.shadow=variables_get
        isDisabled(): boolean {
            return !this._enabled
        }
    }
}