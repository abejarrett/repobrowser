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

    //kick off main repo by org request
    ghAPI.getOrgRepos = function(url) {
        var _url = url ? url :'https://api.github.com/orgs/' + ghAPI.getOrgName() + '/repos';
        return $http({
          method: 'GET',
          url: _url
        });
    }

    //kick of request for commits by repo
    ghAPI.getRepoCommits = function(repo){
        var _url = "https://api.github.com/repositories/" + repo.id + "/commits";
        return $http({
          method: 'GET',
          url: _url
        });
    }

  return ghAPI;
});


