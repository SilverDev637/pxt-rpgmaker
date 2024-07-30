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
        _on_select: () => void = () => {}
        

        constructor(icon: Image) {
            this._icon = icon
        }

        //% block="on select $this UI"
        //% weight=95 blockAllowMultiple=1 afterOnStart=true
        //% this.defl=UI
        //% this.shadow=variables_get
        onSelect(a: () => void) {
            this._on_select = a
            RPGMaker.clearImage()
            basic.pause(100)
        }

        //% block="$this get icon"
        //% weight=90 color="#6d5329"
        //% this.defl=UI
        //% this.shadow=variables_get
        icon(): Image {
            return this._icon
        }

        //% block="$this set icon to$newIcon"
        //% weight=85 color="#6d5329"
        //% this.defl=UI
        //% this.shadow=variables_get
        setIcon(newIcon: Image) {
            this._icon = newIcon
        }

        //% block="$this enable"
        //% weight=80
        //% this.defl=UI
        //% this.shadow=variables_get
        enable() {
            this._enabled = true
        }

        //% block="$this disable"
        //% weight=75
        //% this.defl=UI
        //% this.shadow=variables_get
        disable() {
            this._enabled = true
        }

        //% block="$this is enabled?"
        //% weight=70 color="#6d5329"
        //% this.defl=UI
        //% this.shadow=variables_get
        isEnabled(): boolean {
            return this._enabled
        }

        //% block="$this is disabled?"
        //% weight=65 color="#6d5329"
        //% this.defl=UI
        //% this.shadow=variables_get
        isDisabled(): boolean {
            return !this._enabled
        }
    }
}