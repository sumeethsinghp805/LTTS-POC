export class AppConfigModel{
    facetConfig: FacetModel
    appIconConfig
    smartbox

    constructor(){}

    deserialize(input:any){
        this.facetConfig=input.facetConfig;
        this.appIconConfig=input.appIconConfig;
        this.smartbox=input.smartbox;
        return this;
    }
}
export class FacetModel{

    route:string ;
    icon:string;
    id:string;
    value:string;
    class: string;

    isDropDown:boolean;

    constructor() {}
}

export class FacetDropDownModel{

    id:string;
    route:string;
    visibilityFor: string;
    icon:string;
    value:string;
    class: string;

    constructor() {}
}