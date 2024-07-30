enum ElementDisplayMode {
    //% block="local"
    Local = 0,
    //% block="global"
    Global = 1
}
enum Directions {
    //% block="left-right"
    LeftRight = 0,
    //% block="up-down"
    UpDown = 1
}
enum Objetives {
    //% block="none"
    None = 0,
    //% block="damage"
    Damage = 1,
    //% block="poision
    Poision = 2,
    //% block="heal"
    Heal = 3,
    //% block="protection"
    Protection = 4
}
enum TriggerActivation {
    //% block="on spawn"
    OnSpawn = 0,
    //% block="on despawn"
    OnDespawn = 1,
    //% block="on step in"
    OnStepIn = 2,
    //% block="on step out"
    OnStepOut = 3
}
enum LedStates {
    //% block="on"
    On = 1,
    //% block="off"
    Off = 0
}
enum MapElements {
    //% block="npc"
    NPC = 0,
    //% block="enemie"
    Enemie = 1,
    //% block="stack"
    Stack = 2,
    //% block="warp"
    Warp = 3,
    //% block="trigger"
    Trigger = 4
}