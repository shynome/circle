import *as $ from 'jquery'
const deg = Math.PI/180
export class Circle {
  bar:JQuery
  items:JQuery
  r:number
  chunkAngle:number
  offset = { x:0, y:0, }
  constructor(bar:JQuery,items:JQuery){
    bar = this.bar = $(bar)
    items = this.items = $(items)
    this.chunkAngle = 360/items.length
    items.prop({
      angle:(index)=>index*this.chunkAngle,
      item:(index)=>items.eq(index)
    })
    let sync = this.sync
    items.each(function(this:any){ sync(this.angle,this.item) })
    debugger
  }
  getPositionByAngle = (angle:number)=>{
    let radian = angle*deg
    return {
      x: Math.sin(radian) * this.r + this.offset.x,
      y: Math.cos(radian) * this.r + this.offset.y,
    }
  }
  speed = 60/3000
  sync = (angle:number,item:JQuery)=>{
    let { x, y } = this.getPositionByAngle(angle)
    item.css({ left:x, top:y })
  }
  rotateTo = (angle:number,withoutAnimation?:boolean)=>{
    let { items, speed, sync } = this
    angle = angle%360
    items.prop('angle',(index,angle)=>angle%360)
    let lastAngle = items.prop('angle')
    let gapAngle = angle - lastAngle
    let duration = gapAngle/speed
    items.stop(true)
    let nextState = { angle: `+=${gapAngle}` }
    if(withoutAnimation){
      items.css(nextState)
    }else{
      items.animate(
        nextState,
        {
          duration:duration,
          step(this:any){ sync(this.angle,this.item) },
        }
      )
    }
  }
}