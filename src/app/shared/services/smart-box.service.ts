import { Injectable } from '@angular/core';
import { SmartBoxContentsParams, smartBoxParams } from '../models/app-url-params.model';
import { SmartBoxContentsModel, smartBoxRowMapper, SmartBoxStandardTemplate } from '@app/shared/models/smart-box.model';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class SmartBoxService {

  constructor() { }

  getSmartBoxTemplateModel(sbName, results, config, componentData, activeRoutePage, sbResults?: any, smartBoxstr?: string) {
    let model = {};
    // let userDetails = SettingsService
    switch (sbName) {
      case 'dataScience':
        let dataScienceModel = new SmartBoxStandardTemplate();
        model = dataScienceModel.deserialize(results, config, activeRoutePage);
        break;
        let defaultModel;
        if(config.sbType === 'standard') {
          defaultModel = new SmartBoxStandardTemplate();

          model = defaultModel.deserialize(results, config, activeRoutePage);
          break;
        }
        return model;
    }
  }

  getSmartBoxActionContentModel(sbName,results,config){
    let model = new SmartBoxContentsModel();
    switch(sbName){
      case 'employee_certificate':
        model = model.deserialize(results,config);
        model.notification.alertType = (results['status'] === 'Success') ? 'success' : 'danger';
        break;
    default:
      break;    
    }
    return model;
  }

}
