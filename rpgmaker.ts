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
    export let _images: game.LedSprite[] = []
    export let _inventory: Items.item[] = []
    export let _inventory_quantity: number[] = []
    export let _stacks_collection: boolean[] = []
    export let pauseMenu: Menus.menu = Menus.createMenu()
    export let inventoryMenu: Menus.menu = Menus.createMenu()
    export let _selected_ui = 0
    export let _current_uis: UIs.ui[] = []
    export let _enabled_menus_buttons = false
    
    let itemMenu: Menus.menu = Menus.createMenu()
    
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

    //% block="update ui"
    export function updateUI() {
        plotImage(_current_uis[_selected_ui].icon())
    }

    //% block="clear images"
    export function clearImage() {
        for (let i = 0; i < _images.length; i++) {
            _images[i].delete()
        }
        _images = []
    }

    //% block="plot image$image"
    //% image.defl=myImage
    //% image.shadow=myImage
    export function plotImage(image: Image) {
        clearImage()
        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 5; x++) {
                if (image.pixel(x, y)) {
                    _images.push(game.createSprite(x, y))
                }
            }
        }
    }

    //% block="build default inventory"
    export function buildDefaultInventory() {
        let resumeUI = UIs.createUI(images.createImage(`
            01000
            01100
            01110
            01100
            01000
        `))

        resumeUI.onSelect(() => {
            pauseMenu.close()
        })

        pauseMenu.appendUI(resumeUI)


        let inventoryUI = UIs.createUI(images.createImage(`
            00001
            10010
            11100
            01100
            10110
        `))

        inventoryUI.onSelect(() => {
            let _inventory_items: UIs.ui[] = []
            let _close_ui = UIs.createUI(images.createImage(`
                10001
                01010
                00100
                01010
                10001
            `))
            _close_ui.onSelect(() => {
                inventoryMenu.close()
                pauseMenu.open()
            })
            for (let i = 0; i < _inventory.length; i++) {
                let _inventory_item = UIs.createUI(_inventory[i]._icon)
                _inventory_item.onSelect(() => {
                    showItemData(_inventory[i], i)
                })
                _inventory_items.push(_inventory_item)
            }
            pauseMenu.close()
            inventoryMenu.open()
        })
        
        pauseMenu.appendUI(inventoryUI)
    }

    //% block="show item$item data"
    //% item.defl=item
    //% item.shadow=variables_get
    export function showItemData(item: Items.item, id: number) {
        let showInfoUI = UIs.createUI(images.createImage(`
            . # . # .
            . # . # .
            . # . # .
            . . . . .
            . # . # .
        `))
        let goBackUI = UIs.createUI(images.createImage(`
            . . # . .
            . # # . .
            # # # # #
            . # # . #
            . . # . .
        `))
        let deleteItemUI = UIs.createUI(images.createImage(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
        `))
        showInfoUI.onSelect(() => {
            basic.showString(`${item.name().toUpperCase()}  ${_getItemEffect(item)}  x${_inventory_quantity[id]}`)
        })
        goBackUI.onSelect(() => {
            itemMenu.close()
            inventoryMenu.open()
        })
        deleteItemUI.onSelect(() => {
            _inventory_quantity[id]--
            if (_inventory_quantity[id] <= 0) {
                _inventory_quantity.removeAt(id)
                _inventory.removeAt(id)
            }
            itemMenu.close()
            inventoryMenu.open()
        })
    }

    function _getItemEffect(item: Items.item) {
        let effects = [
            "",
            `${item.multiplier()}DAM`,
            `POISON ${item.multiplier()}s`,
            `${item.multiplier().toString()[0] == "-"? "" : "+"}${item.multiplier()}HP`
        ]
        return effects[item.objetive()]
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
                        let repeated = false
                        for (let h = 0; h < _inventory.length; h++) {
                            if (_inventory[h].name().toUpperCase() == stack.content()[t].name().toUpperCase()) {
                                repeated = true
                                break
                            }
                            if (repeated) {
                                _inventory_quantity[h]++
                            } else {
                                _inventory_quantity.push(1)
                                _inventory.push(stack.content()[t])
                            }
                        }
                    }
                    for (let t = 0; t < stack.content().length; t++) {
                        stack.removeItemAt(0)
                    }
                    _stacks_collection[stack.id()] = true
                    _ingame_enabled_stacks.removeAt(i)._on_pickup()
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
        _player.off()
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
        _player.on()
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
        _player.off()
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

    //% block="enable secondary buttons|| Pin0?$pin0 Pin1?$pin1 Pin2?$pin2"
    export function enableSecondaryButtons(pin0: boolean=true, pin1: boolean=true, pin2: boolean=true) {
        if (pin0) {
            input.onPinPressed(TouchPin.P0, () => {

            })
        }
    }
}