//% block="RPG - Menus" weight=8
//% color="#957186" icon="\uf1e5"
namespace Menus {
    //% block="create new menu"
    //% weight=100 color="#794a6f" inlineInputMode=inline
    export function createMenu(): menu {
        return new menu()
    }

    export class menu {
        private _on_open_event = () => {}
        private _on_close_event = () => {}
        private _uis: UIs.ui[]
        private _enabled: boolean = true
        private _last_items: boolean[] = [true, true, true, true, true, true]
        constructor() {}
        
        //% block="$this append ui$ui"
        //% weight=95
        //% this.defl=menu
        //% this.shadow=variables_get
        //% ui.defl=UI
        //% ui.shadow=variables_get
        appendUI(ui: UIs.ui) {
            this._uis.push(ui)
        }

        //% block="on open $this"
        //% weight=90 blockAllowMultiple=1 afterOnStart=true
        //% this.defl=menu
        //% this.shadow=variables_get
        onOpen(a: () => void) {
            this._on_open_event = a
        }

        //% block="on close $this"
        //% weight=85 blockAllowMultiple=1 afterOnStart=true
        //% this.defl=menu
        //% this.shadow=variables_get
        onClose(a: () => void) {
            this._on_close_event = a
        }

        //% block="open $this"
        //% weight=80
        //% this.defl=menu
        //% this.shadow=variables_get
        open() {
            if (this._enabled) {
                RPGMaker.turnOff()
                this._on_open_event()
                if (this._uis.length > 0) {
                    //TODO: Show the first element of this._uis
                } else {
                    this.close()
                }
            }
        }

        //% block="close $this"
        //% weight=75
        //% this.defl=menu
        //% this.shadow=variables_get
        close() {
            if (this._enabled) {
                RPGMaker.turnOn()
                this._on_close_event()
            }
        }

        //% block="$this enable"
        //% weight=70
        //% this.defl=menu
        //% this.shadow=variables_get
        enable() {
            this._enabled = true
        }

        //% block="$this disable"
        //% weight=65
        //% this.defl=menu
        //% this.shadow=variables_get
        disable() {
            this._enabled = true
        }

        //% block="$this is enabled?"
        //% weight=60 color="#794a6f"
        //% this.defl=menu
        //% this.shadow=variables_get
        isEnabled(): boolean {
            return this._enabled
        }

        //% block="$this is disabled?"
        //% weight=55 color="#794a6f"
        //% this.defl=menu
        //% this.shadow=variables_get
        isDisabled(): boolean {
            return !this._enabled
        }
    }
}