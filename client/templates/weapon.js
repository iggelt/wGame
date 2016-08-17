Template.weapon.helpers({
	attributes: function(){
		var attributes = {};
		attributes.width = 500 + "px";
		Meteor.setInterval(function(){
			attributes.width = 100 + "px";
		},5000);
		
		
		return attributes;
	}

});