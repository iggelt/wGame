armory = new Meteor.Collection(null);
Session.set("gameNotStarted", true);

function countDown(){
	console.log("cd");
	var secondsLeft =  Session.get("countDown");
	console.log(secondsLeft>0);
	if (secondsLeft>0){	
		Meteor.setTimeout(function(){
			Session.set("countDown", --secondsLeft);
			countDown();
		},1000);
	}else{
		startGame();
	}
}

function startGame(){
	Session.set("gameNotStarted", false);
	armory.update({},{$set: {playState: "running"}},{multi: true});
	Meteor.setTimeout(function(){
		armory.update({},{$set: {playState: "paused"}},{multi: true});
		var cheapestObj = Weapons.findOne({},{sort:{rank:1}}); 
		Games.update(Games.findOne({})._id,{$set: {result: cheapestObj}});	
	},Games.findOne().durationOfGame*1000);
}


Template.game.helpers({
	armory: function(){
		if(armory.find().count()==0){
			var weapArr = Weapons.find().fetch();		
			var zind=1000;
			var topLeftRightBottom=1;
			for(i=0; i<weapArr.length;i++){
				var thisWeap = {};
				var currWeap=weapArr[i];
				for (var key in currWeap) {
				thisWeap[key] = currWeap[key];
				}
					
				for(r=Math.max(3-thisWeap.rank,1); r>0;r--){
					thisWeap.objId				=	currWeap._id;
					delete thisWeap["_id"];
					thisWeap.duration			=	Games.findOne().durationOfGame/3;
					thisWeap.delay				=   currWeap.rank-1+Math.round(Math.random()*4);
					thisWeap.zind				=   zind++; 
					thisWeap.playState			= "paused";
					thisWeap.imgLoaded			= false;
					if(topLeftRightBottom%4==0){
						thisWeap.leftOrRight		= "left";
						thisWeap.leftOrRightVal		= 100;
						thisWeap.bottomOrTop		= "top";
						thisWeap.bottomOrTopVal		= Math.round(Math.random()*100);
						thisWeap.animationName	= "moveLeft"
						thisWeap.animationNameB	= "gravity"
						thisWeap.durationB			=	5;
						thisWeap.angle				=	Math.random()*30;
						thisWeap.xTranslate			=	100;
						thisWeap.yTranslate			=	0;
					}else if(topLeftRightBottom%3==0){
						thisWeap.leftOrRight		= "left";
						thisWeap.leftOrRightVal		= Math.round(Math.random()*100);
						thisWeap.bottomOrTop		= "bottom";
						thisWeap.bottomOrTopVal		= 100;
						thisWeap.animationName	= "moveDown"
						thisWeap.xTranslate			=	0;
						thisWeap.yTranslate			=	-100;
					}else if(topLeftRightBottom%2==0){
						thisWeap.leftOrRight		= "right";
						thisWeap.leftOrRightVal		= 100;
						thisWeap.bottomOrTop		= "top";
						thisWeap.bottomOrTopVal		= Math.round(Math.random()*100);
						thisWeap.animationName	= "moveRight"
						thisWeap.animationNameB	= "gravity"
						thisWeap.angle				=	Math.random()*-30;
						thisWeap.durationB			=	5;
						thisWeap.xTranslate			=	-100;
						thisWeap.yTranslate			=	0;
					}else{
						thisWeap.leftOrRight		= "left";
						thisWeap.leftOrRightVal		= Math.round(Math.random()*100);
						thisWeap.bottomOrTop		= "top";
						thisWeap.bottomOrTopVal		= 100;
						thisWeap.animationName	= "moveUp"
						thisWeap.animationNameB	= "gravity"
						thisWeap.angle				=	Math.random()*-30;
						thisWeap.durationB			=	10;
						thisWeap.xTranslate			=	0;
						thisWeap.yTranslate			=	100;
					}
					topLeftRightBottom++;
					armory.insert(thisWeap);
				}
			}

			
		}
		return armory.find();
	},
	getResultObj: function(){
		return Weapons.findOne(Games.findOne().result).name;
	},
	readyToStart: function(){
		var ready=!(armory.find({imgLoaded: false}).count()>0);
		if(ready&&Session.get("countDownStarted")!=true){
			Session.set("countDown", 3);
			Session.set("countDownStarted", true);
			countDown();
		}
		return ready;
	},
	gameNotStarted: function(){
		return Session.get("gameNotStarted");
	},
	objectsLoaded: function(){
		var totalNumberOfObjects = armory.find().count();
		var notFoundedObjects 	 = armory.find({imgLoaded: false}).count();
		return ((totalNumberOfObjects-notFoundedObjects)/totalNumberOfObjects)*100;
	},	
	countDown: function(){
		return Session.get("countDown");
	}
})
