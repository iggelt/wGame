Template.weapon.helpers({

});
Template.weapon.events({
	'click .weapon': function(e){
		e.preventDefault();
		newHeight	=	e.currentTarget.naturalHeight*1.5;
		newWidth	=	e.currentTarget.naturalWidth*1.5;
		armory.update({},{$set: {playState: "paused",display: "display: none;",height: newHeight,width: newWidth }},{multi: true});
		armory.update(this._id,{$set: {angle: 0,display: "",}});
		Games.update(Games.findOne({})._id,{$set: {result: this.objId}});
		Session.set("gameStatus","finishAnimation");
		Meteor.setTimeout(function(){
			if(Session.get("gameStatus")==="finishAnimation"){
				Session.set("gameStatus","finished");
			}
		},1000);
		
		
	},
	'load .weapon': function(e){
		e.preventDefault();
		newHeight	=	e.currentTarget.naturalHeight*((11-this.rank)/10);
		newWidth	=	e.currentTarget.naturalWidth*((11-this.rank)/10);
		armory.update(this._id,{$set: {imgLoaded: true,height: newHeight,width: newWidth}});
	}
})
