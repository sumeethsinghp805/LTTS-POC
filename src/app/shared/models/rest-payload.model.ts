import { SettingsService } from "../services/settings.service";

export class RestPayload{

    payload: any;
    data:any;
    userDetails:any;
    constructor(data,userInfo){
        this.data = data;
        this.userDetails = userInfo;
    }

    getRestPayload(sbName){
        let restpayload;
        let self = this;
        switch(sbName){
            case "employee_certifcate":
                SettingsService.setSmartBoxCertificate(self.data.checkboxItems);
                restpayload = {
                    "country": self.userDetails.workCountry,
                    "letter": self.data.checkboxItems.map(item=>{ return {id:item.id}})
                }
                break;
            default:
                break;    
        }

        return restpayload;
    }
}