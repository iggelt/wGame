Games = new Meteor.Collection('games');

Meteor.methods({
	createGame: function(){
		return Games.insert({result: null, date: new Date(),durationOfGame: 3});
	},
	writeResult: function(gameId,objId){
		Games.update(gameId,{$set: {result: "objId"}});
	}
});