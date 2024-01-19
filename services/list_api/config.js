exports.config = {
    mode: "local",
    production: {},
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
            host: "http://103.42.162.39",
            port: "8085",
            logs: true,
            routes: [
                { name: 'jwtToken', url: '/CustomerInfo/api/auth/getJwt', operation: 'get' },
                { name: 'masters', url: '/MasterLOV/customer/getMasterLOV/', operation: 'get' },
                { name: 'getCustomer', url: '/CustomerInfo/customer/getCustomerInfo?', operation: 'get' }
            ]
        }
    },
    testing_server: {}
}
