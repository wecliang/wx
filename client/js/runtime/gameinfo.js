const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

let atlas = new Image()
atlas.src = 'images/Common.png'


let  frame = 0 ,dec = true , rame  = 0

export default class GameInfo {
  renderGameScore(ctx, score ,lock) {
    ctx.fillStyle = "#ffffff"
    ctx.font      = "20px Arial"

    ctx.fillText(
      score,
      10,
      30
    )

    ctx.drawImage(
      atlas,
      2,240,20,60,
      5,48,
      10,30
    )

    ctx.fillText(
      lock,
      20,
      70
    )
    
  }

  randerCarte(ctx){
      

  }

  randplayerplan(ctx,ms){

    for(var i=0;i<ms;i++)
    {
      var y = i*30
      ctx.drawImage(
        atlas,
        24, 240, 15, 60,
        10,
        screenHeight / 2-100-y,
        10,
        30
      )
    }

  }

  renderGameOver(ctx, score ,x,scores) {
    ctx.drawImage(atlas, 0, 0, 119, 108, screenWidth / 2 - 145, screenHeight / 2-150, 300, 300)

    ctx.fillStyle = "#fb859b"
    ctx.font    = "26px Arial"

    ctx.fillText(
      '游戏结束',
      screenWidth / 2 - 60,
      screenHeight / 2 -105
    )
    ctx.fillStyle = "#000000"
    ctx.font = "24px Arial"
    ctx.fillText(
      '得分: ' + score,
      screenWidth / 2 -70,
      screenHeight / 2 - 50
    )

    ctx.fillText(
      '加分: ' + x,
      screenWidth / 2 - 70,
      screenHeight / 2 - 15
    )

    ctx.fillText(
      '总积分:+ ' + scores,
      screenWidth / 2 - 93,
      screenHeight / 2 + 20
    )

    ctx.drawImage(
      atlas,
      378, 10, 44, 16,
      screenWidth / 2 -110,
      screenHeight / 2+40,
      100, 60
    )

    ctx.fillStyle = "#5c3903"
    ctx.font = "22px Arial"

    ctx.fillText(
      '返回首页',
      screenWidth / 2 -107,
      screenHeight / 2+75
    )
    this.fhbtnArea = {
      startX: screenWidth / 2 - 110,
      startY: screenHeight / 2 +40,
      endX: screenWidth / 2 -10,
      endY: screenHeight / 2 +100
    }

    ctx.drawImage(
      atlas,
      378, 10, 44, 16,
      screenWidth / 2 +10,
      screenHeight / 2+40,
      100, 60
    )

    ctx.fillText(
      '重新开始',
      screenWidth / 2 +13,
      screenHeight / 2 +75
    )

    this.btnArea = {
      startX: screenWidth / 2 +10,
      startY: screenHeight / 2 +40,
      endX: screenWidth / 2 + 110,
      endY: screenHeight / 2 +100
    }

    /*
     * 提示内容！
     */


    ctx.fillStyle = "#fffefe"
    ctx.font = "22px Arial"

    frame++
    frame % 400 == 0 && (dec ? dec = false : dec = true  , rame = frame+20)

    frame > rame  &&
    (
    ctx.drawImage(atlas, 0, 150, 134, 85, screenWidth / 2 - 150, screenHeight / 2 - 280, 300, 100),
   ctx.fillText(
      '提示！：',
      screenWidth / 2 - 130,
      screenHeight / 2 - 250
    ),

      dec ?
        ctx.fillText(
          '点击敌人可以使用追踪弹!',
          screenWidth / 2 - 120,
          screenHeight / 2 - 215
        )
        :
        ctx.fillText(
          '击杀特殊敌人可获得加成！',
          screenWidth / 2 - 120,
          screenHeight / 2 - 215
        )

    )


  }


  


}

