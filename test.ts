let map2 = Maps.createMap(images.createImage(`
    # # # # #
    # . . . #
    . . . . #
    # . . . #
    # # # # #
    `), 1)
let map1 = Maps.createMap(images.createImage(`
    # # # # #
    # . . . #
    # . . . .
    # . . . #
    # # # # #
    `), 0)
let npc = NPCs.createNPC(1, 1, "HOLA, MUNDO")
let enemie = Enemies.createEnemie(2, 1, 5, 5)
let stack = Stacks.createStack(3, 1)
let item = Items.createItem(
    "SWORD",
    images.createImage(`
        . . . . #
        # . . # .
        # # # . .
        . # # . .
        # . # # .
    `),
    false,
    Objetives.DamageEnemie
)
let item1 = Items.createItem(
    "SWORD 2",
    images.createImage(`
        . . . . #
        # . . # .
        # # # . .
        . # # . .
        # . # # .
    `),
    false,
    Objetives.DamageEnemie
)
let warp2 = Warps.createWarp(0, 2, 4, 2, true, 0)
let warp1 = Warps.createWarp(4, 2, 0, 2, true, 1)
let trigger = Triggers.createTrigger(2, 3, TriggerActivation.OnStepIn, -1)
let player = Player.createPlayer(2, 2)
player.enableMovementControls()

stack.appendItem(item)

stack.onPickUpEvent(() => {
    console.log("STACK")
})

trigger.onTriggerEvent(() => {
    RPGMaker.teleportTo(2, 2)
})

map2.appendElement(enemie)
map2.appendElement(npc)
map2.appendElement(stack)
map2.appendElement(warp2)
map2.appendElement(trigger)
map1.appendElement(warp1)
map2.plotElements()