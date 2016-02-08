angular.module('GHRepoBrowserApp.services', []).
  factory('ghAPIservice', function($http) {

    var ghAPI = {};

    ghAPI.OrgName = '';

    ghAPI.getOrgName = function () {
      return this.OrgName;
    }

    ghAPI.setOrgName = function (orgName) {
            this.OrgName = orgName;
    }




    ghAPI.getOrgRepos = function() {
        var _url = 'https://api.github.com/orgs/' + ghAPI.getOrgName() + '/repos';
        return $http({
          method: 'GET',
          url: _url
        });
    }

    ghAPI.getRepoCommits = function(repo){
        var _url = "https://api.github.com/repositories/" + repo.id + "/commits";
        return $http({
          method: 'GET',
          url: _url
        });
    }

  return ghAPI;
});


