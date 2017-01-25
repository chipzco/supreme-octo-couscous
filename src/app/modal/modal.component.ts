import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
    @Input() infotext: string;
    @Output() eventClickedButton: EventEmitter<boolean> = new EventEmitter<boolean>(); 
    @Input() myModal: string;
    constructor() {
        this.infotext = "Are you sure about this?";
        this.myModal = "something";
    }

    ngOnInit() {


    }
    onClick(yesno: boolean): void {
        this.eventClickedButton.emit(yesno);
    }

}
