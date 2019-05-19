import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';
import { throwError, of, empty, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TagInputComponent as SourceTagInput } from 'ngx-chips';
//import * as $ from 'jquery';
declare var jquery:any;
declare var $ :any;

//declare var $:any;
export interface AutoCompleteModel {
   value: any;
   display: string;
}

@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  model: any = {};
  error:any = {isError:false, errorMessage:''};
  errorCheck:any = {isErrorCheck:false, errorMessageCheck:''};
  isDisabled: boolean;
  public timeFlag: boolean = false;
  hourSelectedBeforeAlter: any;
  //time = {hour: 0, minute: 0, second: 0};

    constructor() {
    }

    ngOnInit() {
    }

  /**
   * Starts gmail chips code here
   */
    @ViewChild('tagInput')
    tagInput: SourceTagInput;

    public validators = [ this.must_be_email.bind(this) ];
    public errorMessages = {
        'must_be_email': 'Please be sure to use a valid email format'
    };
    public onAddedFunc = this.beforeAdd.bind(this);

    private addFirstAttemptFailed = false;

    private must_be_email(control: FormControl) {
      if (this.addFirstAttemptFailed && !this.validateEmail(control.value)) {
          return { "must_be_email": true };
      }
      return null;
    }
    
    private beforeAdd(tag: string) {
      if (!this.validateEmail(tag)) {
        if (!this.addFirstAttemptFailed) {
          this.addFirstAttemptFailed = true;
          this.tagInput.setInputValue(tag);
        }
        return throwError(this.errorMessages['must_be_email']);
        //return of('').pipe(tap(() => setTimeout(() => this.tagInput.setInputValue(tag))));
      }
      this.addFirstAttemptFailed = false;
      return of(tag);
    }

    private validateEmail(text: string) {
      var EMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/i;
      return (text && EMAIL_REGEXP.test(text));
    }
    /**
     * Ends gmail chips code here
     */

     /**
      * Notification times code start here
      */
    public items = //["00:00","00:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30","05:00","05:30","06:00","06:30","07:00","07:30","08:00","08:30","09:00"];
    [
      {display: '00:00', value: 1}, {display: '00:30', value: 2}, {display: '01:00', value: 3}, {display: '01:30', value: 4}, {display: '02:00', value: 5}, {display: '02:30', value: 6}, {display: '03:00', value: 7}, {display: '03:30', value: 8}, {display: '04:00', value: 9}, {display: '04:30', value: 10}, {display: '05:00', value: 11}, {display: '05:30', value: 12}, {display: '06:00', value: 13}, {display: '06:30', value: 14}, {display: '07:00', value: 15}, {display: '07:30', value: 16},{display: '08:00', value: 17}, {display: '08:30', value: 18}, {display: '09:00', value: 19}, {display: '09:30', value: 20}, {display: '10:00', value: 21}, {display: '10:30', value: 22}, {display: '11:00', value: 23}, {display: '11:30', value: 24}, {display: '12:00', value: 25}, {display: '12:30', value: 26}, {display: '13:00', value: 27}, {display: '13:30', value: 28}, {display: '14:00', value: 29}, {display: '14:30', value: 30}, {display: '15:00', value: 31}, {display: '15:30', value: 32}, {display: '16:00', value: 33}, {display: '16:30', value: 34}, {display: '17:00', value: 35}, {display: '17:30', value: 36}, {display: '18:00', value: 37}, {display: '18:30', value: 38}, {display: '19:00', value: 39}, {display: '19:30', value: 40}, {display: '20:00', value: 41}, {display: '20:30', value: 42}, {display: '21:00', value: 43}, {display: '21:30', value: 44}, {display: '22:00', value: 45}, {display: '22:30', value: 46}, {display: '23:00', value: 47}, {display: '23:30', value: 48}
    ];

    showTimePicker($event: any) {
      console.log($(this))
      console.log($("div.ng-star-inserted .tag__text[title]").text());
      $('div .ng-star-inserted,div.tag__text').timepicker({
        timeFormat: 'HH:mm',
        interval: 30,
        dynamic: false,
        dropdown: true
      });
      
      //alert($(this).find('div .ng-star-inserted,div.tag__text').next().text());
      //$('div.tag__text').text('12:30')

      // $('div .ng-star-inserted,.tag__text').autocomplete({
      //   source: ["00:00","00:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30","05:00","05:30","06:00","06:30","07:00","07:30","08:00","08:30","09:00"],
      //   minLength: 0,
      //   select: function( event, ui ) { console.log(ui.item.value) }
      // }).focus(function(){            
      //   $(this).autocomplete('search', '')
      // });

      //$( ".ng-star-inserted" ).on( "autocompleteselect", function( event, ui ) { console.log('correct çhaged') } );

    }
    

    // checkTimeValues(event: any) {
    //   if(this.model.item && this.model.item.length > 0) {
    //     for(let i = 0; i < this.model.item.length; i++) {
    //       console.log(this.model.item[i].display);
    //       if(this.model.item[i].display < this.model.runWindowStart) {
    //        this.error= { isError:false, errorMessage:"" };
    //        this.isDisabled = false;
    //      } else {
    //       this.error= { isError:true, errorMessage:"Notification time can't after the window start time" };
    //       this.isDisabled = true;
    //      }
    //    }
    //   }
    // }
    /**
     * Notification times code ends here
     */

   checkValue(event: any){
    console.log(event);
    if(!(this.model.allDays || this.model.sun || this.model.mon || this.model.tue || this.model.wed || this.model.thu || this.model.fri || this.model.sat)){
       this.errorCheck= { isErrorCheck:true,errorMessageCheck:"Please select atleast one day's" };
       this.isDisabled = true;
       //return false;
    } else {
      this.errorCheck= { isErrorCheck:false, errorMessageCheck:"" };
      this.isDisabled = false;
    }
  }

   compareTimes() {
    if(this.model.item && this.model.item.length > 0) {
      for(let i = 0; i < this.model.item.length; i++) {
        console.log(this.model.item[i].display);
        if(this.model.item[i].display > this.model.runWindowStart){
          this.error= { isError:true, errorMessage:"Notification time can't after the window start time" };
          this.isDisabled = true;
          //this.timeFlag = true;
          //return false;
       } else {
         this.error= { isError:false, errorMessage:"" };
         this.isDisabled = false;
         //this.timeFlag = false;
       }
     }
     //this.timeFlag = false;
    }
  }

  onSubmit() {
    if(!(this.model.allDays || this.model.sun || this.model.mon || this.model.tue || this.model.wed || this.model.thu || this.model.fri || this.model.sat)){
      this.errorCheck= { isErrorCheck:true,errorMessageCheck:"Please select atleast one day's" };
      this.isDisabled = true;
   } else {
     this.errorCheck = { isErrorCheck:false, errorMessageCheck:"" };
     this.isDisabled = false;
   }
   if(this.error.isError || this.errorCheck.isErrorCheck) {
    this.isDisabled = true;
   } else {
    this.isDisabled = false;
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model));
    // form success code here
   }
  }

  reset() {
    //Reseting form here
  }

}
