import Sprite from '../base/sprite'

const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight
let frame = [] 
for (let j=0; j < 4; j++) 
{ let img = new Image(); img.src = 'images/bg' + (j+1) + '.jpg'; frame.push(img)}
let i = 1


/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround  {
  constructor(ctx) {
    this.render(ctx)

    this.top = 0
  }

  update() {
    this.top += 2
    

    this.top > screenHeight && (i == 3 ? i = 0 : i++ , this.top = 0)
  }

  updatezy() {
    this.top += 1


    this.top > screenHeight && (i == 3 ? i = 0 : i++ , this.top = 0)
    
  }



  /**
   * 背景图重绘函数
   * 绘制两张图片，两张图片大小和屏幕一致
   * 第一张漏出高度为top部分，其余的隐藏在屏幕上面
   * 第二张补全除了top高度之外的部分，其余的隐藏在屏幕下面
   */
  render(ctx) {
    ctx.drawImage(
      frame[i],
      0,
      -screenHeight + this.top,
      screenWidth,
      screenHeight
    )

    ctx.drawImage(
      frame[(i? i-1 : 3)],
      0,
      this.top,
      screenWidth,
      screenHeight
    )
  }

}
