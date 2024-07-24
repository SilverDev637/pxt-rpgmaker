//% block="RPG - NPCs"
//% color="#004000" icon="\uf1e5"
namespace NPCs {
    //% block="create new npc on x$x y$y with dialog$dialog"
    //% 
    export function createNPC(x: number, y: number, dialog: string): npc {
        return new npc(x, y, dialog)
    }

    export class npc {
        dialog: string
        x: number
        y: number
        on_interact = () => {}
        enabled: boolean = true
        display_mode: ElementDisplayMode

        constructor(x: number, y: number, dialog: string) {
            this.x = x
            this.y = y
            this.dialog = dialog
        }

        setX(newX: number) {
            this.x = newX
        }
        
        setY(newY: number) {
            this.y = newY
        }
        
        changeX(addX: number) {
            this.x += addX
        }
        
        changeY(addY: number) {
            this.x += addY
        }

        goTo(x: number, y: number) {
            this.x = x
            this.y = y
        }

        getX(): number {
            return this.x
        }

        getY(): number {
            return this.y
        }

        setDialog(newDialog: string) {
            this.dialog = newDialog
        }

        getDialog(): string {
            return this.dialog
        }

        onInteractEvent(a: () => void) {
            this.on_interact = a
        }

        enable() {
            this.enabled = true
        }

        disable() {
            this.enabled = true
        }

        isEnabled(): boolean {
            return this.enabled
        }

        isDisabled(): boolean {
            return !this.enabled
        }

        setDisplayMode(newDisplay: ElementDisplayMode) {
            this.display_mode = newDisplay
        }

        appendToMap(id: number) {

        }
    }
}