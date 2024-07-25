//% block="RPG - Stacks" weight=4
//% color="#5649a8" icon="\uf1e5"
namespace Stacks {
    //% block="create new stack on x$x y$y"
    //% weight=100 color="#51378e" inlineInputMode=inline
    export function createStack(x: number, y: number): stack {
        return new stack(x, y)
    }

    export class stack {
        kind: 'stack' = 'stack'
        private _x: number
        private _y: number
        private _content: Items.item[] = [null, null, null, null, null, null, null, null, null, null, null]
        private _on_pickup = () => { }
        private _enabled: boolean = true
        private _display_mode: ElementDisplayMode = ElementDisplayMode.Local

        constructor(x: number, y: number) {
            this._x = x
            this._y = y
        }

        //% block="$this set x to$newX"
        //% weight=95
        //% this.defl=stack
        //% this.shadow=variables_get
        setX(newX: number) {
            this._x = newX
        }

        //% block="$this set y to$newY"
        //% weight=90
        //% this.defl=stack
        //% this.shadow=variables_get
        setY(newY: number) {
            this._y = newY
        }

        //% block="$this change x by$addX"
        //% weight=85
        //% this.defl=stack
        //% this.shadow=variables_get
        changeX(addX: number) {
            this._x += addX
        }

        //% block="$this change y by$addY"
        //% weight=80
        //% this.defl=stack
        //% this.shadow=variables_get
        changeY(addY: number) {
            this._x += addY
        }

        //% block="$this go to x$x y$y"
        //% weight=75
        //% this.defl=stack
        //% this.shadow=variables_get
        goTo(x: number, y: number) {
            this._x = x
            this._y = y
        }

        //% block="$this get x"
        //% weight=70 color="#51378e"
        //% this.defl=stack
        //% this.shadow=variables_get
        x(): number {
            return this._x
        }

        //% block="$this get y"
        //% weight=65 color="#51378e"
        //% this.defl=stack
        //% this.shadow=variables_get
        y(): number {
            return this._y
        }

        //% block="$this append item$item"
        //% weight=60
        //% this.defl=stack
        //% item.defl=item
        //% item.shadow=variables_get
        //% this.shadow=variables_get inlineInputMode=inline
        appendItem(item: Items.item) {
            let min_index = -1
            for (let i = 0; i < this._content.length; i++) {
                if (this._content[i] == null) {
                    min_index = i
                    break
                }
            }
            if (min_index > -1) {
                this._content[min_index] = item
            }
        }

        //% block="$this remove item at$index"
        //% weight=55
        //% this.defl=stack
        //% this.shadow=variables_get
        removeItemAt(index: number) {
            this._content[index] = null
        }

        //% block="$this remove element$item"
        //% weight=54
        //% this.defl=stack
        //% this.shadow=variables_get
        //% item.defl=item
        //% item.shadow=variables_get
        removeItemElement(item: Items.item) {
            this._content[this._content.indexOf(item)] = null
        }

        //% block="$this content"
        //% weight=52
        //% this.defl=stack
        //% this.shadow=variables_get
        content(): Items.item[] {
            let content: Items.item[] = []
            for (let i of this._content) {
                if (i != null) {
                    content.push(i)
                }
            }
            return content
        }

        //% block="on pick $this up"
        //% weight=50 blockAllowMultiple=1 afterOnStart=true
        //% this.defl=stack
        //% this.shadow=variables_get
        onPickUpEvent(a: () => void) {
            this._on_pickup = a
        }

        //% block="$this enable"
        //% weight=45
        //% this.defl=stack
        //% this.shadow=variables_get
        enable() {
            this._enabled = true
        }

        //% block="$this disable"
        //% weight=40
        //% this.defl=stack
        //% this.shadow=variables_get
        disable() {
            this._enabled = true
        }

        //% block="$this is enabled?"
        //% weight=35 color="#51378e"
        //% this.defl=stack
        //% this.shadow=variables_get
        isEnabled(): boolean {
            return this._enabled
        }

        //% block="$this is disabled?"
        //% weight=30 color="#51378e"
        //% this.defl=stack
        //% this.shadow=variables_get
        isDisabled(): boolean {
            return !this._enabled
        }

        //% block="$this set display mode to$newDisplay"
        //% weight=25
        //% this.defl=stack
        //% this.shadow=variables_get
        //% newDisplay.defl=ElementDisplayMode.Local
        setDisplayMode(newDisplay: ElementDisplayMode) {
            this._display_mode = newDisplay
        }
    }
}