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
        x: number
        y: number
        activation: TriggerActivation
        action = () => { }
        enabled = true
        display_mode = ElementDisplayMode.Local
        constructor(x: number, y: number, activation: TriggerActivation) {
            this.x = x
            this.y = y
            this.activation = activation
        }

        //% block="$this set x to$newX"
        //% weight=95
        //% this.defl=trigger
        //% this.shadow=variables_get
        setX(newX: number) {
            this.x = newX
        }

        //% block="$this set y to$newY"
        //% weight=90
        //% this.defl=trigger
        //% this.shadow=variables_get
        setY(newY: number) {
            this.y = newY
        }

        //% block="$this change x by$addX"
        //% weight=85
        //% this.defl=trigger
        //% this.shadow=variables_get
        changeX(addX: number) {
            this.x += addX
        }

        //% block="$this change y by$addY"
        //% weight=80
        //% this.defl=trigger
        //% this.shadow=variables_get
        changeY(addY: number) {
            this.x += addY
        }

        //% block="$this go to x$x y$y"
        //% weight=75
        //% this.defl=trigger
        //% this.shadow=variables_get
        goTo(x: number, y: number) {
            this.x = x
            this.y = y
        }

        //% block="$this get x"
        //% weight=70 color="#400040"
        //% this.defl=trigger
        //% this.shadow=variables_get
        getX(): number {
            return this.x
        }

        //% block="$this get y"
        //% weight=65 color="#400040"
        //% this.defl=trigger
        //% this.shadow=variables_get
        getY(): number {
            return this.y
        }
        
        //% block="$this set activation$activation"
        //% weight=60
        //% this.defl=trigger
        //% this.shadow=variables_get
        setActivation(activation: TriggerActivation) {
            this.activation = activation
        }

        //% block="$this get activation"
        //% weight=55 color="#400040"
        //% this.defl=trigger
        //% this.shadow=variables_get
        getActivation(): number {
            return this.activation + 0
        }

        //% block="$this on trigger event"
        //% weight=50
        //% this.defl=Trigger
        //% this.shadow=variables_get
        onTriggerEvent(a: () => void) {
            this.action = a
        }

        //% block="$this enable"
        //% weight=45
        //% this.defl=npc
        //% this.shadow=variables_get
        enable() {
            this.enabled = true
        }

        //% block="$this disable"
        //% weight=40
        //% this.defl=npc
        //% this.shadow=variables_get
        disable() {
            this.enabled = true
        }

        //% block="$this is enabled?"
        //% weight=35 color="#400040"
        //% this.defl=npc
        //% this.shadow=variables_get
        isEnabled(): boolean {
            return this.enabled
        }

        //% block="$this is disabled?"
        //% weight=30 color="#400040"
        //% this.defl=npc
        //% this.shadow=variables_get
        isDisabled(): boolean {
            return !this.enabled
        }

        //% block="$this set display mode to$newDisplay"
        //% weight=25
        //% this.defl=npc
        //% this.shadow=variables_get
        //% newDisplay.defl=ElementDisplayMode.Local
        setDisplayMode(newDisplay: ElementDisplayMode) {
            this.display_mode = newDisplay
        }

        //% block="$this append to map number$id"
        //% weight=20
        //% this.defl=npc
        //% this.shadow=variables_get
        appendToMap(id: number) {
            RPGMaker.appendToMap(this, id)
        }
    }
}