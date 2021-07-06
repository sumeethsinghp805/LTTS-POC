import { concatMap } from "rxjs/operators";
import { Utils } from "../common/utlis";

declare var _:any;
declare var moment:any;

export class ListOption {
    label: string;
    value: string;
    constructor(label, value) {
        this.label = label;
        this.value= value;
    }

}

export class CatalogOption {
    label: string;
    class: string;
    icon: string;
    url:string;

    constructor() {}
}

export class SmartBoxStandardTemplate {
    header: string;
    SubHeader: string;
    para: string;
    list: ListOption[];
    viewAllOption: any = {};
    viewAllLinkTxt: string;
    catalog: string;
    mediaType: string;
    mediaUrl: string;
    dropdown1: any;
    dropdown2: any;
    catalogOptions: CatalogOption[];
    footer: any;
    headerContent: any = {};
    action: any;
    sbName: string;

    constructor(){ }

    deserialize(input, config, activeRoutePage) {
        let sbRowMapper = new smartBoxRowMapper();
        return sbRowMapper.extractData(input, config, activeRoutePage)
    }
}

export class smartBoxRowMapper {
    header: string;
    headerClass: string;
    subHeader: string;
    subHeader1: string;
    subHeader2: string;
    subHeader3: string;
    para: string;
    para2: string;
    para3: string;
    list: ListOption[];
    list2: ListOption[];
    list3: ListOption[];
    viewAllOption: any = {};
    viewAllOptionHeader: any = {};
    viewAllLinkTxt: string;
    catalog: string;
    mediaType: any;
    mediaUrl: string;
    dropdown1: any;
    dropdown2: any;
    catalogOptions: CatalogOption[]
    footer: any;
    footerClass: string;
    headerContent: any = {};
    gridHeaders: any;
    gridConfig: any;
    progressBarConfig: any;
    counters: any;
    gridModel: any;
    title: string;
    subTitle: string;
    class: string;
    showMedia: any;
    links: any;
    source: string;
    action: any;
    actionClass: string;
    cntrClass: string;
    sbName: string;

    constructor() { }
    
