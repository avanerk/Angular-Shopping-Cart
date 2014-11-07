'use strict';

var app = angular.module('shoppingCart', ['localStorage']);

app.service('product', function product($http, $q, $rootScope) {

	var product = this;

	product.getAllProducts = function() {

		var defer = $q.defer();
		product.productList = [];

		$http.get('http://tmtl-03.ict-lab.nl/api/products')
		.success(function(res) {
			product.productList = res;
			defer.resolve(res);
		})
		.error(function(err, status) {
			defer.reject(err);
		})

		return defer.promise; 

	}

	return product;

});

//CartController

app.controller('CartController', ['$scope', '$store', 'product', function($scope, $store, product) {

	$scope.init = function() {
		$scope.getAll();
	}

	$scope.getAll = function() {
		product.getAllProducts()
		.then(function(res) {
			//success
			$scope.products = product.productList;
		}, function() {
			//failed
		});
	}

	$store.bind($scope, 'cart', []);
	//$store.set('cart', []);

	$scope.invoice = {
		cart: $scope.cart
	};
	
	$scope.addToCart = function(item) {
		//check if there is already an item in the cart
		if($scope.cart.length > 0) {

			var gevonden = false;

			angular.forEach($scope.cart, function(cart, key) {
				//check if item is already in the cart, if yes icrement quantity
				if(item.id == cart.id) {
					cart.hoeveelheid++;
					gevonden = true;
				}

			});

			if(!gevonden) {
				item.hoeveelheid = 1;
				$scope.cart.push(item);
			}

		} else {
			item.hoeveelheid = 1;
			$scope.cart.push(item);

		}
		
		item.stock -= 1;

		$store.set('cart', $scope.cart);

	};

	$scope.clear = function() {

		angular.forEach($scope.cart[0], function(item, key) {
			$scope.cart.splice(key, 1);
		});

	};

	$scope.removeItem = function(index) {
		$scope.invoice.items.splice(index, 1);
	};

	$scope.total = function() {

		var total = 0;

		angular.forEach($scope.invoice.cart, function(item) {
				total += item.price * item.hoeveelheid;
		});

		return total;
	};

	$scope.init();

}]);

app.controller('CheckoutController', ['$scope', '$store', function($scope, $store) {

	$scope.cart = $store.get('cart');

	$scope.total = function() {

		var total = 0;

		angular.forEach($scope.cart, function(item) {
				total += item.price * item.hoeveelheid;
		});

		return total;
	};

}]);