import { ApiError } from "./ApiError";
import { InvalidResponseError } from "./Invalid-response-error";

export class ApiResponse{
    data: any| Array<any>;
    errors: Array<ApiError>;
    included: any | Array<any>;
    meta:any;
    
    constructor(public nativeResponse:any){
        if(nativeResponse.status === 204)
        {
            this.data = undefined;
            this.errors = [];
            this.included = undefined;
            this.meta = undefined;

        }else{
            try{
                const body = nativeResponse.body;
                this.data =  (body.data || body.data === false)?body.data: body;
                this.included = body.included;
                this.errors = this.deserializeError(body.errors || body.error);
                this.meta = body.meta;     
            }catch(e){
                   this.data = undefined;
                   this.errors = [new InvalidResponseError()];
                   this.included = undefined;
                   this.meta = undefined; 
            } 
        }

    }

    hasError():boolean{
         return this.errors && this.errors.length > 0;   
    }

    getFirstError():ApiError{
        if(this.hasError())
           {return this.errors[0];}
        else
        return new ApiError("","");   
    }

    private deserializeError(errors:Array<any>): Array<ApiError>
    {
        if(errors ==null)
        {
            return [];
        }
        return errors.map((errorJson)=> new ApiError(errorJson.id,errorJson.message));
    }


}