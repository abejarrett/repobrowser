

angular.module('GHRepoBrowserApp.controllers',[]).

filter('startFrom',function(){
   return function(data, start){
    return data.slice(start);
 }
}).
  controller('repoController', function($scope, ghAPIservice) {

    $scope.repoList = [];
    $scope.linkheaders;
    $scope.error = false;
    $scope.commitserror = false;
    $scope.commits = [];
    $scope.showcommits = false;

    //break down the link header
    function parse_link_header(header) {
      if (header.length === 0) {
          throw new Error("input must not be of zero length");
      }

      // Split parts by comma
      var parts = header.split(',');
      var links = {};
      // Parse each part into a named link
      for(var i=0; i<parts.length; i++) {
          var section = parts[i].split(';');
          if (section.length !== 2) {
              throw new Error("section could not be split on ';'");
          }
          var url = section[0].replace(/<(.*)>/, '$1').trim();
          var name = section[1].replace(/rel="(.*)"/, '$1').trim();
          links[name] = url;
      }
      return links;
    }

    $scope.$watch(function () { return ghAPIservice.getOrgName(); }, function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.OrgName = newValue;
        }
    });

    $scope.nextPage = function () {
      var url = $scope.linkheaders.next;
      getorgrepos(url);
      console.log(url);
    }

    $scope.prevPage = function () {
      var url = $scope.linkheaders.prev;
      getorgrepos(url);
      console.log("clicked prev page");
    }

    $scope.lastPage = function () {
      var url = $scope.linkheaders.next;
      getorgrepos(url);
      console.log (url);
    }

 //get the name once enter key is pressed
     $scope.action = function (url) {
          getorgrepos(url);
    };

    function getorgrepos (url) {
          ghAPIservice.getOrgRepos(url).success(function (result, status, headers, config) {
               $scope.repoList = result;
               $scope.linkheaders = parse_link_header(headers("link"));
               $scope.error= false;
            }).error(function(response) {
                $scope.error = true;
                $scope.repoList =response;
          });
    };

    $scope.getCommits = function (repo){
      ghAPIservice.getRepoCommits(repo).success(function (response){
           $scope.commits = response;
           $scope.commitserror = false;
           //$scope.showcommits=true;
      }).error(function(response) {
           $scope.commits = response;
           $scope.commitserror = true;
           $scope.showcommits=false;
      });
    };

    $scope.$watch('OrgName', function (newValue, oldValue) {
        if (newValue !== oldValue) ghAPIservice.setOrgName(newValue);
    });

  }).

  directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});



