import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HakenService } from '../../services/haken.service';
import { Haken } from '../../models/haken';

@Component({
  selector: 'app-haken',
  templateUrl: './haken.component.html',
  styleUrls: ['./haken.component.css']
})
export class HakenComponent implements OnInit {
  hakens:Haken[] = [];
  modalRef: BsModalRef;
  showAlert: boolean = false;
  messageAlert: string = '';

  constructor(private _hakenService: HakenService,
    private modalService: BsModalService
    ) { }

  ngOnInit() {
    this._hakenService.getHakens()
      .subscribe(
      hakens => { 
        hakens['data'].map(item => item.$key = '1');
        //let array = hakens.pipe(map{item=>item.$key = item.id};);
        let data = hakens['data']; 
        this.hakens = data;
      },
      err => console.log(err)
    );
  }

  createHakenModal(template: TemplateRef<any>) {
    this._hakenService.initializeFormGroup();
    
    this.modalRef = this.modalService.show(template);
  }

  editHakenModal(template: TemplateRef<any>, haken) {
    this._hakenService.populateForm(haken);
    this.modalRef = this.modalService.show(template, haken);
  }

  onSubmit() {
    if (this._hakenService.hakenForm.valid) {
      if (!this._hakenService.hakenForm.get('id').value)      
        this._hakenService.createHaken(this._hakenService.hakenForm.value).subscribe(
          haken=> {
            let data = haken['data'];
            let message = haken['message'];

            this.hakens.push(data);
            this.showAlert = true;
            this.messageAlert = message;
          },
          err => console.log(err)
          );
      else
      this._hakenService.updateHaken(this._hakenService.hakenForm.value).subscribe(
        haken=>{
          let data = haken['data'];
          let message = haken['message'];
          
          this.hakens.forEach((t, i) => {
            if (t.id == data.id) { this.hakens[i] = data }
          });
          this.showAlert = true;
          this.messageAlert = message;
        },
        err=> console.log(err)
      );
      
      this.modalRef.hide();
      this._hakenService.hakenForm.reset();
    }
  }

}