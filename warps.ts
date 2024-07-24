//% block="RPG - Warps" weight=5
//% color="#004000" icon="\uf1e5"
namespace Warps {
    //% block="create new warp at x$x y$y target at x$targetX y$targetY do transition?$doTransition to map id$targetMapId"
    //% inlineInputMode=inline weight=120 color="#400040"
    export function createWarp(x: number, y: number, targetX: number, targetY: number, doTransition: boolean, targetMapId: number) {
        return new warp(x, y, targetX, targetY, doTransition, targetMapId)
    }

    export class warp {
        kind: 'warp' = 'warp'
        originX: number
        originY: number
        targetX: number
        targetY: number
        transition: boolean
        targetMapId: number
        on_teleport_event = () => {}
        enabled = true
        constructor(originX: number, originY: number, targetX: number, targetY: number, doTransition: boolean, targetMapId: number) {
            this.originX = originX
            this.originY = originY
            this.targetX = targetX
            this.targetY = targetY
            this.transition = doTransition
            this.targetMapId = targetMapId
        }

        //% block="$this set origin x to$newX"
        //% weight=115
        //% this.defl=warp
        //% this.shadow=variables_get
        setOriginX(newX: number) {
            this.originX = newX
        }

        //% block="$this set origin y to$newY"
        //% weight=110
        //% this.defl=warp
        //% this.shadow=variables_get
        setOriginY(newY: number) {
            this.originY = newY
        }

        //% block="$this change origin x by$addX"
        //% weight=105
        //% this.defl=warp
        //% this.shadow=variables_get
        changeOriginX(addX: number) {
            this.originX += addX
        }

        //% block="$this change origin y by$addY"
        //% weight=100
        //% this.defl=warp
        //% this.shadow=variables_get
        changeOriginY(addY: number) {
            this.originY += addY
        }

        //% block="$this set origin to x$x y$y"
        //% weight=95
        //% this.defl=warp
        //% this.shadow=variables_get
        setOriginPosition(x: number, y: number) {
            this.originX = x
            this.originY = y
        }

        //% block="$this get origin x"
        //% weight=90 color="#400040"
        //% this.defl=warp
        //% this.shadow=variables_get
        getOriginX(): number {
            return this.originX
        }

        //% block="$this get origin y"
        //% weight=85 color="#400040"
        //% this.defl=warp
        //% this.shadow=variables_get
        getOriginY(): number {
            return this.originY
        }

        //% block="$this set target x to$newX"
        //% weight=80
        //% this.defl=warp
        //% this.shadow=variables_get
        setTargetX(newX: number) {
            this.targetX = newX
        }

        //% block="$this set target y to$newY"
        //% weight=75
        //% this.defl=warp
        //% this.shadow=variables_get
        setTargetY(newY: number) {
            this.targetY = newY
        }

        //% block="$this change target x by$addX"
        //% weight=70
        //% this.defl=warp
        //% this.shadow=variables_get
        changeTargetX(addX: number) {
            this.targetX += addX
        }

        //% block="$this change target y by$addY"
        //% weight=65
        //% this.defl=warp
        //% this.shadow=variables_get
        changeTargetY(addY: number) {
            this.targetY += addY
        }

        //% block="$this set target to x$x y$y"
        //% weight=60
        //% this.defl=warp
        //% this.shadow=variables_get
        setTargetPosition(x: number, y: number) {
            this.targetX = x
            this.targetY = y
        }

        //% block="$this get target x"
        //% weight=55 color="#400040"
        //% this.defl=warp
        //% this.shadow=variables_get
        getTargetX(): number {
            return this.targetX
        }

        //% block="$this get target y"
        //% weight=50 color="#400040"
        //% this.defl=warp
        //% this.shadow=variables_get
        getTargetY(): number {
            return this.targetY
        }

        //% block="$this enable transition?$transition"
        //% weight=45
        //% this.defl=warp
        //% this.shadow=variables_get
        enableTransition(transition: boolean) {
            this.transition = transition
        }

        //% block="$this transition enabled?"
        //% weight=40 color="#400040"
        //% this.defl=warp
        //% this.shadow=variables_get
        isTransitionEnabled(): boolean {
            return this.transition
        }

        //% block="$this set target map id to$newMapId"
        //% weight=35
        //% this.defl=warp
        //% this.shadow=variables_get
        setTargetMap(newMapId: number) {
            this.targetMapId = newMapId
        }

        //% block="$this get target map id"
        //% weight=30 color="#400040"
        //% this.defl=warp
        //% this.shadow=variables_get
        getTargetMap(): number {
            return this.targetMapId
        }

        //% block="on $this teleport event"
        //% weight=25
        //% this.defl=warp
        //% this.shadow=variables_get
        onTeleportEvent(a: () => void) {
            this.on_teleport_event = a
        }

        //% block="$this enable"
        //% weight=20
        //% this.defl=warp
        //% this.shadow=variables_get
        enable() {
            this.enabled = true
        }

        //% block="$this disable"
        //% weight=15
        //% this.defl=warp
        //% this.shadow=variables_get
        disable() {
            this.enabled = false
        }

        //% block="$this is enabled?"
        //% weight=10
        //% this.defl=warp
        //% this.shadow=variables_get
        isEnabled() {
            return this.enabled
        }

        //% block="$this is disabled?"
        //% weight=5
        //% this.defl=warp
        //% this.shadow=variables_get
        isDisabled() {
            return !this.enabled
        }

        //% block="$this append to map number$id"
        //% weight=20
        //% this.defl=stack
        //% this.shadow=variables_get
        appendToMap(id: number) {
            RPGMaker.appendToMap(this, id)
        }
    }
}