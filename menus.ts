//% block="RPG - Menus" weight=9
//% color="#004000" icon="\uf1e5"
namespace Menus {
    //% block="create new menu"
    //% weight=100 color="#400040" inlineInputMode=inline
    export function createMenu(): menu {
        return new menu()
    }

    export class menu {
        private _on_open_event = () => {}
        private _on_close_event = () => {}
        private _guis: GUIs.gui[]
        private _last_items: boolean[] = [true, true, true, true, true, true]
        constructor() {}
        appendNewGui(gui: GUIs.gui) {

        }
        onOpen(a: () => void) {
            this._on_open_event = a
        }
        onClose(a: () => void) {
            this._on_close_event = a
        }
        open() {
            this._on_open_event()
            RPGMaker.turnOff()
            //TODO: Show the first element of this._guis
        }
        close() {
            this._on_close_event()
            basic.clearScreen()
            RPGMaker.turnOn()
        }
    }
}