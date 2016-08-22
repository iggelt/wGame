GAME_TIME=5;
weaponSelected=false;
armory = new Meteor.Collection(null);
Meteor.setTimeout(function(){alert("test finish")},GAME_TIME*3000);

Template.game.helpers({
	armory: function(){
		if(armory.find().count()==0){
			var weapArr = Weapons.find().fetch();		
			var zind=1000;
			var topLeftRightBottom=1;
			for(i=0; i<weapArr.length;i++){
				var thisWeap = weapArr[i];		
				for(r=Math.max(3-thisWeap.rank,1); r>0;r--){
					thisWeap.objId				=	thisWeap._id;
					delete thisWeap["_id"];
					thisWeap.duration			=	5;
					thisWeap.delay				=   1+thisWeap.rank+Math.round(Math.random()*4);
					thisWeap.zind				=   zind++; 
					thisWeap.playState			= "running";
					if(topLeftRightBottom%4==0){
						thisWeap.leftOrRight		= "left";
						thisWeap.leftOrRightVal		= 100;
						thisWeap.bottomOrTop		= "top";
						thisWeap.bottomOrTopVal		= Math.round(Math.random()*100);
						thisWeap.animationName	= "moveLeft"
						thisWeap.animationNameB	= "gravity"
						thisWeap.durationB			=	10;
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
						thisWeap.durationB			=	10;
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
	}
})
