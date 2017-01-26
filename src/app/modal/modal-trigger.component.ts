import { Component, Input, OnInit } from '@angular/core';
import { JQueryService } from '../jquery.service';
@Component({
  selector: 'modal-trigger',
  templateUrl: './modal-trigger.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalTriggerComponent implements OnInit {
    @Input() type: string;    //button or link
    @Input() myModal: string;  //id of modal to trigger
    @Input() className: string; //class to use for element
    @Input() caption: string; //text of button or link
    constructor(private jqueryService: JQueryService) {
        this.type = "button";
        this.myModal = "something";
        this.className = "";
        this.caption = "a caption";
    } 
    ngOnInit() {
        this.myModal = "#" + this.myModal;
    }
    openModal(event) {
        if (event) event.preventDefault();
        if (this.jqueryService.JQueryOK) {
            if (this.jqueryService.JQuery(this.myModal).length)
                this.jqueryService.JQuery(this.myModal).modal('show');
            else
                console.log(this.myModal + '  element does not exist.')
        }
    }

}
