class QueryConstructor {
    constructor(){
    }

    getConstructedParams(params){
        if(!params){
            return '';
        }
            let ret=[];
            for(let d in params){
                if(typeof params[d] !=="function"){
                    ret.push(encodeURIComponent(d)+'='+encodeURIComponent(params[d]));
                }
            }
        return ret.join('&');
    }
}

export class smartBoxParams extends QueryConstructor{
    appString:string;
    constructor(){
        super()
    }
}
export class SmartBoxContentsParams extends QueryConstructor {

    count:number = 1;
    division:string;
    position:string = "Top";
    source: string;


    constructor(){
        super()
    }
}