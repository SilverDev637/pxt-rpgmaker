//% block="RPG - Global" weight=11
//% color="#584D3D" icon="\uf1e5"
namespace RPGMaker {
    export let _ingame_sprites_blocks: game.LedSprite[] = []
    export let _ingame_sprites_npcs: game.LedSprite[] = []
    export let _ingame_sprites_enemies: game.LedSprite[] = []
    export let _ingame_sprites_stacks: {sprite: game.LedSprite; brightness: number}[] = []
    export let _ingame_enabled_warps: Warps.warp[] = []
    export let _ingame_enabled_triggers: Triggers.trigger[] = []

    let _ingame_disabled_warps: Warps.warp[] = []
    let _ingame_disabled_triggers: Triggers.trigger[] = []

    let _maps: Maps.map[] = []
    let _current_map: Maps.map

    //% block="state of led x$x y$y"
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
        for (let stack of _ingame_sprites_stacks) {
            if (stack.sprite.x() == x && stack.sprite.y() == y) {
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
    }
}