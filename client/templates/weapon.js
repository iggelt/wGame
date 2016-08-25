Template.weapon.helpers({

});
Template.weapon.events({
	'click .weapon': function(e){
		e.preventDefault();
		armory.update({},{$set: {playState: "paused",display: "display: none;" }},{multi: true});
		armory.update(this._id,{$set: {angle: 0,display: ""}});
		Games.update(Games.findOne({})._id,{$set: {result: this.objId}});
		Session.set("endGameAnimation",true);
		Meteor.setTimeout(function(){
			Session.set("endGameAnimation",false);
		},1000);
		
		
	},
	'load .weapon': function(e){
		e.preventDefault();
		newHeight	=	e.currentTarget.naturalHeight*((10-this.rank)/10);
		newWidth	=	e.currentTarget.naturalWidth*((10-this.rank)/10);
		armory.update(this._id,{$set: {imgLoaded: true,height: newHeight,width: newWidth}});
	}
})
