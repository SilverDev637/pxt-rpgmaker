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
let stack = Stacks.createStack(1, 1)
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
    Objetives.Damage
)
let item1 = Items.createItem(
    "ARMOR",
    images.createImage(`
        # # . # #
        # # # # #
        . # # # .
        . # # # .
        . # # # .
    `),
    false,
    Objetives.Protection
)
let item2 = Items.createItem(
    "APPLE",
    images.createImage(`
        . . # . .
        . # # # .
        # # # # #
        # # # # #
        . # . # .
    `),
    true,
    Objetives.Heal
)
let item3 = Items.createItem(
    "POTION",
    images.createImage(`
        . # # # .
        . . # . .
        . # # # .
        # # # # #
        # # # # #
    `),
    true,
    Objetives.Poision
)
let item4 = Items.createItem(
    "KEY",
    images.createImage(`
        . . # # .
        . . # . .
        . # # # .
        . # . # .
        . # # # .
    `),
    false,
    Objetives.None
)
item1.setMultiplier(10)
item2.setMultiplier(25)
item3.setMultiplier(5)
let warp2 = Warps.createWarp(0, 2, 4, 2, true, 0)
let warp1 = Warps.createWarp(4, 2, 0, 2, true, 1)
let trigger = Triggers.createTrigger(2, 3, TriggerActivation.OnStepIn, -1)
let player = Player.createPlayer(2, 2)

RPGMaker.enableControls()
stack.appendItem(item)
stack.appendItem(item1)
stack.appendItem(item2)
stack.appendItem(item3)
stack.appendItem(item4)
let stack1 = Stacks.createStack(1, 3)
stack1.appendItem(item)
stack1.appendItem(item1)
stack1.appendItem(item2)
stack1.appendItem(item3)
stack1.appendItem(item4)

stack.onPickUpEvent(() => {
    console.log("STACK")
})
stack1.onPickUpEvent(() => {
    console.log("STACK")
})

trigger.onTriggerEvent(() => {
    RPGMaker.teleportTo(2, 2)
})

map2.appendElement(enemie)
map2.appendElement(npc)
map1.appendElement(stack1)
map1.appendElement(stack)
map2.appendElement(warp2)
map2.appendElement(trigger)
map1.appendElement(warp1)
RPGMaker.buildDefaultPauseMenu()
map2.plotElements()