const dbConfig = require('./dbConfig');
const pool = require('./dbConfig');
const util = require('util');

var counter = 0;

// Promisified functions for async/await support
const promisePool = pool.promise();

exports.executeQuery = async (query, supportKey) => {
    try {
        console.log(query);
        const [results, fields] = await promisePool.query(query);
        return results;
    } catch (error) {
        console.log("Exception  In : " + query + " Error : ", error);
        throw error;
    }
};

exports.executeQueryData = async (query, data, supportKey) => {
    try {
        console.log(query, data);
        const [results, fields] = await promisePool.query(query, data);
        return results;
    } catch (error) {
        console.log("Exception  In : " + query + " Error : ", error);
        throw error;
    }
};



// connection related services

exports.openConnection = async () => {
    const connection = await promisePool.getConnection();
    await connection.beginTransaction();
    return connection;
};

exports.rollbackConnection = async (connection) => {
    if (!connection) return;
    try {
        await connection.rollback();
    } finally {
        connection.release();
    }
};

exports.commitConnection = async (connection) => {
    if (!connection) return;
    try {
        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error; // Re-throw error after rolling back
    } finally {
        connection.release();
    }
};
