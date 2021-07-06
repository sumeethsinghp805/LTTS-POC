declare var _:any;

export class SettingsService {
  private static settings: any;
  private static userInfo;
  private static appConfig: any = {};

  private static appNavConfig: any = {};
  private static allRecords: any = {};

  private static appResults;

  private static smartBoxCertificate=[];

  private static employmentCertificate;

  static getEmploymentCertificate(): any {
    return this.employmentCertificate;
  }

  static setEmploymentCertificate(employmentCertificate: any) {
    this.employmentCertificate = employmentCertificate;
  }
  static getSettings(): any {
    return this.settings;
  }

  static setSettings(setting: any) {
    this.settings = setting;
  }

  static getAppConfig(): any {
    return this.appConfig;
  }

  static setAllRecordsCount(key,value){
    this.allRecords[key]=value;
  }

  static getAppResult(){
    return this.appResults;
  }

  static SetAppResult(result:any){
    this.appResults = result;
  }

  static setAppConfig(config:any){
      // setting app common config
      _.each(config.appCommon,(item:any)=>{
        this.appConfig[item.c_name] = item.c_json;
      });

      // routerOutletSetting
      this.appConfig.smartbox = {};
      _.each(config.smartbox,(item:any)=>{
          // if()
      });

  }

  static getNavAppConfig(): any {
    return this.appNavConfig;
  }

  static setNavAppConfig(list): any {
    this.appNavConfig = list;
  }

  static getUserInfo():any{
    return this.userInfo;
  }

  static setUserInfo(info:any ){
    this.userInfo = info;
  }


  static setSmartBoxCertificate(list){
    this.smartBoxCertificate = list;
  }

  static getSmartBoxCertificate(){
    return this.smartBoxCertificate;
  }

}
