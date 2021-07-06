import { utils } from "protractor";

export class Utils {
    static mergeValues(...args) {
        return args && args[0] ? args.join() : '';
    }

    static startsWith(str: String, starts: string): Boolean {
        if (starts === '') { return true; }
        if (str === null || starts === null) { return false; }
        str = String(str); starts = String(starts);
        return str.length >= starts.length && str.slice(0, starts.length) === starts;
    };

    static getEnv() {
        return (location.hostname.indexOf('localhost') > -1) ? 'local' : (((location.hostname.indexOf('www.mydomain.com') > -1) || (location.hostname.indexOf('www.mydomain.com') > -1)) ? 'dev' : ((location.hostname.indexOf('www.mydomain.com') > -1) || (location.hostname.indexOf('ip-10-58-46') > -1) ? 'uat' :'prod'))
    }

    static getCurrentDate() {
        var date = new Date();
        return (date.getMonth() +1) + "/" + date.getDate() + "/" + date.getFullYear();
    }

    static getCurrentDateWithTimeStamp() {
        return this.getCurrentDate() + "|" + new Date().getTime();
    }
}