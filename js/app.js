// Angular module
angular.module('app', [])

	// Posts Controller, dependency injection
    .controller('appController', ['$scope', function($scope) {

        // set and get items in LocalStorage
        $scope.itemsSaved = localStorage.getItem('items');
        $scope.items = (localStorage.getItem('items') !== null) ? JSON.parse($scope.itemsSaved) : [];
        localStorage.setItem('items', JSON.stringify($scope.items));
        
        // set count
        $scope.count = ($scope.items.length != 0) ? $scope.items.length : 0

        // To parse str to int
        $scope.parseInt = parseInt;

        // New item
        $scope.newItem = { id: $scope.count, name: '', comments: [] };
        
        $scope.submitItem = function() {
            
            console.log('submit', $scope.newItem);

            // push item into the items array and check for empty item
            $scope.newItem.name.length != 0 ? $scope.items.push($scope.newItem) : alert("Please type the name");

            // store items
            localStorage.setItem('items', JSON.stringify($scope.items));

            // reset the form to pristine
            $scope.itemsForm.$setPristine(); 
            
            // updating id
            $scope.updateId();

            // reset JavaScript object that holds the item
            $scope.newItem = { id: $scope.count, name: '', comments: [] };

            // set active class to first item
            if($scope.items.length == 1){
                $scope.activeItem = $scope.items[0];
            }

        };

        // default active item
        $scope.activeItem = $scope.items[0];

        // delete item
        $scope.deleteItem = function(item) {
            
            var index = $scope.items.indexOf(item);

            console.log(item, index);
            
            // change active class
            if($scope.activeItem == $scope.items[index]){
                $scope.items[index] == $scope.items[0] ? $scope.activeItem = $scope.items[1] : $scope.activeItem = $scope.items[0];
            }

            // push item into the items array
            $scope.items.splice(index,1);

            // updating id
            $scope.updateId();

            // store items
            localStorage.setItem('items', JSON.stringify($scope.items));

        };

        // updating id
        $scope.updateId = function(){
            $scope.count = 0;

            angular.forEach($scope.items, function(item){
                item.id = $scope.count++;
            });
        };

        // set active class to an item
        $scope.setActive = function(item){
            $scope.activeItem = item;
        };

        // new comment
        $scope.newComment = { comment: '' };
        
        $scope.submitComment = function() {
            
            console.log('submit comment', $scope.newComment);

            // push comment into the comments array and check if no item and empty comment
            $scope.activeItem !== undefined && $scope.newComment.comment.length > 0 ? $scope.activeItem.comments.push($scope.newComment) : alert('Please check if the item exist or you type the comment');

            // store items
            localStorage.setItem('items', JSON.stringify($scope.items));

            // reset the form to pristine
            $scope.commentForm.$setPristine(); 
            
            // reset JavaScript object that holds the comment
            $scope.newComment = { comment: '' };

        };


    }])

;