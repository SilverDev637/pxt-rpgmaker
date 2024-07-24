//% block="RPG Maker" weight=11
//% color="#004000" icon="\uf1e5"
namespace RPGMaker {
    //% block="append$element to map$id"
    //% element.defl=element inlineInputMode=inline
    //% element.shadow=variables_get
    export function appendToMap(element: Maps.map | NPCs.npc | Enemies.enemie | Stacks.stack | Warps.warp | Triggers.trigger, id: number) {
        if (element instanceof Maps.map) {
            __maps[id].blocks = element
        } else if (element instanceof NPCs.npc) {
            __maps[id].npcs.push(element)
        } else if (element instanceof Enemies.enemie) {
            __maps[id].enemies.push(element)
        } else if (element instanceof Stacks.stack) {
            __maps[id].stacks.push(element)
        } else if (element instanceof Warps.warp) {
            __maps[id].warps.push(element)
        } else if (element instanceof Triggers.trigger) {
            __maps[id].triggers.push(element)
        }
    }
    let __maps: {
        blocks: Maps.map,
        npcs: NPCs.npc[],
        enemies: Enemies.enemie[],
        stacks: Stacks.stack[],
        warps: Warps.warp[],
        triggers: Triggers.trigger[]
    }[]
}