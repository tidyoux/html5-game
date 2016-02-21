
function GameWorld(width, height) {
	World.call(this, width, height);
	var self = this;
	var render = this.render;
	var stage = this.stage;

	this.init = function() {
		this.initBkg();
		this.initTitle();
		this.initBody();
	}

	this.initBkg = function() {
		var bkg = new ImageView(render, "bkg.jpg");
		bkg.setWidth(this.size.width);
		bkg.setHeight(this.size.height);
		stage.addChild(bkg);
	}

	this.initTitle = function() {
		var titleBoard = new ImageView(render, "title.png");
		titleBoard.setWidth(this.size.width);
		titleBoard.setHeight(40);
		stage.addChild(titleBoard);

		var backBtn = new ButtonView(render, "btn_return.png");
		backBtn.setWidth(20);
		backBtn.setHeight(20);
		backBtn.setPositionX(15);
		backBtn.setPositionY(10);
		titleBoard.addChild(backBtn);

		var titleLabel = new TextView(render, "开心摇摇乐");
		titleLabel.setFont("16px 黑体");
		titleLabel.setPositionX(50);
		titleLabel.setPositionY(28);
		titleBoard.addChild(titleLabel);

		var refreshBtn = new ButtonView(render, "btn_refresh.png");
		refreshBtn.setWidth(20);
		refreshBtn.setHeight(20);
		refreshBtn.setPositionX(210);
		refreshBtn.setPositionY(10);
		titleBoard.addChild(refreshBtn);

		var shareBtn = new ButtonView(render, "btn_share.png");
		shareBtn.setWidth(20);
		shareBtn.setHeight(20);
		shareBtn.setPositionX(250);
		shareBtn.setPositionY(10);
		titleBoard.addChild(shareBtn);

		var moreBtn = new ButtonView(render, "btn_more_op.png");
		moreBtn.setWidth(6);
		moreBtn.setHeight(20);
		moreBtn.setPositionX(290);
		moreBtn.setPositionY(10);
		titleBoard.addChild(moreBtn);

		var ruleBoard = new ImageView(render, "rule_board.png");
		ruleBoard.setWidth(80);
		ruleBoard.setHeight(20);
		ruleBoard.setPositionX(this.size.width - 80);
		ruleBoard.setPositionY(40);
		titleBoard.addChild(ruleBoard);

		var ruleLabel = new TextView(render, "查看游戏规则");
		ruleLabel.setFont("12px 黑体");
		ruleLabel.setStyle("#ffffff");
		ruleLabel.setPositionX(ruleBoard.getPositionX() + 5);
		ruleLabel.setPositionY(ruleBoard.getPositionY() + 16);
		ruleBoard.addChild(ruleLabel);
	}

	this.initBody = function() {
		var costLabel = new TextView(render, "10金币可以玩一次");
		costLabel.setFont("10px 黑体");
		costLabel.setStyle("#ffff00");
		costLabel.setPositionX(115);
		costLabel.setPositionY(142);
		stage.addChild(costLabel);

		var startPt = new Point(50, 210);
		var ox = 73;
		for (var i = 0; i < 3; i++) {
			var img = new ImageView(render, "num_7.png");
			img.setWidth(70);
			img.setHeight(90);
			img.setPositionX(startPt.x + i * ox);
			img.setPositionY(startPt.y);
			stage.addChild(img);
		}

		var noteLabel = new TextView(render, "点击PLAY，开始摇奖，祝您好运！");
		noteLabel.setFont("14px 黑体");
		noteLabel.setStyle("#ffffff");
		noteLabel.setPositionX(60);
		noteLabel.setPositionY(355);
		stage.addChild(noteLabel);

		var playBtn = new ButtonView(render, "btn_play_norm.png", "btn_play_sel.png", "btn_play_dis.png");
		playBtn.setWidth(150);
		playBtn.setHeight(60);
		playBtn.setPositionX(85);
		playBtn.setPositionY(448);
		playBtn.setTouchEnabled(true);
		playBtn.setTouchEndedHandler(
				function() {
					self.playBtn.setTouchEnabled(false);
					self.startRandom();
				});
		stage.addChild(playBtn);
		this.playBtn = playBtn;

		var rewardListLabel = new TextView(render, "获奖！恭喜唔咔咔获奖！恭喜小");
		rewardListLabel.setFont("16px 黑体");
		rewardListLabel.setStyle("#ffffff");
		rewardListLabel.setPositionX(50);
		rewardListLabel.setPositionY(580);
		stage.addChild(rewardListLabel);
	}

	this.startRandom = function() {
		//
		if (true) {
			this.showPopPanel();
		}
	}

	this.showPopPanel = function() {
		var bkg = new ImageView(render, "rule_board.png");
		bkg.setWidth(this.size.width);
		bkg.setHeight(this.size.height);
		bkg.setTouchEnabled(true);
		stage.addChild(bkg);

		var board = new ImageView(render, "pop_board.png");
		board.setWidth(280);
		board.setHeight(350);
		board.setPositionX(bkg.getWidth() / 2 - board.getWidth() / 2);
		board.setPositionY(bkg.getHeight() / 2 - board.getHeight() / 2);
		bkg.addChild(board);

		var closeBtn = new ButtonView(render, "btn_close.png");
		closeBtn.setWidth(40);
		closeBtn.setHeight(40);
		closeBtn.setPositionX(board.getPositionX() + board.getWidth() - closeBtn.getWidth() / 2 - 10);
		closeBtn.setPositionY(board.getPositionY() - closeBtn.getHeight() / 2 + 12);
		closeBtn.setTouchEnabled(true);
		closeBtn.setTouchEndedHandler(
				function() {
					bkg.removeFromParent();
					self.playBtn.setTouchEnabled(true);
				});
		board.addChild(closeBtn);

		var noteLabel1 = new TextView(render, "哎呀，差点就中了！");
		noteLabel1.setFont("24px 黑体");
		noteLabel1.setPositionX(board.getPositionX() + 40);
		noteLabel1.setPositionY(board.getPositionY() + 80);
		board.addChild(noteLabel1);

		var icon = new ImageView(render, "img_2.png");
		icon.setWidth(120);
		icon.setHeight(120);
		icon.setPositionX(board.getPositionX() + board.getWidth() / 2 - icon.getWidth() / 2);
		icon.setPositionY(board.getPositionY() + board.getHeight() / 2 - icon.getHeight() / 2 - 10);
		board.addChild(icon);

		var againBtn = new ButtonView(render, "btn_again.png");
		againBtn.setWidth(150);
		againBtn.setHeight(50);
		againBtn.setPositionX(board.getPositionX() + board.getWidth() / 2 - againBtn.getWidth() / 2);
		againBtn.setPositionY(icon.getPositionY() + 150);
		againBtn.setTouchEnabled(true);
		againBtn.setTouchEndedHandler(
				function() {
					bkg.removeFromParent();
					self.playBtn.setTouchEnabled(true);
				});
		board.addChild(againBtn);

		var againLabel = new TextView(render, "再来一次");
		againLabel.setFont("20px 黑体");
		againLabel.setStyle("#ffffff");
		againLabel.setPositionX(againBtn.getPositionX() + 35);
		againLabel.setPositionY(againBtn.getPositionY() + 32);
		againBtn.addChild(againLabel);
	}
}

//
function start() {
	var world = new GameWorld(320, 640);
	world.init();
}
start();
