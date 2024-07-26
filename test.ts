let map = Maps.createMap(images.createImage(`
    # # # # #
    # . . . #
    . . . . #
    # . . . #
    # # # # #
    `), 2)
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
let warp = Warps.createWarp(0, 2, 4, 2, true, 0)
let trigger = Triggers.createTrigger(2, 3, TriggerActivation.OnStepIn)
let player = Player.createPlayer(2, 2)
player.enableMovementControls()

stack.appendItem(item)

map.appendElement(enemie)
map.appendElement(npc)
map.appendElement(stack)
map.appendElement(warp)
map.appendElement(trigger)
map.plotElements()

basic.pause(1000)
RPGMaker.turnOff()
RPGMaker.turnOff()
basic.pause(1000)
RPGMaker.turnOn()
RPGMaker.turnOn()