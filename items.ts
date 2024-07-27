//% block="RPG - Items" weight=3
//% color="#686482" icon="\uf1e5"
namespace Items {
    //% block="create new item name$name icon$icon is stackable?$stackable objetive$objetive"
    //% icon.defl=myImage
    //% icon.shadow=variables_get
    //% weight=100 color="#5b436d"
    export function createItem(name: string, icon: Image, stackable: boolean, objetive: Objetives): item {
        return new item(name, icon, stackable, objetive)
    }

    export class item {
        kind: 'item' = 'item'
        private _name: string
        _icon: Image
        private _stackable: boolean
        private _objetive: Objetives
        private _multiplier = 0
        _on_use = () => {}
        constructor(name: string, icon: Image, stackable: boolean, objetive: Objetives) {
            this._name = name
            this._icon = icon
            this._stackable = stackable
            this._objetive = objetive
        }

        //% block="$this set name to$name"
        //% this.defl=item weight=95
        //% this.shadow=variables_get
        setName(newName: string) {
            this._name = newName
        }

        //% block="$this get name"
        //% this.defl=item weight=90 color="#5b436d"
        //% this.shadow=variables_get
        name(): string {
            return this._name
        }

        //% block="$this set icon to$newIcon"
        //% this.defl=item weight=85
        //% this.shadow=variables_get
        //% newIcon.defl=myImage
        //% newIcon.shadow=variables_get
        setIcon(newIcon: Image) {
            this._icon = newIcon
        }

        //% block="$this set stackable to$stackable"
        //% this.defl=item weight=80
        //% this.shadow=variables_get
        setStackable(stackable: boolean) {
            this._stackable = stackable
        }

        //% block="$this is stackable?"
        //% this.defl=item weight=75 color="#5b436d"
        //% this.shadow=variables_get
        isStackable(): boolean {
            return this._stackable
        }

        //% block="$this set objetive to$newObjetive"
        //% this.defl=item weight=70
        //% this.shadow=variables_get
        setObjetive(newObjetive: Objetives) {
            this._objetive = newObjetive
        }

        //% block="$this get objetive"
        //% this.defl=item weight=65 color="#5b436d"
        //% this.shadow=variables_get
        objetive(): number {
            return this._objetive
        }

        //% block="$this set multiplier to$value"
        //% this.defl=item weight=60
        //% this.shadow=variables_get
        setMultiplier(value: number) {
            this._multiplier = value
        }

        //% block="$this get multiplier"
        //% this.defl=item weight=55 color="#5b436d"
        //% this.shadow=variables_get
        multiplier(): number {
            return this._multiplier
        }

        //% block="on use $this"
        //% weight=50 blockAllowMultiple=1 afterOnStart=true
        //% this.defl=item
        //% this.shadow=variables_get
        onUseEven(a: () => void) {
            this._on_use = a
        }
    }
}