Router.route('/',{
  name: 'game',
  waitOn: function(){
    return Meteor.subscribe('weapons');
  }
});
