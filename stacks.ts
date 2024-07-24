//% block="RPG - Stacks"
//% color="#004000" icon="\uf1e5"
namespace Stacks {
    //% block="create new stack on x$x y$y"
    //% weight=100 color="#400040"
    export function createStack(x: number, y: number): stack {
        return new stack(x, y)
    }

    export class stack {
        x: number
        y: number
        content: Items.item[]
        on_pickup = () => { }
        enabled: boolean = true
        display_mode: ElementDisplayMode = ElementDisplayMode.Local

        constructor(x: number, y: number) {
            this.x = x
            this.y = y
        }

        //% block="$this set x to$newX"
        //% weight=95
        //% this.defl=stack
        //% this.shadow=variables_get
        setX(newX: number) {
            this.x = newX
        }

        //% block="$this set y to$newY"
        //% weight=90
        //% this.defl=stack
        //% this.shadow=variables_get
        setY(newY: number) {
            this.y = newY
        }

        //% block="$this change x by$addX"
        //% weight=85
        //% this.defl=stack
        //% this.shadow=variables_get
        changeX(addX: number) {
            this.x += addX
        }

        //% block="$this change y by$addY"
        //% weight=80
        //% this.defl=stack
        //% this.shadow=variables_get
        changeY(addY: number) {
            this.x += addY
        }

        //% block="$this go to x$x y$y"
        //% weight=75
        //% this.defl=stack
        //% this.shadow=variables_get
        goTo(x: number, y: number) {
            this.x = x
            this.y = y
        }

        //% block="$this get x"
        //% weight=70 color="#400040"
        //% this.defl=stack
        //% this.shadow=variables_get
        getX(): number {
            return this.x
        }

        //% block="$this get y"
        //% weight=65 color="#400040"
        //% this.defl=stack
        //% this.shadow=variables_get
        getY(): number {
            return this.y
        }

        //% block="$this append items$item|| $item1 $item2 $item3 $item4 $item5 $item6 $item7 $item8 $item9"
        //% weight=60
        //% this.defl=stack
        //% item.defl=item item1.defl=item item2.defl=item item3.defl=item item4.defl=item item5.defl=item item6.defl=item item7.defl=item item8.defl=item item9.defl=item
        //% item.shadow=variables_get item1.shadow=variables_get item2.shadow=variables_get item3.shadow=variables_get item4.shadow=variables_get item5.shadow=variables_get item6.shadow=variables_get item7.shadow=variables_get item8.shadow=variables_get item9.shadow=variables_get
        //% this.shadow=variables_get inlineInputMode=inline
        setDialog(item: Items.item, item1?: Items.item, item2?: Items.item, item3?: Items.item, item4?: Items.item, item5?: Items.item, item6?: Items.item, item7?: Items.item, item8?: Items.item, item9?: Items.item) {
            this.content.push(item)
            if (item1 == null) { this.content.push(item1) }
            if (item2 == null) { this.content.push(item2) }
            if (item3 == null) { this.content.push(item3) }
            if (item4 == null) { this.content.push(item4) }
            if (item5 == null) { this.content.push(item5) }
            if (item6 == null) { this.content.push(item6) }
            if (item7 == null) { this.content.push(item7) }
            if (item8 == null) { this.content.push(item8) }
            if (item9 == null) { this.content.push(item9) }
        }

        //% block="$this remove item at$index"
        //% weight=55
        //% this.defl=stack
        //% this.shadow=variables_get
        removeItemAt(index: number) {
            this.content.removeAt(index)
        }

        //% block="$this remove element$item"
        //% weight=54
        //% this.defl=stack
        //% this.shadow=variables_get
        //% item.defl=item
        //% item.shadow=variables_get
        removeItemElement(item: Items.item) {
            this.content.removeElement(item)
        }

        //% block="on interact with $this"
        //% weight=50 blockAllowMultiple=1 afterOnStart=true
        //% this.defl=stack
        //% this.shadow=variables_get
        onPickUpEvent(a: () => void) {
            this.on_pickup = a
        }

        //% block="$this enable"
        //% weight=45
        //% this.defl=stack
        //% this.shadow=variables_get
        enable() {
            this.enabled = true
        }

        //% block="$this disable"
        //% weight=40
        //% this.defl=stack
        //% this.shadow=variables_get
        disable() {
            this.enabled = true
        }

        //% block="$this is enabled?"
        //% weight=35 color="#400040"
        //% this.defl=stack
        //% this.shadow=variables_get
        isEnabled(): boolean {
            return this.enabled
        }

        //% block="$this is disabled?"
        //% weight=30 color="#400040"
        //% this.defl=stack
        //% this.shadow=variables_get
        isDisabled(): boolean {
            return !this.enabled
        }

        //% block="$this set display mode to$newDisplay"
        //% weight=25
        //% this.defl=stack
        //% this.shadow=variables_get
        //% newDisplay.defl=ElementDisplayMode.Local
        setDisplayMode(newDisplay: ElementDisplayMode) {
            this.display_mode = newDisplay
        }

        //% block="$this append to map number$id"
        //% weight=20
        //% this.defl=stack
        //% this.shadow=variables_get
        appendToMap(id: number) {
            RPGMaker.appendToMap(this, id)
        }
    }
}