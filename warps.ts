//% block="RPG - Warps" weight=2
//% color="#735290" icon="\uf1e5"
namespace Warps {
    //% block="create new warp at x$x at y$y target at x$targetX target at y$targetY do transition?$doTransition target map id$targetMapId"
    //% x.min=0 x.max=4 y.min=0 y.max=4 targetX.min=0 targetX.max=4 targetY.min=0 targetY.max=4
    //% weight=120 color="#623775"
    export function createWarp(x: number, y: number, targetX: number, targetY: number, doTransition: boolean, targetMapId: number) {
        return new warp(x, y, targetX, targetY, doTransition, targetMapId)
    }

    export class warp {
        kind: 'warp' = 'warp'
        private _originX: number
        private _originY: number
        private _targetX: number
        private _targetY: number
        private _transition: boolean
        private _targetMapId: number
        private _on_teleport_event = () => {}
        private _enabled = true
        constructor(originX: number, originY: number, targetX: number, targetY: number, doTransition: boolean, targetMapId: number) {
            this._originX = originX
            this._originY = originY
            this._targetX = targetX
            this._targetY = targetY
            this._transition = doTransition
            this._targetMapId = targetMapId
        }

        //% block="$this set origin x to$newX"
        //% newX.min=0 newX.max=4
        //% weight=115
        //% this.defl=warp
        //% this.shadow=variables_get
        setOriginX(newX: number) {
            this._originX = newX
        }

        //% block="$this set origin y to$newY"
        //% newY.min=0 newY.max=4
        //% weight=110
        //% this.defl=warp
        //% this.shadow=variables_get
        setOriginY(newY: number) {
            this._originY = newY
        }

        //% block="$this change origin x by$addX"
        //% addX.min=0 addX.max=4
        //% weight=105
        //% this.defl=warp
        //% this.shadow=variables_get
        changeOriginX(addX: number) {
            this._originX += addX
        }

        //% block="$this change origin y by$addY"
        //% addY.min=0 addY.max=4
        //% weight=100
        //% this.defl=warp
        //% this.shadow=variables_get
        changeOriginY(addY: number) {
            this._originY += addY
        }

        //% block="$this set origin to x$x y$y"
        //% x.min=0 x.max=4 y.min=0 y.max=4
        //% weight=95
        //% this.defl=warp
        //% this.shadow=variables_get
        setOriginPosition(x: number, y: number) {
            this._originX = x
            this._originY = y
        }

        //% block="$this get origin x"
        //% weight=90 color="#623775"
        //% this.defl=warp
        //% this.shadow=variables_get
        originX(): number {
            return this._originX
        }

        //% block="$this get origin y"
        //% weight=85 color="#623775"
        //% this.defl=warp
        //% this.shadow=variables_get
        originY(): number {
            return this._originY
        }

        //% block="$this set target x to$newX"
        //% newX.min=0 newX.max=4
        //% weight=80
        //% this.defl=warp
        //% this.shadow=variables_get
        setTargetX(newX: number) {
            this._targetX = newX
        }

        //% block="$this set target y to$newY"
        //% newY.min=0 newY.max=4
        //% weight=75
        //% this.defl=warp
        //% this.shadow=variables_get
        setTargetY(newY: number) {
            this._targetY = newY
        }

        //% block="$this change target x by$addX"
        //% addX.min=0 addX.max=4
        //% weight=70
        //% this.defl=warp
        //% this.shadow=variables_get
        changeTargetX(addX: number) {
            this._targetX += addX
        }

        //% block="$this change target y by$addY"
        //% addY.min=0 addY.max=4
        //% weight=65
        //% this.defl=warp
        //% this.shadow=variables_get
        changeTargetY(addY: number) {
            this._targetY += addY
        }

        //% block="$this set target to x$x y$y"
        //% x.min=0 x.max=4 y.min=0 y.max=4
        //% weight=60
        //% this.defl=warp
        //% this.shadow=variables_get
        setTargetPosition(x: number, y: number) {
            this._targetX = x
            this._targetY = y
        }

        //% block="$this get target x"
        //% weight=55 color="#623775"
        //% this.defl=warp
        //% this.shadow=variables_get
        targetX(): number {
            return this._targetX
        }

        //% block="$this get target y"
        //% weight=50 color="#623775"
        //% this.defl=warp
        //% this.shadow=variables_get
        targetY(): number {
            return this._targetY
        }

        //% block="$this enable transition?$transition"
        //% weight=45
        //% this.defl=warp
        //% this.shadow=variables_get
        enableTransition(transition: boolean) {
            this._transition = transition
        }

        //% block="$this transition enabled?"
        //% weight=40 color="#623775"
        //% this.defl=warp
        //% this.shadow=variables_get
        isTransitionEnabled(): boolean {
            return this._transition
        }

        //% block="$this set target map id to$newMapId"
        //% weight=35
        //% this.defl=warp
        //% this.shadow=variables_get
        setTargetMap(newMapId: number) {
            this._targetMapId = newMapId
        }

        //% block="$this get target map id"
        //% weight=30 color="#623775"
        //% this.defl=warp
        //% this.shadow=variables_get
        targetMap(): number {
            return this._targetMapId
        }

        //% block="on $this teleport event"
        //% weight=25
        //% this.defl=warp
        //% this.shadow=variables_get
        onTeleportEvent(a: () => void) {
            this._on_teleport_event = a
        }

        //% block="$this enable"
        //% weight=20
        //% this.defl=warp
        //% this.shadow=variables_get
        enable() {
            this._enabled = true
        }

        //% block="$this disable"
        //% weight=15
        //% this.defl=warp
        //% this.shadow=variables_get
        disable() {
            this._enabled = false
        }

        //% block="$this is enabled?"
        //% weight=10
        //% this.defl=warp
        //% this.shadow=variables_get
        isEnabled() {
            return this._enabled
        }

        //% block="$this is disabled?"
        //% weight=5
        //% this.defl=warp
        //% this.shadow=variables_get
        isDisabled() {
            return !this._enabled
        }
    }
}