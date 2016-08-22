Games = new Meteor.Collection('games');

Games.allow({
	update: function(userId, doc, fieldNames, modifier){
		return 	fieldnames.length === 1 && fieldNames[0]==='result' && doc.result===null;
	}
});

Meteor.methods({
	createGame: function(){
		return Games.insert({result: null, date: new Date(),durationOfGame: 3});
	},
	writeResult: function(gameId,objId){
		Games.update(gameId,{$set: {result: "objId"}});
	}
});
