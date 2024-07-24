//% block="RPG - Items" weight=6
//% color="#004000" icon="\uf1e5"
namespace Items {
    //% block="create new item name$name icon$icon is stackable?$stackable objetive$objetive"
    //% icon.defl=myImage
    //% icon.shadow=variables_get
    //% weight=100 color="#400040"
    export function createItem(name: string, icon: Image, stackable: boolean, objetive: Objetives): item {
        return new item(name, icon, stackable, objetive)
    }

    export class item {
        kind: 'item' = 'item'
        name: string
        icon: Image
        stackable: boolean
        objetive: Objetives
        multiplier = 0
        on_use = () => {}
        constructor(name: string, icon: Image, stackable: boolean, objetive: Objetives) {
            this.name = name
            this.icon = icon
            this.stackable = stackable
            this.objetive = objetive
        }

        //% block="$this set name to$name"
        //% this.defl=item weight=95
        //% this.shadow=variables_get
        setName(newName: string) {
            this.name = newName
        }

        //% block="$this get name"
        //% this.defl=item weight=90 color="#400040"
        //% this.shadow=variables_get
        getName(): string {
            return this.name
        }

        //% block="$this set icon to$newIcon"
        //% this.defl=item weight=85
        //% this.shadow=variables_get
        //% newIcon.defl=myImage
        //% newIcon.shadow=variables_get
        setIcon(newIcon: Image) {
            this.icon = newIcon
        }

        //% block="$this set stackable to$stackable"
        //% this.defl=item weight=80
        //% this.shadow=variables_get
        setStackable(stackable: boolean) {
            this.stackable = stackable
        }

        //% block="$this is stackable?"
        //% this.defl=item weight=75 color="#400040"
        //% this.shadow=variables_get
        isStackable(): boolean {
            return this.stackable
        }

        //% block="$this set objetive to$newObjetive"
        //% this.defl=item weight=70
        //% this.shadow=variables_get
        setObjetive(newObjetive: Objetives) {
            this.objetive = newObjetive
        }

        //% block="$this get objetive"
        //% this.defl=item weight=65 color="#400040"
        //% this.shadow=variables_get
        getObjetive(): number {
            return this.objetive
        }

        //% block="$this set multiplier to$value"
        //% this.defl=item weight=60
        //% this.shadow=variables_get
        setMultiplier(value: number) {
            this.multiplier = value
        }

        //% block="$this get multiplier"
        //% this.defl=item weight=55 color="#400040"
        //% this.shadow=variables_get
        getMultiplier(): number {
            return this.multiplier
        }

        //% block="on use $this"
        //% weight=50 blockAllowMultiple=1 afterOnStart=true
        //% this.defl=item
        //% this.shadow=variables_get
        onUseEven(a: () => void) {
            this.on_use = a
        }
    }
}