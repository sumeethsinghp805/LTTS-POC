import { SettingsService } from "../services/settings.service";

declare var $ : any;

export class CommonSettings {
    constructor(private settings?: any) {
        var defaultSettings = appConstant.settings;
        if(settings) {
            this.settings = $.extend(defaultSettings, this.settings)
        } else {
            this.settings = defaultSettings;
        }
        SettingsService.setSettings(this.settings)
    }
}