    extractData(input, config, activeRoutedpage) {
        if (!config) {return{};}

        /***********************************Standard Template**********************************/

        if(config['sbName']) {
            this.sbName = config['sbName'];
        }

        if(config['cntrClass']) {
            this.cntrClass = config['cntrClass'];
        }

        if(config['header']) {
            this.header = config['header'].param ? input[config['header'].param] : config['header'].value;
            this.headerClass = config['header'] ? config['header'].class || "" : "";
        }

        if(config['headerContent']) {
            let contentType = config['headerContent'];
            this.headerContent.listClass = contentType['list'] ? contentType['list'].class : "";
            this.headerContent.paraClass = contentType['para'] ? contentType['para'].class : "";
            this.headerContent.paraClass = contentType['para1'] ? contentType['para1'].class : "";
            this.headerContent.paraClass = contentType['para2'] ? contentType['para2'].class : "";
            this.headerContent.listClass = contentType['list'] ? this.getConstructedList(input, contentType['list']) : "";
            this.headerContent.listClass = contentType['list'] ? (contentType['para'].param ? input[contentType['para'].param] : contentType['para'].value) : "";
            this.headerContent.listClass = contentType['list'] ? (contentType['para1'].param ? input[contentType['para1'].param] : contentType['para1'].value) : "";
            this.headerContent.listClass = contentType['list'] ? (contentType['para2'].param ? input[contentType['para2'].param] : contentType['para2'].value) : "";
            this.headerContent.listType = contentType['list'] ? contentType['list'].paramType || "" : "";
        }

        if(config['subHeader']) {
            this.subHeader = config['subHeader'].param ? input[config['subHeader'].param] : config['subHeader'].value;
        }

        if(config['subHeader2']) {
            this.subHeader2 = config['subHeader2'].param ? input[config['subHeader2'].param] : config['subHeader2'].value;
        }

        if(config['subHeader3']) {
            this.subHeader3 = config['subHeader3'].param ? input[config['subHeader3'].param] : config['subHeader3'].value;
        }

        if(config['viewAllOption']) {
            this.viewAllOption.label = config['viewAllOption'].paramLabel ? input[config['viewAllOption'].paramLabel] : config['viewAllOption'].label;
            this.viewAllOption.value = config['viewAllOption'].paramValue ? input[config['viewAllOption'].paramValue] : config['viewAllOption'].value;
            this.viewAllOption.type = config['viewAllOption'].paramType ? input[config['viewAllOption'].paramType] : config['viewAllOption'].type;
        }

        if(config['viewAllOptionHeader']) {
            this.viewAllOptionHeader.label = config['viewAllOptionHeader'].paramLabel ? input[config['viewAllOptionHeader'].paramLabel] : config['viewAllOptionHeader'].label;
            this.viewAllOptionHeader.value = config['viewAllOptionHeader'].paramValue ? input[config['viewAllOptionHeader'].paramValue] : config['viewAllOptionHeader'].value;
            this.viewAllOptionHeader.type = config['viewAllOptionHeader'].paramType ? input[config['viewAllOptionHeader'].paramType] : config['viewAllOptionHeader'].type;
        }

        if(config['viewAllLinkTxt']) {
            this.viewAllLinkTxt = config['viewAllLinkTxt'].param ? input[config['viewAllLinkTxt'].param] : config['viewAllLinkTxt'].value;
        }

        if(config['mediaType']) {
            if(config['mediaType']['img']) {
                this['imgUrl'] = config['mediaType']['img'].param ? input[config['mediaType']['img'].param] || config['mediaType']['img'].value : config['mediaType']['img'].value;
            }

            if(config['mediaType']['video']) {
                this['videoUrl'] = config['mediaType']['video'].param ? input[config['mediaType']['video'].param] || config['mediaType']['video'].value : config['mediaType']['video'].value;
            }

            this.mediaType = this['videoUrl'] ? 'video' : 'img';
        }
        
        if(config['showMedia']) {
            this.showMedia = config['showMedia'][activeRoutedpage];
        }

        if(config['para']) {
            this.para = config['para'].param ? input[config['para'].param] : config['para'].value;
        }

        if(config['para2']) {
            this.para2 = config['para2'].param ? input[config['para2'].param] : config['para2'].value;
        }

        if(config['para3']) {
            this.para3 = config['para3'].param ? input[config['para3'].param] : config['para3'].value;
        }

        if(config['list']) {
            this.list = this.getConstructedList(input, config['list']);
            this['listType'] = config['list'].paramType || "";
        }

        if(config['list2']) {
            this.list2 = this.getConstructedList(input, config['list2']);
            this['listType'] = config['list2'].paramType || "";
        }

        if(config['list3']) {
            this.list3 = this.getConstructedList(input, config['list3']);
            this['listType'] = config['list3'].paramType || "";
        }

        if(config['dropdown1']) {
            if(config['dropdown1'].param) {
                this.dropdown1 = this.getConstructedList(input, config['dropdown1']);
                this['dropdown1DefaultValue'] = input[config['dropdown1'].defaultValue];
            } else {
                this.dropdown1 = config['dropdown1'].values;
                this['dropdown1DefaultValue'] = config['dropdown1'].defaultValue;
            }
        }

        if(config['dropdown2']) {
            if(config['dropdown2'].param) {
                this.dropdown2 = this.getConstructedList(input, config['dropdown2']);
                this['dropdown2DefaultValue'] = input[config['dropdown2'].defaultValue];
            } else {
                this.dropdown2 = config['dropdown2'].values;
                this['dropdown2DefaultValue'] = config['dropdown2'].defaultValue;
            }
        }

        if(config['catalogOptions']) {
            this.catalogOptions = config['catalogOptions'];
        }

        if(config['footer']) {
            this.footer = config['footer'].param ? input[config['footer'].param] : config['footer'].value;
            this.footerClass = config['footer'].class;
        }

        if(config['action']) {
            this.action = config['action'];
            if(config['action'].url) {
                let urlVal = config['action'].url;
                let env = Utils.getEnv();
                this.action.url = urlVal && (typeof urlVal=== "object") ? urlVal[env] : urlVal;
            }
            this.actionClass = config['action'] ? config['action'].class  || "" : "";
        }
        
        if(config['source']) {
            this.source = config['source'];
        }

        return this;
    }
    
    getConstructedList(input, listConfig) {
    let list = [];
    let inputList = listConfig.param ? input[listConfig.param] : input;
    let rangeArr;
    if(!inputList) { return []; }
    if (listConfig.range && listConfig.range !== 'default') {
        rangeArr = listConfig.range.split(':');
        inputList = inputList.slice(Number(rangeArr[0]), Number(rangeArr[1]) != -1 ? Number(rangeArr[1]) : inputList.lengthg);
    }
    _.each(inputList, function(item) {
        let value = listConfig.paramValue ? item[listConfig.paramValue] : item;
        let label = listConfig.paramLabel ? item[listConfig.paramLabel] : item;
        let image = listConfig.image && listConfig.image.param ? item[listConfig.image.param] : '';
        let obj = new ListOption(label, value);
        if(image) {
            obj['imageUrl'] = image;
        }
        if(obj.label) {
            list.push(obj)
        }
    })
    return list
    }



}
export class SmartBoxContentsModel{
    notification: any = {};

    constructor() {}

    deserialize(input, config) {
        let self = this;
        let data = config.notification.param ? input[config.notification.params] : input;
        if(config.notification) {
            this.notification.msg = data[config.notification.paramValue];
            setTimeout(function () {
                self.notification.msg = '';
            }, config.notification.timeout);
        }
        return this;
    }
}