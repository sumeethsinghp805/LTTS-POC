import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SettingsService } from "@app/shared/services/settings.service";
import { Utils } from '@app/shared/common/utlis';

declare var _: any;

@Component({
  selector: 'sb-standard-template',
  templateUrl: './app-info-template.component.html',
  styleUrls: ['./app-info-template.component.css'],
  inputs: ['datasource', 'sbConfig']

})
export class AppInfoTemplateComponent implements OnInit {

  public datasource: any;
  public sbConfig: any;
  public dropDown1Val: string;
  public dropDown2Val: string;
  public checkBoxSelectedtems: any[] = [];
  @Output()
  onDropDownChange: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onLinkClick: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onButtonClick: EventEmitter<any> = new EventEmitter<any>();

  constructor(private sanitizer: DomSanitizer) { }

  private onSelectDropDown2(val) {
    this.dropDown2Val = val;
    this.onDropDownChange.emit({ "dropDown1Val": this.dropDown1Val, "dropDown2Val": this.dropDown2Val });
  }

  private onSelectDropDown1(val) {
    this.dropDown1Val = val;
    this.onDropDownChange.emit({ dropDown1Val: this.dropDown1Val, dropDown2Val: this.dropDown2Val });
  }

  private onAction(action, comp) {
    if (comp === 'button') {
      if (action.type = 'redirect') {
        window.open(action.url, "_blank");
        return;
      }
      this.onButtonClick.emit({ checkboxItems: this.checkBoxSelectedtems });
    } else if (comp === 'link') {
      this.onLinkClick.emit({ chart: true });
    }
  }

  updateComponent(data) {
    this.dropDown1Val = data.dropdown1DefaultValue || '';
    this.dropDown2Val = data.dropdown2DefaultValue || '';
    let env = Utils.getEnv().toUpperCase();
    this.datasource.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.datasource.videoUrl);
  }

  getSanitizedResourceUrl(content) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(content);
  }

  onSmartboxLinkClicks(event, value, label, contentSrc) {
    this.onLinkClick.emit({ label: label, value: value, contentSrc: contentSrc });
    event.stopPropagation();
  }

  onSelectCheckboxListOptions(event, item) {
    let listObj = { id: item.value, label: item.label };
    if (event.target.checked) {
      this.checkBoxSelectedtems.push(listObj)
    } else {
      let index = this.checkBoxSelectedtems.indexOf(_.find(this.checkBoxSelectedtems, listObj))
      if (index > -1) {
        this.checkBoxSelectedtems.splice(index, 1);
      }
    }
  }

  onSendEmail(email, subject, body) {
    let userDetails = SettingsService.getUserInfo();
    let emailBody = encodeURIComponent(body);
    let link;
    if (userDetails.gSuiteUser === 'gsuite') {
      link = "https://mail.google.com/mail/?view=cm&fs=1&su=" + subject + "&body=" + emailBody;
      window.open(link, '_blank');
    } else {
      link = "mailto:" + (email || '') + "?subject=" + subject + "&body=" + emailBody;
      window.location.href = link;
    }
  }

  ngOnInit() {
    this.updateComponent(this.datasource);

    //for COE smartbox
    if (this.datasource.list && this.datasource.list.length === 1) {
      //by default checkbox will be selected if only one item in the list
      this.checkBoxSelectedtems.push({ id: this.datasource.list[0].value })
    }
  }

}
