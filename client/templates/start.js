Template.start.events({
	'click .armoryButton': function(e){
		e.preventDefault();
		Meteor.call('createGame',function(error,result){
			Router.go('game',{_id: result});		
		});

		
	}
	
	
})