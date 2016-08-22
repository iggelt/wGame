Template.weapon.helpers({

});
Template.weapon.events({
	'click .weapon': function(e){
		e.preventDefault();
		armory.update({},{$set: {playState: "paused"}},{multi: true});
		alert(this.objId);
		Games.update(Games.findOne({})._id,{$set: {result: this.objId}});
		//Meteor.call('writeResult',,function(error,result)
		//alert(this.name);
	}
})
