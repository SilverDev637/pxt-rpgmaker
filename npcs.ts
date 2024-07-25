//% block="RPG - NPCs" weight=6
//% color="#44964d" icon="\uf1e5"
namespace NPCs {
    //% block="create new npc on x$x y$y with dialog$dialog"
    //% weight=100 color="#434c48" inlineInputMode=inline
    export function createNPC(x: number, y: number, dialog: string): npc {
        return new npc(x, y, dialog)
    }

    export class npc {
        kind: 'npc' = 'npc'
        private _dialog: string
        private _x: number
        private _y: number
        private _on_interact = () => {}
        private _enabled: boolean = true
        private _display_mode: ElementDisplayMode = ElementDisplayMode.Local

        constructor(x: number, y: number, dialog: string) {
            this._x = x
            this._y = y
            this._dialog = dialog
        }

        //% block="$this set x to$newX"
        //% weight=95
        //% this.defl=npc
        //% this.shadow=variables_get
        setX(newX: number) {
            this._x = newX
        }

        //% block="$this set y to$newY"
        //% weight=90
        //% this.defl=npc
        //% this.shadow=variables_get
        setY(newY: number) {
            this._y = newY
        }
        
        //% block="$this change x by$addX"
        //% weight=85
        //% this.defl=npc
        //% this.shadow=variables_get
        changeX(addX: number) {
            this._x += addX
        }

        //% block="$this change y by$addY"
        //% weight=80
        //% this.defl=npc
        //% this.shadow=variables_get
        changeY(addY: number) {
            this._x += addY
        }

        //% block="$this go to x$x y$y"
        //% weight=75
        //% this.defl=npc
        //% this.shadow=variables_get
        goTo(x: number, y: number) {
            this._x = x
            this._y = y
        }

        //% block="$this get x"
        //% weight=70 color="#434c48"
        //% this.defl=npc
        //% this.shadow=variables_get
        x(): number {
            return this._x
        }

        //% block="$this get y"
        //% weight=65 color="#434c48"
        //% this.defl=npc
        //% this.shadow=variables_get
        y(): number {
            return this._y
        }

        //% block="$this set dialog to$newDialog"
        //% weight=60
        //% this.defl=npc
        //% this.shadow=variables_get
        setDialog(newDialog: string) {
            this._dialog = newDialog
        }

        //% block="$this get dialog"
        //% weight=55 color="#434c48"
        //% this.defl=npc
        //% this.shadow=variables_get
        dialog(): string {
            return this._dialog
        }

        //% block="on interact with $this"
        //% weight=50 blockAllowMultiple=1 afterOnStart=true
        //% this.defl=npc
        //% this.shadow=variables_get
        onInteractEvent(a: () => void) {
            this._on_interact = a
        }

        //% block="$this enable"
        //% weight=45
        //% this.defl=npc
        //% this.shadow=variables_get
        enable() {
            this._enabled = true
        }

        //% block="$this disable"
        //% weight=40
        //% this.defl=npc
        //% this.shadow=variables_get
        disable() {
            this._enabled = true
        }

        //% block="$this is enabled?"
        //% weight=35 color="#434c48"
        //% this.defl=npc
        //% this.shadow=variables_get
        isEnabled(): boolean {
            return this._enabled
        }

        //% block="$this is disabled?"
        //% weight=30 color="#434c48"
        //% this.defl=npc
        //% this.shadow=variables_get
        isDisabled(): boolean {
            return !this._enabled
        }

        //% block="$this set display mode to$newDisplay"
        //% weight=25
        //% this.defl=npc
        //% this.shadow=variables_get
        //% newDisplay.defl=ElementDisplayMode.Local
        setDisplayMode(newDisplay: ElementDisplayMode) {
            this._display_mode = newDisplay
        }
    }
}