import { ApiError } from "./ApiError";

export class InvalidResponseError extends ApiError{
    public static id = "INVALID_RESPONSE";
    constructor(){
        super(InvalidResponseError.id,"The application has sent an invalid response");
    }
}
