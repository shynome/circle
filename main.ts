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
    let w1 = bar.width(), w2 = items.width()
    this.r = (w1 - w2)/2
    this.offset = { x:w1/2, y:w1/2 }
    let chunkAngle = this.chunkAngle = 360/items.length
    items.prop({
      angle:(index)=>index*this.chunkAngle,
      item:(index)=>items.eq(index)
    })
    //init
    let sync = this.sync
    bar.css({ position:'relative' })
    items.css({ position:'absolute', margin:w2/-2 }).each(function(this:any){ sync(this.angle,this.item) })
    let rotateTo = this.rotateTo
    this.items.on('click.circle.toggle',function(this:any){
      rotateTo(this.angle*-1)
      bar.trigger('circle.toggle',items.index(this))
    })
  }
  getPositionByAngle = (angle:number)=>{
    let radian = angle*deg
    return {
      x: Math.sin(radian) * this.r + this.offset.x,
      y: Math.cos(radian) * this.r + this.offset.y,
    }
  }
  duration = 700
  sync = (angle:number,item:JQuery)=>{
    let { x, y } = this.getPositionByAngle(angle)
    item.css({ left:x, top:y })
  }
  easing:string = 'linear'
  state = { lastAngle:0 }
  rotateTo = (angle:number,nolimit=false)=>{
    let { items, duration, sync, state } = this
    angle = nolimit?angle:angle%360
    let map2dom:any = function(){
      let map2dom:(this:{angle:number,item:JQuery})=>void
            = nolimit 
            ? function (){ sync(this.angle,this.item) }
            : function (){ sync(this.angle,this.item) }
      return map2dom
    }()
    return items.stop(true).animate(
      { angle:`+=${angle}` },
      {
        duration:duration,
        easing:this.easing,
        step:map2dom,
        complete:map2dom,
      }
    ).promise()
  }
}