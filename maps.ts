//% block="RPG - Maps" weight=10
//% color="#004000" icon="\uf1e5"
namespace Maps {
    //% block="create new map blocks$blocks with id$id"
    //% weight=100 color="#400040" inlineInputMode=inline
    //% blocks.defl=myImage
    //% blocks.shadow=variables_get
    export function createMap(blocks: Image, id: number) {
        return new map(blocks, id)
    }

    export class map {
        kind: 'map' = 'map'
        private _blocks: Image
        private _id: number
        private _enabled: boolean = true

        private _npcs: NPCs.npc[] = []
        private _enemies: Enemies.enemie[] = []
        private _stacks: Stacks.stack[] = []
        private _warps: Warps.warp[] = []
        private _triggers: Triggers.trigger[] = []

        private _sprite_blocks: game.LedSprite[] = []
        private _sprite_npcs: game.LedSprite[] = []
        private _sprite_enemies: game.LedSprite[] = []
        private _sprite_stacks: game.LedSprite[] = []
        private _enabled_warps: Warps.warp[] = []
        private _enabled_triggers: Triggers.trigger[] = []

        constructor(blocks: Image, id: number) {
            this._blocks = blocks
            this._id = id
        }

        //% block="$this set blocks to$blocks"
        //% weight=85
        //% this.defl=map blocks.defl=myImage
        //% this.shadow=variables_get blocks.shadow=variables_get
        setBlocks(blocks: Image) {
            this._blocks = blocks
        }

        //% block="$this enable"
        //% weight=80
        //% this.defl=map
        //% this.shadow=variables_get
        enable() {
            this._enabled = true
        }

        //% block="$this disable"
        //% weight=75
        //% this.defl=map
        //% this.shadow=variables_get
        disable() {
            this._enabled = true
        }

        //% block="$this is enabled?"
        //% weight=70 color="#400040"
        //% this.defl=map
        //% this.shadow=variables_get
        isEnabled(): boolean {
            return this._enabled
        }

        //% block="$this is disabled?"
        //% weight=65 color="#400040"
        //% this.defl=map
        //% this.shadow=variables_get
        isDisabled(): boolean {
            return !this._enabled
        }

        //% block="plot $this|| plot blocks?$blocks plot npcs?$npcs plot enemies?$enemies plot stacks?$stacks plot warps?$warps plot triggers?$triggers"
        //% weight=60 blockGap=16
        //% this.defl=map
        //% this.shadow=variables_get
        //% blocks.shadow="toggleOnOff"
        //% npcs.shadow="toggleOnOff"
        //% enemies.shadow="toggleOnOff"
        //% stacks.shadow="toggleOnOff"
        //% warps.shadow="toggleOnOff"
        //% triggers.shadow="toggleOnOff"
        plotElements(blocks: boolean = true, npcs: boolean = true, enemies: boolean = true, stacks: boolean = true, warps: boolean = true, triggers: boolean = true) {
            if (blocks==true) { this.plotBlocks() }
            if (npcs==true) { this.plotNPCs() }
            if (enemies==true) { this.plotEnemies() }
            if (stacks==true) { this.plotStacks() }
            if (warps==true) { this.plotWarps() }
            if (triggers==true) { this.plotTriggers() }
        }

        //% block="$this plot blocks"
        //% weight=55
        //% this.defl=map
        //% this.shadow=variables_get
        plotBlocks() {
            for (let y = 0; y < 5; y++) {
                for (let x = 0; x < 5; x++) {
                    if (this._blocks.pixel(x, y)) {
                        let sprite = game.createSprite(x, y)
                        sprite.setBrightness(196)
                        this._sprite_blocks.push(sprite)
                    }
                }
            }
        }

        //% block="$this plot npcs"
        //% weight=50
        //% this.defl=map
        //% this.shadow=variables_get
        plotNPCs() {
            for (let i = 0; i < this._npcs.length; i++) {
                let npc = this._npcs[i]
                if (npc.isEnabled()) {
                    let sprite_npc = game.createSprite(npc.x(), npc.y())
                    sprite_npc.setBrightness(196)
                    sprite_npc.setBlink(350)
                    this._sprite_npcs.push(sprite_npc)
                }
            }
        }

        //% block="$this plot enemies"
        //% weight=45
        //% this.defl=map
        //% this.shadow=variables_get
        plotEnemies() {
            for (let i = 0; i < this._enemies.length; i++) {
                let enemie = this._enemies[i]
                if (enemie.isEnabled()) {
                    let sprite_enemie = game.createSprite(enemie.x(), enemie.y())
                    sprite_enemie.setBrightness(196)
                    sprite_enemie.setBlink(50)
                    this._sprite_enemies.push(sprite_enemie)
                }
            }
        }

        //% block="$this plot stacks"
        //% weight=40
        //% this.defl=map
        //% this.shadow=variables_get
        plotStacks() {
            for (let i = 0; i < this._stacks.length; i++) {
                let stack = this._stacks[i]
                if (stack.isEnabled()) {
                    let sprite_stack = game.createSprite(stack.x(), stack.y())
                    sprite_stack.setBrightness(stack.content().length * (128/10))
                    this._sprite_stacks.push(sprite_stack)
                }
            }
        }

