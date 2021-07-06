import { SettingsService } from "../services/settings.service";

export class SuccessModel {
    private message;
    constructor(private data:any, code?: string) {
        var commonSettings = SettingsService.getSettings();
        this.message = data && data.code ? commonSettings.successMessage[commonSettings.successCodes[data.code]] : '';
        this.data = data;
    }
}