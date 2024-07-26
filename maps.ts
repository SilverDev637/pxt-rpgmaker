//% block="RPG - Maps" weight=9
//% color="#004000" icon="\uf1e5"
namespace Maps {
    //% block="create new map blocks$blocks with id$id"
    //% weight=150 color="#400040" inlineInputMode=inline
    //% blocks.defl=myImage
    //% blocks.shadow=variables_get
    export function createMap(blocks: Image, id: number) {
        return new map(blocks, id)
    }

    export class map {
        kind: 'map' = 'map'
        private _blocks: Image
        private _enabled: boolean = true
        private _id: number

        private _npcs: NPCs.npc[] = []
        private _enemies: Enemies.enemie[] = []
        private _stacks: Stacks.stack[] = []
        private _warps: Warps.warp[] = []
        private _triggers: Triggers.trigger[] = []

        private _displaying_blocks: boolean = true
        private _displaying_npcs: boolean = true
        private _displaying_enemies: boolean = true
        private _displaying_stacks: boolean = true
        private _displaying_warps: boolean = true
        private _displaying_triggers: boolean = true

        constructor(blocks: Image, id: number) {
            this._blocks = blocks
            this._id = id
            RPGMaker._setMap(this, this._id)
        }

        //% block="$this set blocks to$blocks"
        //% weight=145
        //% this.defl=map blocks.defl=myImage
        //% this.shadow=variables_get blocks.shadow=variables_get
        setBlocks(blocks: Image) {
            this._blocks = blocks
            RPGMaker._setMap(this, this._id)
        }

        //% block="$this enable"
        //% weight=140
        //% this.defl=map
        //% this.shadow=variables_get
        enable() {
            this._enabled = true
            RPGMaker._setMap(this, this._id)
        }

        //% block="$this disable"
        //% weight=135
        //% this.defl=map
        //% this.shadow=variables_get
        disable() {
            this._enabled = true
            RPGMaker._setMap(this, this._id)
        }

        //% block="$this is enabled?"
        //% weight=130 color="#400040"
        //% this.defl=map
        //% this.shadow=variables_get
        isEnabled(): boolean {
            return this._enabled
        }

        //% block="$this is disabled?"
        //% weight=125 color="#400040"
        //% this.defl=map
        //% this.shadow=variables_get
        isDisabled(): boolean {
            return !this._enabled
        }

        //% block="plot $this|| plot blocks?$blocks plot npcs?$npcs plot enemies?$enemies plot stacks?$stacks plot warps?$warps plot triggers?$triggers"
        //% weight=110 blockGap=16
        //% this.defl=map
        //% this.shadow=variables_get
        //% blocks.shadow="toggleOnOff"
        //% npcs.shadow="toggleOnOff"
        //% enemies.shadow="toggleOnOff"
        //% stacks.shadow="toggleOnOff"
        //% warps.shadow="toggleOnOff"
        //% triggers.shadow="toggleOnOff"
        plotElements(blocks: boolean = true, npcs: boolean = true, enemies: boolean = true, stacks: boolean = true, warps: boolean = true, triggers: boolean = true) {
            if (blocks == true) { this.plotBlocks() }
            if (npcs == true) { this.plotNPCs() }
            if (enemies == true) { this.plotEnemies() }
            if (stacks == true) { this.plotStacks() }
            if (warps == true) { this.plotWarps() }
            if (triggers == true) { this.plotTriggers() }
        }

        //% block="$this plot blocks"
        //% weight=105
        //% this.defl=map
        //% this.shadow=variables_get
        plotBlocks() {
            for (let y = 0; y < 5; y++) {
                for (let x = 0; x < 5; x++) {
                    if (this._blocks.pixel(x, y)) {
                        let sprite = game.createSprite(x, y)
                        sprite.setBrightness(196)
                        RPGMaker._ingame_sprites_blocks.push(sprite)
                    }
                }
            }
            this._displaying_blocks = true
            RPGMaker._setMap(this, this._id)
        }

        //% block="$this plot npcs"
        //% weight=100
        //% this.defl=map
        //% this.shadow=variables_get
        plotNPCs() {
            for (let i = 0; i < this._npcs.length; i++) {
                let npc = this._npcs[i]
                if (npc.isEnabled()) {
                    let sprite_npc = game.createSprite(npc.x(), npc.y())
                    sprite_npc.setBrightness(196)
                    sprite_npc.setBlink(350)
                    RPGMaker._ingame_sprites_npcs.push(sprite_npc)
                }
            }
            this._displaying_npcs = true
            RPGMaker._setMap(this, this._id)
        }

        //% block="$this plot enemies"
        //% weight=95
        //% this.defl=map
        //% this.shadow=variables_get
        plotEnemies() {
            for (let i = 0; i < this._enemies.length; i++) {
                let enemie = this._enemies[i]
                if (enemie.isEnabled()) {
                    let sprite_enemie = game.createSprite(enemie.x(), enemie.y())
                    sprite_enemie.setBrightness(196)
                    sprite_enemie.setBlink(50)
                    RPGMaker._ingame_sprites_enemies.push(sprite_enemie)
                }
            }
            this._displaying_enemies = true
            RPGMaker._setMap(this, this._id)
        }