        //% block="$this plot warps"
        //% weight=35
        //% this.defl=map
        //% this.shadow=variables_get
        plotWarps() {
            for (let i = 0; i < this._warps.length; i++) {
                let warp = this._warps[i]
                if (warp.isEnabled()) {
                    this._enabled_warps.push(warp)
                }
            }
        }

        //% block="$this plot triggers"
        //% weight=30
        //% this.defl=map
        //% this.shadow=variables_get
        plotTriggers() {
            for (let i = 0; i < this._triggers.length; i++) {
                let trigger = this._triggers[i]
                if (trigger.isEnabled()) {
                    this._enabled_triggers.push(trigger)
                }
            }
        }

        //% block="unplot $this|| unplot blocks?$blocks unplot npcs?$npcs unplot enemies?$enemies unplot stacks?$stacks unplot warps?$warps unplot triggers?$triggers"
        //% weight=25 blockGap=16
        //% this.defl=map
        //% this.shadow=variables_get
        //% blocks.shadow="toggleOnOff"
        //% npcs.shadow="toggleOnOff"
        //% enemies.shadow="toggleOnOff"
        //% stacks.shadow="toggleOnOff"
        //% warps.shadow="toggleOnOff"
        //% triggers.shadow="toggleOnOff"
        unplotElements(blocks: boolean = true, npcs: boolean = true, enemies: boolean = true, stacks: boolean = true, warps: boolean = true, triggers: boolean = true) {
            if (blocks == true) { this.unplotBlocks() }
            if (npcs == true) { this.unplotNPCs() }
            if (enemies == true) { this.unplotEnemies() }
            if (stacks == true) { this.unplotStacks() }
            if (warps == true) { this.unplotWarps() }
            if (triggers == true) { this.unplotTriggers() }
        }

        //% block="$this unplot blocks"
        //% weight=20
        //% this.defl=map
        //% this.shadow=variables_get
        unplotBlocks() {
            for (let i = 0; i < this._sprite_blocks.length; i++) {
                this._sprite_blocks[i].delete()
            }
            this._sprite_blocks = []
        }

        //% block="$this unplot npcs"
        //% weight=15
        //% this.defl=map
        //% this.shadow=variables_get
        unplotNPCs() {
            for (let i = 0; i < this._sprite_npcs.length; i++) {
                this._sprite_npcs[i].delete()
            }
            this._sprite_npcs = []
        }

        //% block="$this unplot enemies"
        //% weight=10
        //% this.defl=map
        //% this.shadow=variables_get
        unplotEnemies() {
            for (let i = 0; i < this._sprite_enemies.length; i++) {
                this._sprite_enemies[i].delete()
            }
            this._sprite_enemies = []
        }

        //% block="$this unplot stacks"
        //% weight=9
        //% this.defl=map
        //% this.shadow=variables_get
        unplotStacks() {
            for (let i = 0; i < this._sprite_stacks.length; i++) {
                this._sprite_stacks[i].delete()
            }
            this._sprite_stacks = []
        }

        //% block="$this unplot warps"
        //% weight=8
        //% this.defl=map
        //% this.shadow=variables_get
        unplotWarps() {
            this._enabled_warps = []
        }

        //% block="$this unplot triggers"
        //% weight=7
        //% this.defl=map
        //% this.shadow=variables_get
        unplotTriggers() {
            this._enabled_triggers = []
        }

        //% block="$this append element$element"
        //% weight=6
        //% element.defl=element
        //% element.shadow=variables_get
        //% this.defl=map
        //% this.shadow=variables_get
        appendElement(element: NPCs.npc | Enemies.enemie | Stacks.stack | Warps.warp | Triggers.trigger) {
            if (element instanceof NPCs.npc) {
                this._npcs.push(element)
            } else if (element instanceof Enemies.enemie) {
                this._enemies.push(element)
            } else if (element instanceof Stacks.stack) {
                this._stacks.push(element)
            } else if (element instanceof Warps.warp) {
                this._warps.push(element)
            } else if (element instanceof Triggers.trigger) {
                this._triggers.push(element)
            }
        }

        //% block="$this remove element$element"
        //% weight=5
        //% element.defl=element
        //% element.shadow=variables_get
        //% this.defl=map
        //% this.shadow=variables_get
        removeElement(element: NPCs.npc | Enemies.enemie | Stacks.stack | Warps.warp | Triggers.trigger) {
            try {
                if (element instanceof NPCs.npc) {
                    this._npcs.removeElement(element)
                } else if (element instanceof Enemies.enemie) {
                    this._enemies.removeElement(element)
                } else if (element instanceof Stacks.stack) {
                    this._stacks.removeElement(element)
                } else if (element instanceof Warps.warp) {
                    this._warps.removeElement(element)
                } else if (element instanceof Triggers.trigger) {
                    this._triggers.removeElement(element)
                }
            } catch { }
        }

        //% block="$this remove element at$index of type$typ"
        //% weight=4
        //% this.defl=map
        //% this.shadow=variables_get
        removeAt(index: number, typ: MapElements) {
            try {
                if (typ == MapElements.NPC) {
                    this._npcs.removeAt(index)
                } else if (typ == MapElements.Enemie) {
                    this._enemies.removeAt(index)
                } else if (typ == MapElements.Stack) {
                    this._stacks.removeAt(index)
                } else if (typ == MapElements.Warp) {
                    this._warps.removeAt(index)
                } else if (typ == MapElements.Trigger) {
                    this._triggers.removeAt(index)
                }
            } catch { }
        }
    }
}