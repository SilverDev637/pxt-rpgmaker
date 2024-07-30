//% block="RPG - Menus" weight=8
//% color="#957186" icon="\uf1e5"
namespace Menus {
    //% block="create new menu"
    //% weight=100 color="#794a6f" inlineInputMode=inline
    export function createMenu(): menu {
        return new menu()
    }

    export class menu {
        private _on_open_event = () => { }
        private _on_close_event = () => { }
        private _on_select_ui = (ui: number) => { }
        private _uis: UIs.ui[] = []
        private _enabled: boolean = true
        constructor() { }

        //% block="$this append ui$ui"
        //% weight=95
        //% this.defl=menu
        //% this.shadow=variables_get
        //% ui.defl=UI
        //% ui.shadow=variables_get
        appendUI(ui: UIs.ui) {
            this._uis.push(ui)
        }

        //% block="$this on select ui"
        //% weight=93
        //% this.defl=menu
        //% this.shadow=variables_get
        onSelectUI(a: (ui: number) => void) {
            this._on_select_ui = a
        }

        //% block="on open $this"
        //% weight=90 blockAllowMultiple=1 afterOnStart=true
        //% this.defl=menu
        //% this.shadow=variables_get
        onOpen(a: () => void) {
            RPGMaker._enabled_menus_buttons = true
            RPGMaker._move = false
            this._on_open_event = a
        }

        //% block="on close $this"
        //% weight=85 blockAllowMultiple=1 afterOnStart=true
        //% this.defl=menu
        //% this.shadow=variables_get
        onClose(a: () => void) {
            RPGMaker._enabled_menus_buttons = false
            RPGMaker._move = true
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
                    RPGMaker._move = false
                    RPGMaker._current_uis = this._uis
                    RPGMaker._selected_ui = 0
                    RPGMaker._enabled_menus_buttons = true
                    RPGMaker.updateUI()
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
                RPGMaker._move = true
                RPGMaker._enabled_menus_buttons = false
                RPGMaker._selected_ui = 0
                RPGMaker._current_uis = []
                RPGMaker.clearImage()
                RPGMaker.turnOn()
                this._on_close_event()
            }
        }

        //% block="$this remove all uis"
        //% weight=70
        //% this.defl=menu
        //% this.shadow=variables_get
        removeUIs() {
            this._uis = []
        }

        //% block="$this get and remove ui at$index"
        //% weight=70 color="#794a6f"
        //% this.defl=menu
        //% this.shadow=variables_get
        getAndRemoveUIAt(index: number): UIs.ui {
            return this._uis.removeAt(index)
        }

        //% block="$this remove ui at$index"
        //% weight=70
        //% this.defl=menu
        //% this.shadow=variables_get
        removeUIAt(index: number) {
            this._uis.removeAt(index)
        }

        //% block="$this enable"
        //% weight=15
        //% this.defl=menu
        //% this.shadow=variables_get
        enable() {
            this._enabled = true
        }

        //% block="$this disable"
        //% weight=10
        //% this.defl=menu
        //% this.shadow=variables_get
        disable() {
            this._enabled = true
        }

        //% block="$this is enabled?"
        //% weight=5 color="#794a6f"
        //% this.defl=menu
        //% this.shadow=variables_get
        isEnabled(): boolean {
            return this._enabled
        }

        //% block="$this is disabled?"
        //% weight=0 color="#794a6f"
        //% this.defl=menu
        //% this.shadow=variables_get
        isDisabled(): boolean {
            return !this._enabled
        }
    }
}