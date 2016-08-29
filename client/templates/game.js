armory = new Meteor.Collection(null);
Session.set("gameStatus", "notStarted");
Session.set("countDownTimeout", "null");
Session.set("startGameTimeout", "null");
Session.set("clickWeaponTimeout", "null");

function countDown(){
	console.log("countDownWorked");
	console.log(Session.get("gameStatus"));
	var secondsLeft =  Session.get("countDown");
	if (secondsLeft>0&&Session.get("gameStatus")=== "countDown"){	
		var timeoutId=Meteor.setTimeout(function(){
			console.log("countDown()TimeoutFunctionWorked");
			console.log(Session.get("gameStatus"));
			Session.set("countDown", --secondsLeft);
			countDown();
		},1000);
		Session.set("countDownTimeout", timeoutId);
	}else if((secondsLeft===0||secondsLeft<0)&&Session.get("gameStatus")=== "countDown"){
		startGame();
	}
}

function startGame(){

	//if(Games.find()>0){
	Session.set("gameStatus", "started");
	console.log("startGameWorked");
	console.log(Session.get("gameStatus"));
	armory.update({},{$set: {playState: "running"}},{multi: true});
	
		var timeoutId=Meteor.setTimeout(function(){
			console.log("startGame()TimeoutFunctionWorked");
			console.log(Session.get("gameStatus"));
			if(Session.get("gameStatus") === "started"){
				armory.update({},{$set: {playState: "paused"}},{multi: true});
				var cheapestObj = Weapons.findOne({},{sort:{rank:1}}); 
				Games.update(Games.findOne({})._id,{$set: {result: cheapestObj}});
				Session.set("gameStatus","finished");
			}
		
		},Games.findOne().durationOfGame*1000);
		Session.set("startGameTimeout",timeoutId);
	//}
}


Template.game.onDestroyed(function () {
  armory.remove({});
  var countDownId		=	Session.get("countDownTimeout");
  var startGameId		=	Session.get("startGameTimeout");
  var weaponClickedId 	=	Session.set("clickWeaponTimeout");
  if(countDownId){
	  Meteor.clearTimeout(countDownId);
	  console.log("countDownTimeout cleared");
  }
  if(startGameId){
	  Meteor.clearTimeout(startGameId);
	  console.log("startGameTimeout cleared");
  }
  if(weaponClickedId){
	  Meteor.clearTimeout(weaponClickedId);
	  console.log("weaponClickedTimeout cleared");
  }


  Session.set("gameStatus", "notStarted");
  Session.set("countDown", undefined);
  console.log("====================================================================================");
  	console.log(Session.get("gameStatus")+"  "+Games.findOne()._id);
});
Template.game.helpers({
	armory: function(){
		console.log("armoryCalled");
		console.log(Session.get("gameStatus"));
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
					thisWeap.duration			=	Math.round(Games.findOne().durationOfGame/3);
					thisWeap.delay				=   Math.max(currWeap.rank-1+Math.round(Math.random()*4),0.01);
					thisWeap.zind				=   zind++; 
					thisWeap.playState			= "paused";
					thisWeap.imgLoaded			= false;
					thisWeap.display			= "";
					this.height					= "";
					this.width					= "";
					if(topLeftRightBottom%4==0){
						thisWeap.leftOrRight		= "left";
						thisWeap.leftOrRightVal		= 100;
						thisWeap.bottomOrTop		= "top";
						thisWeap.bottomOrTopVal		= Math.round(Math.random()*100);
						thisWeap.animationName	= "moveLeft"
						thisWeap.animationNameB	= "gravity"
						thisWeap.durationB			=	5;
						thisWeap.angle				=	Math.round(Math.random()*30);
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
						thisWeap.angle				=	Math.round(Math.random()*-30);
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
						thisWeap.angle				=	Math.round(Math.random()*-30);
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
		console.log("getResultObjCalled");
		console.log(Session.get("gameStatus"));
		return Weapons.findOne(Games.findOne().result).name;
	},
	getGameIsOver: function(){
		console.log("getGameIsOverCalled");
		console.log(Session.get("gameStatus"));
		return Weapons.findOne(Games.findOne().result)!==undefined&&Session.get("gameStatus")!=="finishAnimation";
	},
	readyToStart: function(){
		console.log("readyToStartCalled");
		console.log(Session.get("gameStatus"));
		var ready=!(armory.find({imgLoaded: false}).count()>0);
		Session.setDefault("gameStatus","notStarted");
		if(ready&&(Session.get("gameStatus")==="notStarted"||Session.get("gameStatus")===undefined)){
			Session.set("countDown", 3);
			Session.set("gameStatus", "countDown");
			countDown();
		}
		return ready;
	},
	gameIsStarting: function(){
		console.log("gameIsStartingCalled");
		console.log(Session.get("gameStatus"));
		return Session.get("gameStatus") === "notStarted"||Session.get("gameStatus") === "countDown";
	},
	objectsLoaded: function(){
		console.log("objectsLoadedCalled");
		console.log(Session.get("gameStatus"));
		var totalNumberOfObjects = armory.find().count();
		var notFoundedObjects 	 = armory.find({imgLoaded: false}).count();
		return ((totalNumberOfObjects-notFoundedObjects)/totalNumberOfObjects)*100;
	},	
	countDown: function(){
		console.log("countDownCalled");
		console.log(Session.get("gameStatus"));
		return Session.get("countDown");
	},
		gameStatus: function(){
			console.log("gameStatusCalled");
			console.log(Session.get("gameStatus"));
		return Session.get("gameStatus")===undefined;
	},
			gameStatus2: function(){
			console.log("gameStatusCalled2");
			console.log(Session.get("gameStatus"));
		return Session.get("gameStatus");
	}
})
