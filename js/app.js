// Angular module
angular.module('app', [])

	// Posts Controller, dependency injection
    .controller('appController', ['$scope', function($scope) {

        // get items
        $scope.itemsSaved = localStorage.getItem('items');
        $scope.items = (localStorage.getItem('items') !== null) ? JSON.parse($scope.itemsSaved) : [];
        localStorage.setItem('items', JSON.stringify($scope.items));
       
        $scope.count = 0;

        // To parse str to int
        $scope.parseInt = parseInt;

        // New item
        $scope.newItem = { id: $scope.count, name: '', comments: [] };
        
        $scope.submitItem = function() {
            
            console.log('submit', $scope.newItem);

            // push item into the items array
            $scope.items.push($scope.newItem);

            // store items
            localStorage.setItem('items', JSON.stringify($scope.items));

            // reset the form to pristine
            $scope.itemsForm.$setPristine(); 
            
            $scope.count++;

            // reset JavaScript object that holds the item
            $scope.newItem = { id: $scope.count, name: '', comments: [] };

            // set active class to first item
            if($scope.items.length == 1){
                $scope.activeItem = $scope.items[0];
            }

        };


        $scope.activeItem = $scope.items[0];
        // $scope.activeItem.comments = [];

        $scope.deleteItem = function(item) {
            
            var index = $scope.items.indexOf(item);

            console.log(item, index);
            
            // change active class
            if($scope.activeItem == $scope.items[index]){
                $scope.items[index] == $scope.items[0] ? $scope.activeItem = $scope.items[1] : $scope.activeItem = $scope.items[0];
            }

            // push item into the items array
            $scope.items.splice(index,1);

            // store items
            localStorage.setItem('items', JSON.stringify($scope.items));

        };

        // set active class to an item
        $scope.setActive = function(item){
            $scope.activeItem = item;
        }

        // New comment
        $scope.newComment = { comment: '' };
        
        $scope.submitComment = function() {
            
            console.log('submit comment', $scope.newComment);

            $scope.activeItem !== undefined ? $scope.activeItem.comments.push($scope.newComment) : console.log('No item available');

            // store items
            localStorage.setItem('items', JSON.stringify($scope.items));

            // reset the form to pristine
            $scope.commentForm.$setPristine(); 
            
            // reset JavaScript object that holds the comment
            $scope.newComment = { comment: '' };

        };


    }])

;