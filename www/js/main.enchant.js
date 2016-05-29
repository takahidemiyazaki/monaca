enchant();

// リソース(予め使いそうなリソースを用意しておく)
var ENEMY_IMAGE_PATH_6A = "img/jin6a.gif"; // エネミーイメージ
var ENEMY_IMAGE_PATH_3C = "img/jin2b.gif";
var ENEMY_IMAGE_PATH = "img/jin.gif";
var MAP_IMAGE_PATH    = "img/back.jpg";   // マップイメージ
var PLAYER_IMAGE_PATH = "img/raguna.gif"; //プレイヤーイメージ
var width = 640;
var height = 384;
var game = null;

var rand = function(){return Math.floor( Math.random() * 2 )} //0か1の乱数生成

// jinクラス
var TestJinSprite = Class.create(Sprite, {
    // 初期化
    initialize: function() {
    Sprite.call(this, 183.7,220);
    
	this.image = game.assets[ENEMY_IMAGE_PATH];	// 画像をセット
    this.frame=0;
    this.x=(game.width/2)-(this.width/2) + 100;
    this.y= (game.height/2)-(this.height/2) + 30;
    this.scaleX = -1;
    
    },
    
    // 更新処理
    onenterframe: function() {
        this.frame = Math.floor(this.age/6);
        if(this.frame > 20 ){
            game.rootScene.removeChild(this);
            if(rand() == 0){
                game.rootScene.addChild(new TestJin6aSprite());
            }else{
                game.rootScene.addChild(new TestJin3cSprite());
            }
        }
 
    }
});

// jin6aクラス
var TestJin6aSprite = Class.create(Sprite, {
    // 初期化
    initialize: function() {
    Sprite.call(this, 263.6,305);
    
	this.image = game.assets[ENEMY_IMAGE_PATH_6A];	// 画像をセット
    this.frame=0;
    this.x=(game.width/2)-(this.width/2) + 100;
    this.y= (game.height/2)-(this.height/2) - 12;
    this.scaleX = -1;
    
    },
    
    // 更新処理
    onenterframe: function() {
        this.frame = Math.floor(this.age/3);
        if(this.frame > 16 ){
            game.rootScene.removeChild(this);
            game.rootScene.addChild(new TestJinSprite());
        }
    }
});

// jin3cクラス
var TestJin3cSprite = Class.create(Sprite, {
    // 初期化
    initialize: function() {
    Sprite.call(this, 253,180);
    
    this.image = game.assets[ENEMY_IMAGE_PATH_3C];	// 画像をセット
    this.frame=0;
    this.x=(game.width/2)-(this.width/2) + 90;
    this.y= (game.height/2)-(this.height/2) + 55;
    this.scaleX = -1;
    
    },
    
    // 更新処理
    onenterframe: function() {
        this.frame = Math.floor(this.age/2);
        if(this.frame > 21 ){
            game.rootScene.removeChild(this);
            game.rootScene.addChild(new TestJinSprite());
        }
    }
});

// ragunaクラス
var TestRagunaSprite = Class.create(Sprite, {
    // 初期化
    initialize: function() {
    Sprite.call(this, 137,220);
    
    this.image = game.assets[PLAYER_IMAGE_PATH];	// 画像をセット
    this.frame=0;
    this.x=(game.width/2)-(this.width/2) - 50;
    this.y= (game.height/2)-(this.height/2) + 28;
    
    },
    
    // 更新処理
    onenterframe: function() {
        this.frame = Math.floor(this.age/5);
        if(this.frame > 16 ){
            //game.rootScene.removeChild(this);
            //game.rootScene.addChild(new TestJinSprite());
        }
    }
});

// メイン処理
window.onload = function() {
    
    game = new Game(width, height);
    var scale_w = window.innerWidth/width;
    var scale_h = window.innerHeight/height;
    　if (scale_h >= scale_w){
　　　　　game.scale = scale_w;
　　　}
　　　else{
　　　　　game.scale = scale_h;
　　　}
    
    // リソース(画像や音データ)読み込み
    game.preload(PLAYER_IMAGE_PATH,ENEMY_IMAGE_PATH,ENEMY_IMAGE_PATH_6A,ENEMY_IMAGE_PATH_3C,  MAP_IMAGE_PATH);
    game.fps = 60;
    
    game.onload = function() {
        var scene = game.rootScene;
    
        // 背景を作成
        var bgSprite = new Sprite(game.width, game.height);   // 背景用スプライト生成
        bgSprite.image = game.assets[MAP_IMAGE_PATH];                   // 背景色指定
        bgSprite.x = 0;
        bgSprite.y = 0;
        scene.addChild(bgSprite);   // シーンに追加
        
        //fps表示用
        timerLabel = new Label();
        timerLabel.moveTo(450, 10);
        timerLabel.text = "fps : 00";
        timerLabel.color = "red";
        timerLabel.addEventListener('enterframe',function(){
            timerLabel.text = "fps :" + game.frame +"rand"+rand();
        });
        scene.addChild(timerLabel);

        var jinSprite = new TestJinSprite();
        var ragunaSprite = new TestRagunaSprite();
        
        
        scene.addChild(ragunaSprite);
        scene.addChild(jinSprite);   // シーンに追加
        
    }
    
    game.start();
}


