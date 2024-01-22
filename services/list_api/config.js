exports.config = {
    mode: "production",
    production: {
        database_config: {
            user:'root',
            database_type: "mysql",
            host: "localhost",
            port: "",
            database_name: "list_cbs_masters",
            ispass: true,
            password: 'fco@kredpool'
        },
        api: {
            host: "http://10.128.117.5",
            port: "8888",
            logs: true,
            routes: [
                { name: 'jwtToken', url: '/CustomerInfo/api/auth/getJwt', operation: 'get' },
                { name: 'masters', url: '/MasterLOV/customer/getMasterLOV/', operation: 'get' },
                { name: 'getCustomer', url: '/CustomerInfo/customer/getCustomerInfo?', operation: 'get' },
                { name: 'onBoard', url: '/OnBoardCustomer/customer/onBoard', operation: 'post' }
            ]
        }
    },
    local: {
        database_config: {
            user:'root',
            database_type: "mysql",
            host: "localhost",
            port: "",
            database_name: "list_cbs_masters",
            ispass: true,
            password: 'No.5670@'
        },
        api: {
            host: "http://172.100.30.89",
            port: "8888",
            logs: true,
            routes: [
                { name: 'jwtToken', url: '/CustomerInfo/api/auth/getJwt', operation: 'get' },
                { name: 'masters', url: '/MasterLOV/customer/getMasterLOV/', operation: 'get' },
                { name: 'getCustomer', url: '/CustomerInfo/customer/getCustomerInfo?', operation: 'get' },
                { name: 'onBoard', url: '/OnBoardCustomer/customer/onBoard', operation: 'post' }
            ]
        }
    },
    testing_server: {
        database_config: {
            user:'root',
            database_type: "mysql",
            host: "localhost",
            port: "",
            database_name: "list_cbs_masters",
            ispass: true,
            password: 'Sangli123#'
        },
        api: {
            host: "http://172.100.30.89",
            port: "8888",
            logs: true,
            routes: [
                { name: 'jwtToken', url: '/CustomerInfo/api/auth/getJwt', operation: 'get' },
                { name: 'masters', url: '/MasterLOV/customer/getMasterLOV/', operation: 'get' },
                { name: 'getCustomer', url: '/CustomerInfo/customer/getCustomerInfo?', operation: 'get' },
                { name: 'onBoard', url: '/OnBoardCustomer/customer/onBoard', operation: 'post' }
            ]
        }
    }
}
