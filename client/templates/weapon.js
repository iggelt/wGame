Template.weapon.helpers({

});
Template.weapon.events({
	'click .weapon': function(e){
		e.preventDefault();
		armory.update({},{$set: {playState: "paused"}},{multi: true});
		Games.update(Games.findOne({})._id,{$set: {result: this.objId}});
	},
	'load .weapon': function(e){
		e.preventDefault();
		armory.update(this._id,{$set: {imgLoaded: true}});
	}
})
