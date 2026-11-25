 exports.config = {
    mode: process.env.ENVIROMENT,
    production: {
        database_config: {
            user: 'root',
            database_type: "mysql",
            host: "localhost",
            port: "",
            database_name: "list_cbs_masters",
            ispass: true,
            password: 'fco@kredpool'
        },
        api: {
            host: "http://10.128.117.5",
            port: "9999",
            logs: true,
            routes: [
                { name: 'jwtToken', url: '/CustomerInfo/api/auth/getJwt', operation: 'get' },
                { name: 'masters', url: '/MasterLOV/customer/getMasterLOV/', operation: 'get' },
                { name: 'getCustomer', url: '/CustomerInfo/customer/getCustomerInfo?', operation: 'get' },
                { name: 'onBoard', url: '/OnBoardCustomer/customer/onBoard', operation: 'post' },
                { name: 'getInterestRateForAllAcc', url: '/OnBoardCustomer/customer/getInterestRateForAllAcc', operation: 'get' }
            ],
            isproxy: false
        }
    },
    // local: {
    //     database_config: {
    //         user: 'root',
    //         database_type: "mysql",
    //         host: "localhost",
    //         port: "",
    //         database_name: "list_cbs_masters",
    //         ispass: true,
    //         password: 'No.5670@'
    //     },
    //     api: {
    //         host: "http://172.100.30.89",
    //         port: "8888",
    //         logs: true,
    //         routes: [
    //             { name: 'jwtToken', url: '/CustomerInfo/api/auth/getJwt', operation: 'get' },
    //             { name: 'masters', url: '/MasterLOV/customer/getMasterLOV/', operation: 'get' },
    //             { name: 'getCustomer', url: '/CustomerInfo/customer/getCustomerInfo?', operation: 'get' },
    //             { name: 'onBoard', url: '/OnBoardCustomer/customer/onBoard', operation: 'post' }
    //         ],
    //         isproxy: true
    //     }
    // },

    local: {
        database_config: {
            user: 'root',
            database_type: "mysql",
            host: "172.100.30.89",
            port: "3306",
            database_name: "list_cbs_masters",
            ispass: true,
            password: 'Fco@Testing2026'
        },
        api: {
            host: "http://172.100.30.89",
            port: "8888",
            logs: true,
            routes: [
                { name: 'jwtToken', url: '/CustomerInfo/api/auth/getJwt', operation: 'get' },
                { name: 'masters', url: '/MasterLOV/customer/getMasterLOV/', operation: 'get' },
                { name: 'getCustomer', url: '/CustomerInfo/customer/getCustomerInfo?', operation: 'get' },
                { name: 'onBoard', url: '/OnBoardCustomer/customer/onBoard', operation: 'post' },
                { name: 'getInterestRateForAllAcc', url: '/OnBoardCustomer/customer/getInterestRateForAllAcc', operation: 'get' }
            ],
            isproxy: false
        }
    },
    testing_server: {
        database_config: {
           user: 'root',
            database_type: "mysql",
            host: "172.100.30.89",
            port: "3306",
            database_name: "list_cbs_masters",
            ispass: true,
            password: 'Fco@Testing2026'
        },
        api: {
            host: "http://172.100.30.89",
            port: "8888",
            logs: true,
            routes: [
                { name: 'jwtToken', url: '/CustomerInfo/api/auth/getJwt', operation: 'get' },
                { name: 'masters', url: '/MasterLOV/customer/getMasterLOV/', operation: 'get' },
                { name: 'getCustomer', url: '/CustomerInfo/customer/getCustomerInfo?', operation: 'get' },
                { name: 'onBoard', url: '/OnBoardCustomer/customer/onBoard', operation: 'post' },
                { name: 'getInterestRateForAllAcc', url: '/OnBoardCustomer/customer/getInterestRateForAllAcc', operation: 'get' }
            ],
            isproxy: false
        }
    }
}