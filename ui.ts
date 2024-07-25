//% block="RPG - UIs" weight=7
//% color="#827d1d" icon="\uf1e5"
namespace UIs {
    //% block="create new UI"
    //% weight=100 color="#6d5329" inlineInputMode=inline
    export function createUI(icon: Image): ui {
        return new ui(icon)
    }
    export class ui {
        private _icon: Image
        private _enabled: boolean = true
        private _on_select = () => {}

        constructor(icon: Image) {
            this._icon = icon
        }

        //% block="on select $this UI"
        //% weight=95 blockAllowMultiple=1 afterOnStart=true
        //% this.defl=UI
        //% this.shadow=variables_get
        onSelect(a: () => void) {
            this._on_select = a
        }

        //% block="$this enable"
        //% weight=70
        //% this.defl=UI
        //% this.shadow=variables_get
        enable() {
            this._enabled = true
        }

        //% block="$this disable"
        //% weight=65
        //% this.defl=UI
        //% this.shadow=variables_get
        disable() {
            this._enabled = true
        }

        //% block="$this is enabled?"
        //% weight=60 color="#6d5329"
        //% this.defl=UI
        //% this.shadow=variables_get
        isEnabled(): boolean {
            return this._enabled
        }

        //% block="$this is disabled?"
        //% weight=55 color="#6d5329"
        //% this.defl=UI
        //% this.shadow=variables_get
        isDisabled(): boolean {
            return !this._enabled
        }
    }
}