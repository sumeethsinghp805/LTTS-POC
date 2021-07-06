import { Utils } from "@app/shared/common/utlis";
import { SmartBoxContentsParams, smartBoxParams } from "@app/shared/models/app-url-params.model";
import { SettingsService } from "../settings.service";
import { appConstant } from "@app/shared/common/app-constant";

export class APPUrlProviderService {
    static urls: any;
    constructor() { }
    static getSmartBoxResult(AppText: string) {
        let url = this.urls.redisSmartBoxURL[this.getUrlEnv()];
        let model = new smartBoxParams();
        model.appString = this.getTransformedAppText(AppText);
        return url + model.getConstructedParams(model)
    }

    static getSmartBoxActionContents(sbName: string) {
        let env = this.getUrlEnv();
        let url = this.urls.smartbox[sbName][env];
        if(env != 'local') {
            url = url[Utils.getEnv()]; 
        }
        return url;
    }

    static getSmartBoxContents(AppText: string, src: string, sortby: string, sbName: string, source: string, nlpResult?: any, optionalData?: any) {
        let env = this.getUrlEnv();
        let url = null;
        let userInfo = SettingsService.getUserInfo();
        let model: any = {};
        if(source) {
            if (source === 'genericApp') {
                return this.urls.smartbox['genericApp'][env] + sbName;
            }
            return source;
        } else {
            url = this.urls.smartbox[sbName][env];
        }
        switch (sbName) {
            case 'dataScience':
                model = new SmartBoxContentsParams();
                model.str = this.getTransformedAppText(AppText);
                model.source = src;
                if (sortby) {
                    model.sortby = sortby;
                }
                url = url + model.getConstructedParams(this.getModelWithUserInfo(model));
                break;
                default: return url;
        }
        return url;
    }
    

    static getTransformedAppText(AppText) {
        let splitTextArr = AppText.split('"');
        if (splitTextArr.length > 1) {
            return splitTextArr[1].toLowerCase();
        }
        return AppText.toLowerCase();
    }

    private static getModelWithUserInfo(model) {
        let userInfo = SettingsService.getUserInfo();
        model.division = userInfo.userDiversion;
        model.supervisor = userInfo.supervisor;
        return model;
    }

   private static getUrlEnv(){
        return (location.hostname !=='localhost')?'env':'local';
    }
}