//% block="RPG - Enemies"
//% color="#004000" icon="\uf1e5"
namespace Enemies {
    //% block="create new npc on x$x y$y with dialog$dialog"
    //% weight=100 color="#400040"
    export function createEnemie(x: number, y: number, life: number, damage: number): enemie {
        return new enemie(x, y, life, damage)
    }

    export class enemie {
        x: number
        y: number
        life: number
        damage: number
        on_death = () => { }
        enabled: boolean = true
        display_mode: ElementDisplayMode = ElementDisplayMode.Local

        constructor(x: number, y: number, life: number, damage: number) {
            this.x = x
            this.y = y
            this.life = life
            this.damage = damage
        }

        //% block="$this set x to$newX"
        //% weight=95
        //% this.defl=enemie
        //% this.shadow=variables_get
        setX(newX: number) {
            this.x = newX
        }

        //% block="$this set y to$newY"
        //% weight=90
        //% this.defl=enemie
        //% this.shadow=variables_get
        setY(newY: number) {
            this.y = newY
        }

        //% block="$this change x by$addX"
        //% weight=85
        //% this.defl=enemie
        //% this.shadow=variables_get
        changeX(addX: number) {
            this.x += addX
        }

        //% block="$this change y by$addY"
        //% weight=80
        //% this.defl=enemie
        //% this.shadow=variables_get
        changeY(addY: number) {
            this.x += addY
        }

        //% block="$this go to x$x y$y"
        //% weight=75
        //% this.defl=enemie
        //% this.shadow=variables_get
        goTo(x: number, y: number) {
            this.x = x
            this.y = y
        }

        //% block="$this get x"
        //% weight=70 color="#400040"
        //% this.defl=enemie
        //% this.shadow=variables_get
        getX(): number {
            return this.x
        }

        //% block="$this get y"
        //% weight=65 color="#400040"
        //% this.defl=enemie
        //% this.shadow=variables_get
        getY(): number {
            return this.y
        }

        //% block="$this set life to$newLife"
        //% weight=60
        //% this.defl=enemie
        //% this.shadow=variables_get
        setLife(newLife: number) {
            this.life = newLife
        }

        //% block="$this get life"
        //% weight=55 color="#400040"
        //% this.defl=enemie
        //% this.shadow=variables_get
        getLife(): number {
            return this.life
        }

        //% block="$this set damage to$newDamage"
        //% weight=54
        //% this.defl=enemie
        //% this.shadow=variables_get
        setDamage(newDamage: number) {
            this.damage = newDamage
        }

        //% block="$this get damage"
        //% weight=53 color="#400040"
        //% this.defl=enemie
        //% this.shadow=variables_get
        getDamage(): number {
            return this.damage
        }

        //% block="$this on death"
        //% weight=50 blockAllowMultiple=1 afterOnStart=true
        //% this.defl=enemie
        //% this.shadow=variables_get
        onDeath(a: () => void) {
            this.on_death = a
        }

        //% block="$this enable"
        //% weight=45
        //% this.defl=enemie
        //% this.shadow=variables_get
        enable() {
            this.enabled = true
        }

        //% block="$this disable"
        //% weight=40
        //% this.defl=enemie
        //% this.shadow=variables_get
        disable() {
            this.enabled = true
        }

        //% block="$this is enabled?"
        //% weight=35 color="#400040"
        //% this.defl=enemie
        //% this.shadow=variables_get
        isEnabled(): boolean {
            return this.enabled
        }

        //% block="$this is disabled?"
        //% weight=30 color="#400040"
        //% this.defl=enemie
        //% this.shadow=variables_get
        isDisabled(): boolean {
            return !this.enabled
        }

        //% block="$this set display mode to$newDisplay"
        //% weight=25
        //% this.defl=enemie
        //% this.shadow=variables_get
        //% newDisplay.defl=ElementDisplayMode.Local
        setDisplayMode(newDisplay: ElementDisplayMode) {
            this.display_mode = newDisplay
        }

        //% block="$this append to map number$id"
        //% weight=20
        //% this.defl=enemie
        //% this.shadow=variables_get
        appendToMap(id: number) {
            RPGMaker.appendToMap(this, id)
        }
    }
}