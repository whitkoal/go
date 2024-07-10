import Player     from './player/index'
import Enemy      from './npc/enemy'
import Chessboard from './game/chessboard'
import GameInfo   from './runtime/gameinfo'
import Music      from './runtime/music'
import DataBus    from './databus'

let ctx   = canvas.getContext('2d')
let databus = new DataBus()

wx.cloud.init({
  // env 参数说明：
  //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
  //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
  //   如不填则使用默认环境（第一个创建的环境）
  // env: 'my-env-id',
})
const db = wx.cloud.database()

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId    = 0
    this.personalHighScore = null

    this.restart()
    this.login()
  }

  login() {
    // 获取 openid
    // wx.cloud.callFunction({
    //   name: 'login',
    //   success: res => {
    //     window.openid = res.result.openid
    //     this.prefetchHighScore()
    //   },
    //   fail: err => {
    //     console.error('get openid failed with error', err)
    //   }
    // })
  }

  prefetchHighScore() {
    // 预取历史最高分
    db.collection('score').doc(`${window.openid}-score`).get()
      .then(res => {
        if (this.personalHighScore) {
          if (res.data.max > this.personalHighScore) {
            this.personalHighScore = res.data.max
          }
        } else {
          this.personalHighScore = res.data.max
        }
      })
      .catch(err => {
        console.error('db get score catch error', err)
        this.prefetchHighScoreFailed = true
      })
  }

  restart() {
    databus.reset()

    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )

    this.bg       = new Chessboard(ctx)
    this.player   = new Player(ctx)
    this.gameinfo = new GameInfo()
    this.music    = new Music()

    this.bindLoop     = this.loop.bind(this)
    this.hasEventBind = false

    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

   // 游戏结束后的触摸事件处理逻辑
  touchEventHandler(e) {
     e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.gameinfo.btnArea

    if (   x >= area.startX
        && x <= area.endX
        && y >= area.startY
        && y <= area.endY  )
      this.restart()
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    this.bg.render(ctx)

    databus.bullets
          .concat(databus.enemys)
          .forEach((item) => {
              item.drawToCanvas(ctx)
            })

    this.player.drawToCanvas(ctx)

    databus.animations.forEach((ani) => {
      if ( ani.isPlaying ) {
        ani.aniRender(ctx)
      }
    })

    this.gameinfo.renderGameScore(ctx, databus.score)

    // 游戏结束停止帧循环
    if ( databus.gameOver ) {
      this.gameinfo.renderGameOver(
        ctx, 
        databus.score,
        this.personalHighScore
      )

      if ( !this.hasEventBind ) {
        this.hasEventBind = true
        this.touchHandler = this.touchEventHandler.bind(this)
        canvas.addEventListener('touchstart', this.touchHandler)
      }
    }
  }

  // 游戏逻辑更新主函数
  update() {
    if ( databus.gameOver )
      return;

    this.bg.update(ctx)


    databus.bullets
           .concat(databus.enemys)
           .forEach((item) => {
              item.update()
            })

    if ( databus.frame % 20 === 0 ) {
      this.player.shoot()
      this.music.playShoot()
    }
  }

  // 实现游戏帧循环
  loop() {
    databus.frame++

    this.update()
    this.render()

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}
