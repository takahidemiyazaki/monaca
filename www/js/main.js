/*
 * runstant
 */
var WIDTH = 640;
var HEIGHT = 384;

phina.globalize();

var ASSETS = {
  image: {
    'background':'img/back.jpg',
    'jin': 'img/jin.gif',
    'jin6a':'img/jin6a.gif',
  },
  spritesheet: {
    'jin_ss': 'ss/jin.ss',
    'jin6a_ss':'ss/jin6a.ss',
  },
};

phina.define('MainScene', {
  superClass: 'DisplayScene',
  
  init: function() {
    this.superInit();

    //背景スプライト
    var background = Sprite('background').addChildTo(this);
    background.x = WIDTH/2;
    background.y = HEIGHT/2;
    background.width = WIDTH;
    background.height = HEIGHT;
    
    //jinスプライト    
    this.jin = Sprite('jin', 183.7, 220)
      .addChildTo(this)
      .setPosition(WIDTH/2, HEIGHT/2 + 65)
      .setScale(1);

    //jin6aスプライト
    this.jin6a = Sprite('jin6a', 263.6, 305)
      .addChildTo(this)
      .setPosition(WIDTH/2 + 120, HEIGHT/2 + 25)
      .setScale(1);
    this.jin6a.scaleX = -1;
      
    //SpriteSheetを定義して、jinスプライトにアタッチ
    var ss1 = FrameAnimation('jin_ss');
    ss1.attachTo(this.jin);
    //アニメーションを再生する
    ss1.gotoAndPlay('start');
    
    var ss2 = FrameAnimation('jin6a_ss');
    ss2.attachTo(this.jin6a);
    ss2.gotoAndPlay('start');
    
    this.age = 0;
  },
  
  update: function() {
      this.age = this.age + 1 ;
      
    if (this.age > 50) {
         //(this.jin);
    }
  }
  
});

phina.main(function() {
  var app = GameApp({
    startLabel: 'main',
    width: WIDTH,
    height: HEIGHT,
    assets: ASSETS,
  });
    app.fps = 60;
    app.enableStats();
    //app.resize(WIDTH, HEIGHT); // リサイズ
    //app.fitWindow();    // 自動フィット
    app.run();
});
