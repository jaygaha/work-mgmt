import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';

import { RecruitService } from '../../services/recruit.service';
import { WorklogService } from '../../services/worklog.service';
import { Worklog } from '../../models/worklog';

@Component({
  selector: 'app-worklog',
  templateUrl: './worklog.component.html',
  styleUrls: ['./worklog.component.css']
})
export class WorklogComponent implements OnInit {
  worklogs: Worklog[] = [];
  modalRef: BsModalRef;
  showAlert: boolean = false;
  messageAlert: string = '';
  recruitId;
  recruit;
  ismeridian: boolean = false; //timepiker show 24 hrs

  constructor(private _worklogService: WorklogService,
    private _recruitService: RecruitService,
    private modalService: BsModalService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => { 
      this.recruitId = params.get('recruit_id'); 
    });
    
    this.getInIt();
  }

  getInIt() {
    this._recruitService.getRelatedData(this.recruitId).subscribe(recruit=> this.recruit = recruit['data']);
    this._worklogService.getWorkLogs(this.recruitId)
      .subscribe(
      worklogs => {
        let data = worklogs['data'];
        this.worklogs = data;
      },
      err => console.log(err)
    );
  }

  createWorkLogModal(template: TemplateRef<any>) {
    this._worklogService.initializeFormGroup(this.recruitId);    
    this.modalRef = this.modalService.show(template);
  }

  editWorkLogModal(template: TemplateRef<any>, worklog) {
    this._worklogService.populateForm(worklog);
    this.modalRef = this.modalService.show(template, worklog);
  }

  onSubmit() {
    if (this._worklogService.worklogForm.valid) {
      if (!this._worklogService.worklogForm.get('id').value)
        this._worklogService.createWorklog(this._worklogService.worklogForm.value).subscribe(
          worklog=> {
            let data = worklog['data'];
            let message = worklog['message'];
            
            this.worklogs.unshift(data);
            this.showAlert = true;
            this.messageAlert = message;
          },
          err => console.log(err)
          );
      else
      this._worklogService.updateWorklog(this._worklogService.worklogForm.value).subscribe(
        worklog=>{
          let data = worklog['data'];
          let message = worklog['message'];
          
          this.worklogs.forEach((t, i) => {
            if (t.id == data.id) { this.worklogs[i] = data }
          });
          this.showAlert = true;
          this.messageAlert = message;
        },
        err=> console.log(err)
      );
    this.modalRef.hide();
    this._worklogService.worklogForm.reset();
    }
  }
}
