import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

import { JobService } from '../../services/job.service';
import { Job } from '../../models/job';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  jobs: Job[] = [];
  modalRef: BsModalRef;
  showAlert: boolean = false;
  messageAlert: string = '';
  companyOptions = [];

  constructor(private _jobService: JobService,
    private modalService: BsModalService
    ) { }

  ngOnInit() {
    this._jobService.getJobs()
      .subscribe(
      jobs => {
        let data = jobs['data'];
        this.jobs = data;
      },
      err => console.log(err)
    );
  }

  createJobModal(template: TemplateRef<any>) 
  {
    this._jobService.initializeFormGroup();    
    const config: ModalOptions = { class: 'modal-lg' };
    this.modalRef = this.modalService.show(template, config);
  }

  editJobModal(template: TemplateRef<any>, job) {
    this._jobService.populateForm(job);
    const config: ModalOptions = { class: 'modal-lg' };
    this.modalRef = this.modalService.show(template, job);
  }

  compareSelectValues(t1, t2): boolean {
		return t1 && t2 ? t1.id == t2 : t1 === t2;
  }
  
  onSubmit() {
    if (this._jobService.jobForm.valid) {
      if (!this._jobService.jobForm.get('id').value)
        this._jobService.createJob(this._jobService.jobForm.value).subscribe(
          job=> {
            let data = job['data'];
            let message = job['message'];
            
            this.jobs.push(data);
            this.showAlert = true;
            this.messageAlert = message;
          },
          err => console.log(err)
          );
      else
      this._jobService.updateJob(this._jobService.jobForm.value).subscribe(
        job=>{
          let data = job['data'];
          let message = job['message'];
          
          this.jobs.forEach((t, i) => {
            if (t.id == data.id) { this.jobs[i] = data }
          });
          this.showAlert = true;
          this.messageAlert = message;
        },
        err=> console.log(err)
      );
    }
    this.modalRef.hide();
    this._jobService.jobForm.reset();
  }
}
