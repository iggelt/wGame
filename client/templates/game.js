GAME_TIME=5;
weaponSelected=false;
armory = new Meteor.Collection(null);

Template.game.helpers({
	armory: function(){
		if(armory.find().count()==0){
			var weapArr = Weapons.find().fetch();		
			var zind=1000;
			var topLeftRightBottom=1;
			for(i=0; i<weapArr.length;i++){
				var thisWeap = weapArr[i];		
				for(r=thisWeap.rank; r>0;r--){
					thisWeap.objId				=	thisWeap._id;
					delete thisWeap["_id"];
					thisWeap.duration			=	10;
					thisWeap.delay				=   3;
					thisWeap.zind				=   zind++; 
					thisWeap.playState			= "running";
					if(topLeftRightBottom%4==0){
						thisWeap.leftOrRight		= "left";
						thisWeap.leftOrRightVal		= 100;
						thisWeap.bottomOrTop		= "top";
						thisWeap.bottomOrTopVal		= Math.round(Math.random()*100);
					}else if(topLeftRightBottom%3==0){
						thisWeap.leftOrRight		= "left";
						thisWeap.leftOrRightVal		= Math.round(Math.random()*100);
						thisWeap.bottomOrTop		= "bottom";
						thisWeap.bottomOrTopVal		= 100;
					}else if(topLeftRightBottom%2==0){
						thisWeap.leftOrRight		= "right";
						thisWeap.leftOrRightVal		= 100;
						thisWeap.bottomOrTop		= "top";
						thisWeap.bottomOrTopVal		= Math.round(Math.random()*100);
					}else{
						thisWeap.leftOrRight		= "left";
						thisWeap.leftOrRightVal		= Math.round(Math.random()*100);
						thisWeap.bottomOrTop		= "top";
						thisWeap.bottomOrTopVal		= 100;
					}
					topLeftRightBottom++;
					armory.insert(thisWeap);
				}
			}

			
		}
		return armory.find();
	}
})