        //% block="$this plot stacks"
        //% weight=90
        //% this.defl=map
        //% this.shadow=variables_get
        plotStacks() {
            for (let i = 0; i < this._stacks.length; i++) {
                let stack = this._stacks[i]
                if (stack.isEnabled()) {
                    let sprite_stack = game.createSprite(stack.x(), stack.y())
                    sprite_stack.setBrightness(stack.content().length * (128 / 10))
                    RPGMaker._ingame_sprites_stacks.push({ sprite: sprite_stack, brightness: stack.content().length * (128 / 10) })
                }
            }
            this._displaying_stacks = true
            RPGMaker._setMap(this, this._id)
        }

        //% block="$this plot warps"
        //% weight=85
        //% this.defl=map
        //% this.shadow=variables_get
        plotWarps() {
            for (let i = 0; i < this._warps.length; i++) {
                let warp = this._warps[i]
                if (warp.isEnabled()) {
                    RPGMaker._appendWarp(warp)
                }
            }
            this._displaying_warps = true
            RPGMaker._setMap(this, this._id)
        }

        //% block="$this plot triggers"
        //% weight=80
        //% this.defl=map
        //% this.shadow=variables_get
        plotTriggers() {
            for (let i = 0; i < this._triggers.length; i++) {
                let trigger = this._triggers[i]
                if (trigger.isEnabled()) {
                    RPGMaker._appendTrigger(trigger)
                }
            }
            this._displaying_triggers = true
            RPGMaker._setMap(this, this._id)
        }

        //% block="unplot $this|| unplot blocks?$blocks unplot npcs?$npcs unplot enemies?$enemies unplot stacks?$stacks unplot warps?$warps unplot triggers?$triggers"
        //% weight=75 blockGap=16
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
        //% weight=70
        //% this.defl=map
        //% this.shadow=variables_get
        unplotBlocks() {
            for (let i = 0; i < RPGMaker._ingame_sprites_blocks.length; i++) {
                RPGMaker._ingame_sprites_blocks[i].delete()
            }
            RPGMaker._ingame_sprites_blocks = []
            this._displaying_blocks = false
            RPGMaker._setMap(this, this._id)
        }

        //% block="$this unplot npcs"
        //% weight=65
        //% this.defl=map
        //% this.shadow=variables_get
        unplotNPCs() {
            for (let i = 0; i < RPGMaker._ingame_sprites_npcs.length; i++) {
                RPGMaker._ingame_sprites_npcs[i].delete()
            }
            RPGMaker._ingame_sprites_npcs = []
            this._displaying_npcs = false
            RPGMaker._setMap(this, this._id)
        }

        //% block="$this unplot enemies"
        //% weight=60
        //% this.defl=map
        //% this.shadow=variables_get
        unplotEnemies() {
            for (let i = 0; i < RPGMaker._ingame_sprites_enemies.length; i++) {
                RPGMaker._ingame_sprites_enemies[i].delete()
            }
            RPGMaker._ingame_sprites_enemies = []
            this._displaying_enemies = false
            RPGMaker._setMap(this, this._id)
        }

        //% block="$this unplot stacks"
        //% weight=55
        //% this.defl=map
        //% this.shadow=variables_get
        unplotStacks() {
            for (let i = 0; i < RPGMaker._ingame_sprites_stacks.length; i++) {
                RPGMaker._ingame_sprites_stacks[i].sprite.delete()
                RPGMaker._ingame_sprites_stacks[i].brightness = null
            }
            RPGMaker._ingame_sprites_stacks = []
            this._displaying_stacks = false
            RPGMaker._setMap(this, this._id)
        }

        //% block="$this unplot warps"
        //% weight=50
        //% this.defl=map
        //% this.shadow=variables_get
        unplotWarps() {
            RPGMaker._ingame_enabled_warps = []
            this._displaying_warps = false
            RPGMaker._setMap(this, this._id)
        }

        //% block="$this unplot triggers"
        //% weight=45
        //% this.defl=map
        //% this.shadow=variables_get
        unplotTriggers() {
            RPGMaker._ingame_enabled_triggers = []
            this._displaying_triggers = false
            RPGMaker._setMap(this, this._id)
        }

        //% block="$this is displaying blocks?"
        //% weight=40
        //% this.defl=map
        //% this.shadow=variables_get
        displayingBlocks(): boolean {
            return this._displaying_blocks
        }

        //% block="$this is displaying npcs?"
        //% weight=35
        //% this.defl=map
        //% this.shadow=variables_get
        displayingNPCs(): boolean {
            return this._displaying_npcs
        }

        //% block="$this is displaying enemies?"
        //% weight=30
        //% this.defl=map
        //% this.shadow=variables_get
        displayingEnemies(): boolean {
            return this._displaying_enemies
        }

        //% block="$this is displaying stacks?"
        //% weight=25
        //% this.defl=map
        //% this.shadow=variables_get
        displayingStacks(): boolean {
            return this._displaying_stacks
        }

        //% block="$this is displaying warps?"
        //% weight=20
        //% this.defl=map
        //% this.shadow=variables_get
        displayingWarps(): boolean {
            return this._displaying_warps
        }

        //% block="$this is displaying triggers?"
        //% weight=15
        //% this.defl=map
        //% this.shadow=variables_get
        displayingTriggers(): boolean {
            return this._displaying_triggers
        }

        //% block="$this append element$element"
        //% weight=10
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
            RPGMaker._setMap(this, this._id)
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
            RPGMaker._setMap(this, this._id)
        }

        //% block="$this remove element at$index of type$typ"
        //% weight=0
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
            RPGMaker._setMap(this, this._id)
        }
    }
}