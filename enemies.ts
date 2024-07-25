//% block="RPG - Enemies" weight=5
//% color="#AD4225" icon="\uf1e5"
namespace Enemies {
    //% block="create new enemie on x$x y$y with life$life damage$damage"
    //% weight=100 color="#892c2f" inlineInputMode=inline
    export function createEnemie(x: number, y: number, life: number, damage: number): enemie {
        return new enemie(x, y, life, damage)
    }

    export class enemie {
        kind: 'enemie' = 'enemie'
        private _x: number
        private _y: number
        private _life: number
        private _damage: number
        private _on_death = () => { }
        private _enabled: boolean = true
        private _display_mode: ElementDisplayMode = ElementDisplayMode.Local

        constructor(x: number, y: number, life: number, damage: number) {
            this._x = x
            this._y = y
            this._life = life
            this._damage = damage
        }

        //% block="$this set x to$newX"
        //% weight=95
        //% this.defl=enemie
        //% this.shadow=variables_get
        setX(newX: number) {
            this._x = newX
        }

        //% block="$this set y to$newY"
        //% weight=90
        //% this.defl=enemie
        //% this.shadow=variables_get
        setY(newY: number) {
            this._y = newY
        }

        //% block="$this change x by$addX"
        //% weight=85
        //% this.defl=enemie
        //% this.shadow=variables_get
        changeX(addX: number) {
            this._x += addX
        }

        //% block="$this change y by$addY"
        //% weight=80
        //% this.defl=enemie
        //% this.shadow=variables_get
        changeY(addY: number) {
            this._x += addY
        }

        //% block="$this go to x$x y$y"
        //% weight=75
        //% this.defl=enemie
        //% this.shadow=variables_get
        goTo(x: number, y: number) {
            this._x = x
            this._y = y
        }

        //% block="$this get x"
        //% weight=70 color="#892c2f"
        //% this.defl=enemie
        //% this.shadow=variables_get
        x(): number {
            return this._x
        }

        //% block="$this get y"
        //% weight=65 color="#892c2f"
        //% this.defl=enemie
        //% this.shadow=variables_get
        y(): number {
            return this._y
        }

        //% block="$this set life to$newLife"
        //% weight=60
        //% this.defl=enemie
        //% this.shadow=variables_get
        setLife(newLife: number) {
            this._life = newLife
        }

        //% block="$this get life"
        //% weight=55 color="#892c2f"
        //% this.defl=enemie
        //% this.shadow=variables_get
        life(): number {
            return this._life
        }

        //% block="$this set damage to$newDamage"
        //% weight=54
        //% this.defl=enemie
        //% this.shadow=variables_get
        setDamage(newDamage: number) {
            this._damage = newDamage
        }

        //% block="$this get damage"
        //% weight=53 color="#892c2f"
        //% this.defl=enemie
        //% this.shadow=variables_get
        damage(): number {
            return this._damage
        }

        //% block="$this on death"
        //% weight=50 blockAllowMultiple=1 afterOnStart=true
        //% this.defl=enemie
        //% this.shadow=variables_get
        onDeath(a: () => void) {
            this._on_death = a
        }

        //% block="$this enable"
        //% weight=45
        //% this.defl=enemie
        //% this.shadow=variables_get
        enable() {
            this._enabled = true
        }

        //% block="$this disable"
        //% weight=40
        //% this.defl=enemie
        //% this.shadow=variables_get
        disable() {
            this._enabled = true
        }

        //% block="$this is enabled?"
        //% weight=35 color="#892c2f"
        //% this.defl=enemie
        //% this.shadow=variables_get
        isEnabled(): boolean {
            return this._enabled
        }

        //% block="$this is disabled?"
        //% weight=30 color="#892c2f"
        //% this.defl=enemie
        //% this.shadow=variables_get
        isDisabled(): boolean {
            return !this._enabled
        }

        //% block="$this set display mode to$newDisplay"
        //% weight=25
        //% this.defl=enemie
        //% this.shadow=variables_get
        //% newDisplay.defl=ElementDisplayMode.Local
        setDisplayMode(newDisplay: ElementDisplayMode) {
            this._display_mode = newDisplay
        }
    }
}