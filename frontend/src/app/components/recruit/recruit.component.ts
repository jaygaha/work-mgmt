import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

import { RecruitService } from '../../services/recruit.service';
import { Recruit } from '../../models/recruit';

@Component({
  selector: 'app-recruit',
  templateUrl: './recruit.component.html',
  styleUrls: ['./recruit.component.css']
})
export class RecruitComponent implements OnInit {
  recruits: Recruit[] = [];
  modalRef: BsModalRef;
  showAlert: boolean = false;
  messageAlert: string = '';

  constructor(private _recruitService: RecruitService,
    private modalService: BsModalService
    ) { }

  ngOnInit() {
    this._recruitService.getRecruits()
      .subscribe(
      recruit => {
        let data = recruit['data'];
        this.recruits = data;
      },
      err => console.log(err)
    );
  }

  createRecruitModal(template: TemplateRef<any>) {
    this._recruitService.initializeFormGroup();    
    this.modalRef = this.modalService.show(template);
  }

  editRecruitModal(template: TemplateRef<any>, recruit) {
    this._recruitService.populateForm(recruit);
    const config: ModalOptions = { class: 'modal-lg' };
    this.modalRef = this.modalService.show(template, recruit);
  }

  compareSelectValues(t1, t2): boolean {
		return t1 && t2 ? t1.id == t2 : t1 === t2;
  }

  onSubmit() {
    if (this._recruitService.recruitForm.valid) {
      if (!this._recruitService.recruitForm.get('id').value) 
        this._recruitService.createRecruit(this._recruitService.recruitForm.value).subscribe(
          recruit=> {
            let data = recruit['data'];
            let message = recruit['message'];
            
            this.recruits.push(data);
            this.showAlert = true;
            this.messageAlert = message;
          },
          err => console.log(err)
          );
      else
        this._recruitService.updateRecruit(this._recruitService.recruitForm.value).subscribe(
          recruit=>{
            let data = recruit['data'];
            let message = recruit['message'];
            
            this.recruits.forEach((t, i) => {
              if (t.id == data.id) { this.recruits[i] = data }
            });
            this.showAlert = true;
            this.messageAlert = message;
          },
          err=> console.log(err)
        );

      this.modalRef.hide();
      this._recruitService.recruitForm.reset();
    }
  }
}
