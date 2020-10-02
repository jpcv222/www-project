const connection = require('../database/connection');

const generic_controller = {};

let resObj = {};

generic_controller.ExecuteQuery = async (query) => {
    try {
        connection.connect(async (err, client, done) => {
            try {
                if (err) {
                    SetResponse("error",err.message);
                } else {
                    await client.query(query, (err, result) => {
                        if (err) {
                            client.query("ROLLBACk");
                            SetResponse("error",err.message);
                        } else {
                            SetResponse("success",result.rows);
                            console.log(resObj)
                        }
                    });
                }
            } catch (error) {
                client.query("ROLLBACk");
                SetResponse("error",error.message);
                return resObj;
            } finally {
                done();
            }
        });
        console.log(resObj)
        return resObj;
    } catch (error) {
        SetResponse("error",error.message);
        return resObj;
    } finally {
        Finalize();
    }
}

function SetResponse(status, data) {
    resObj.data = data;
    resObj.status = status;
}

function Finalize(){
    resObj = {};
}


module.exports = generic_controller;