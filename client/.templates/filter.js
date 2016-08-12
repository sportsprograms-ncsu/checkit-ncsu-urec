(function(){
	'use strict';

	angular
		.module('<%= moduleNameProperties.moduleName %>')
		.filter('<%= filterName %>', <%= filterName %>);

	<%= filterName %>.$inject = [];

	/**
	 * @ngdoc function
	 * @name <%= filterName %>
	 * @description
	 * #
	 */
	function <%= filterName %>() {
		return function(){

		}

	}
})();
