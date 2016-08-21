Template.weapon.helpers({

});
Template.weapon.events({
	'click .weapon': function(e){
		e.preventDefault();
		armory.update({},{$set: {playState: "paused"}},{multi: true});
		//Meteor.call('writeResult',,function(error,result)
		//alert(this.name);
	}
})