app.config(['growlProvider', function(growlProvider){
		//growlProvider.globalPosition('bottom-right');
		growlProvider.onlyUniqueMessages(false);
}]);

app.factory('Config', function() {
  return {
      apiURL : 'http://localhost:9000/api/v1/'
  };
});