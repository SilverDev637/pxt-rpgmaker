//% block="RPG - Global" weight=11
//% color="#584D3D" icon="\uf1e5"
namespace RPGMaker {
    export let _ingame_sprites_blocks: game.LedSprite[] = []
    export let _ingame_sprites_npcs: game.LedSprite[] = []
    export let _ingame_sprites_enemies: game.LedSprite[] = []
    export let _ingame_sprites_stacks: { sprite: game.LedSprite; brightness: number }[] = []
    export let _ingame_enabled_stacks: Stacks.stack[] = []
    export let _ingame_enabled_warps: Warps.warp[] = []
    export let _ingame_enabled_triggers: Triggers.trigger[] = []
    export let _player: game.LedSprite
    export let _move = true
    export let _inventory: Items.item[] = []
    export let _stacks_collection: boolean[] = []
    
    let _ingame_disabled_stacks: Stacks.stack[] = []
    let _ingame_disabled_warps: Warps.warp[] = []
    let _ingame_disabled_triggers: Triggers.trigger[] = []

    let _maps: Maps.map[] = []
    let _current_map: number

    export function _appendWarp(warp: Warps.warp) {
        _ingame_enabled_warps.push(warp)
    }

    export function _appendTrigger(trigger: Triggers.trigger) {
        _ingame_enabled_triggers.push(trigger)
    }

    //% block="fade in $msms"
    export function fadeIn(ms: number) {
        for (let i = 0; i < 255; i+=255/ms) {
            led.setBrightness(i)
            basic.pause(1)
        }
    }

    //% block="fade out $msms"
    export function fadeOut(ms: number) {
        for (let i = 255; i > 0; i -= 255 / ms) {
            led.setBrightness(i)
            basic.pause(1)
        }
    }

    //% block="teleport player to x$x y$y|| target map id$targetMap transition?$transition"
    //% inlineInputMode=inline x.min=0 x.max=4 y.min=0 y.max=4
    export function teleportTo(x: number, y: number, targetMap?: number, transition: boolean=true) {
        _move = false
        if (isNaN(targetMap)) { targetMap = _current_map }
        if (_current_map != targetMap) { checkForTriggers(TriggerActivation.OnDespawn, 0, 0) }
        if (transition) { fadeOut(100) }
        deleteAll()
        _player.goTo(x, y)
        _maps[targetMap].plotElements()
        if (transition) { fadeIn(100) }
        if (_current_map != targetMap) { checkForTriggers(TriggerActivation.OnSpawn, 0, 0) }
        _move = true
    }

    //% block="check for stacks on x$x y$y"
    //% x.min=0 x.max=4 y.min=0 y.max=4
    export function checkForStacks(x: number, y: number) {
        for (let i = 0; i < _ingame_enabled_stacks.length; i++) {
            let stack = _ingame_enabled_stacks[i]
            if (stack.isEnabled() && stack.x() == x && stack.y() == y && !_stacks_collection[stack.id()]) {
                try {
                    for (let t = 0; t < stack.content().length; t++) {
                        _inventory.push(stack.content()[t])
                    }
                    for (let t = 0; t < stack.content().length; t++) {
                        stack.removeItemAt(0)
                    }
                    _stacks_collection[stack.id()] = true
                    _ingame_enabled_stacks.removeAt(i)
                    _ingame_sprites_stacks.removeAt(i).sprite.delete()
                } catch { }
            }
        }
    }

    //% block="check for warps on x$x y$y"
    //% x.min=0 x.max=4 y.min=0 y.max=4
    export function checkForWarps(x: number, y: number) {
        for (let i = 0; i < _ingame_enabled_warps.length; i++) {
            let warp = _ingame_enabled_warps[i]
            if (warp.isEnabled() && warp.originX() == x && warp.originY() == y) {
                try {
                    teleportTo(warp.targetX(), warp.targetY(), warp.targetMap(), warp.isTransitionEnabled())
                } catch {}
            }
        } 
    }

    //% block="check for triggers with method$method on x$x y$y"
    //% x.min=0 x.max=4 y.min=0 y.max=4
    export function checkForTriggers(method: TriggerActivation, x: number, y: number) {
        for (let i = 0; i < _ingame_enabled_triggers.length; i++) {
            if (trigger.isEnabled() && trigger.activation() == method && (trigger.x() == x && trigger.y() == y) || (trigger.activation() == TriggerActivation.OnSpawn || trigger.activation() == TriggerActivation.OnDespawn)) {
                try {
                    trigger.activate()
                } catch {}
            }
        }
    }

    //% block="state of led x$x y$y"
    //% x.min=0 x.max=4 y.min=0 y.max=4
    //% color="#50333f"
    export function ledState(x: number, y: number): boolean {
        for (let block of _ingame_sprites_blocks) {
            if (block.x() == x && block.y() == y) {
                return true
            }
        }
        for (let npc of _ingame_sprites_npcs) {
            if (npc.x() == x && npc.y() == y) {
                return true
            }
        }
        for (let enemie of _ingame_sprites_enemies) {
            if (enemie.x() == x && enemie.y() == y) {
                return true
            }
        }
        return false
    }

    //% block="delete all from screen"
    export function deleteAll() {
        for (let i of _ingame_sprites_blocks) { i.delete() }
        _ingame_sprites_blocks = []
        for (let i of _ingame_sprites_npcs) { i.delete() }
        _ingame_sprites_npcs = []
        for (let i of _ingame_sprites_enemies) { i.delete() }
        _ingame_sprites_enemies = []
        for (let i of _ingame_sprites_stacks) { i.sprite.delete() }
        _ingame_sprites_stacks = []
        _ingame_enabled_warps = []
        _ingame_enabled_triggers = []
        _ingame_disabled_warps = []
        _ingame_disabled_triggers = []
    }

    //% block="turn elements on"
    export function turnOn() {
        for (let i of _ingame_sprites_blocks) {
            i.setBrightness(196)
        }
        for (let i of _ingame_sprites_npcs) {
            i.setBrightness(196)
            i.setBlink(350)
        }
        for (let i of _ingame_sprites_enemies) {
            i.setBrightness(196)
            i.setBlink(50)
        }
        for (let i of _ingame_sprites_stacks) {
            i.sprite.setBrightness(i.brightness)
        }
        _ingame_enabled_warps = _ingame_disabled_warps
        _ingame_disabled_warps = []
        _ingame_enabled_triggers = _ingame_disabled_triggers
        _ingame_disabled_triggers = []
    }

    //% block="turn elements off"
    export function turnOff() {
        for (let i of _ingame_sprites_blocks) { i.off() }
        for (let i of _ingame_sprites_npcs) { i.off() }
        for (let i of _ingame_sprites_enemies) { i.off() }
        for (let i of _ingame_sprites_stacks) {
            i.sprite.off()
        }
        _ingame_disabled_warps = _ingame_enabled_warps
        _ingame_enabled_warps = []
        _ingame_disabled_triggers = _ingame_enabled_triggers
        _ingame_enabled_triggers = []
    }

    export function _setMap(map: Maps.map, id: number) {
        for (let i = 0; i < id+1; i++) {
            _maps.push(null)
            if (_maps[i] != null) {
                _maps.removeAt(_maps.length-1)
            }
        }
        _maps[id] = map
        _current_map = id
    }

    //% block="enable secondary buttons"
    export function enableSecondaryButtons() {
        
    }
}