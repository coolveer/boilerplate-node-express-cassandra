import { ESResponse } from "../../interfaces";
import { Response } from "express";

class ResponseHelper {
    public success(response:Response, responseData:ESResponse = {}) {
        return response
              .status(200)
              .send(responseData);
    }

    public error(response:Response, responseData:ESResponse={}) {
        return response
              .status(responseData.status ? responseData.status : 500)
              .send({message: responseData.message});
    }
}

export default new ResponseHelper();