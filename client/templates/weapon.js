Template.weapon.helpers({

});
Template.weapon.events({
	'click .weapon': function(e){
		e.preventDefault();
		alert(this.name);
	}
})