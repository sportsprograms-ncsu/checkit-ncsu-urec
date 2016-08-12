
    .state('<%= stateName %>', {
        parent: 'root',
        url: '<%= uri %>',
        views: {
            'content@app': {
                templateUrl: 'app/<%= moduleNameProperties.moduleDirectoryName %>/<%= viewFileName %>',
                controller: '<%= controllerName %>',
                controllerAs: 'vm'
            }
        }
    })
