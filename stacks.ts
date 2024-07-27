//% block="RPG - Stacks" weight=4
//% color="#5649a8" icon="\uf1e5"
namespace Stacks {
    //% block="create new stack on x$x y$y"
    //% x.min=0 x.max=4 y.min=0 y.max=4
    //% weight=100 color="#51378e" inlineInputMode=inline
    export function createStack(x: number, y: number): stack {
        return new stack(x, y)
    }

    export class stack {
        kind: 'stack' = 'stack'
        private _id: number
        private _x: number
        private _y: number
        private _content: Items.item[] = [null, null, null, null, null, null, null, null, null, null, null]
        private _on_pickup = () => { }
        private _enabled: boolean = true

        constructor(x: number, y: number) {
            this._x = x
            this._y = y
            this._id = RPGMaker._stacks_collection.length
            RPGMaker._stacks_collection.push(false)
        }

        id() {
            return this._id
        }

        //% block="$this set x to$newX"
        //% newX.min=0 newX.max=4
        //% weight=95
        //% this.defl=stack
        //% this.shadow=variables_get
        setX(newX: number) {
            this._x = newX
        }

        //% block="$this set y to$newY"
        //% newY.min=0 newY.max=4
        //% weight=90
        //% this.defl=stack
        //% this.shadow=variables_get
        setY(newY: number) {
            this._y = newY
        }

        //% block="$this change x by$addX"
        //% addX.min=0 addX.max=4
        //% weight=85
        //% this.defl=stack
        //% this.shadow=variables_get
        changeX(addX: number) {
            this._x += addX
        }

        //% block="$this change y by$addY"
        //% addY.min=0 addY.max=4
        //% weight=80
        //% this.defl=stack
        //% this.shadow=variables_get
        changeY(addY: number) {
            this._x += addY
        }

        //% block="$this go to x$x y$y"
        //% x.min=0 x.max=4 y.min=0 y.max=4
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
        //% index.min=0 index.max=9
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
    }
}