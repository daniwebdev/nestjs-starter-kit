import { HttpException, HttpStatus } from "@nestjs/common";

export class Response {

    static success(params: ResponseParams = {
        message: "Login Successful",
        data: null,
        results: null
    }) {

        if(params.data == null) {
            params.data = {}
        }

        if(params?.results != null) {
            params.data.results = params.results;
        }

        return {
            status: "success",
            message: params.message,
            data: params.data,
        }
    }

    static error(params: ResponseParams=undefined, httpStatus: HttpStatus = HttpStatus.BAD_GATEWAY) {

        throw new HttpException(params.message, httpStatus )
    }

    static callback(params: ResponseCallback = {
        success: null,
        message: null
    }) {
        if(params?.message == null){
            return {
                success: params.success
            }
        } else {
            return {
                success: params.success,
                message: params.message
            }        
        }

    }

}

class ResponseParams {
    public message: string;

    public data?: any;
    
    public results?: Array<any> = [];
}

class ResponseCallback {
    public success: boolean;

    public message: string;
}