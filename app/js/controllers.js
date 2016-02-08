

angular.module('GHRepoBrowserApp.controllers',[]).
  controller('repoController', function($scope, ghAPIservice) {

    $scope.repoList = [];
    $scope.error = false;
    $scope.commitserror = false;
    $scope.commits = [];
    $scope.showcommits = false;


    $scope.$watch(function () { return ghAPIservice.getOrgName(); }, function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.OrgName = newValue;
        }
    });

 //get the name once enter key is pressed
     $scope.action = function () {
          ghAPIservice.getOrgRepos().success(function (response) {
               $scope.repoList = response;
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



