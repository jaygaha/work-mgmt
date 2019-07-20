import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  companies: Company[] = [];
  modalRef: BsModalRef;
  showAlert: boolean = false;
  messageAlert: string = '';

  constructor(private _companyService: CompanyService,
    private modalService: BsModalService
    ) { }

  ngOnInit() {
    this._companyService.getCompanies()
      .subscribe(
      companies => {
        let data = companies['data']; 
        this.companies = data;
      },
      err => console.log(err)
    );
  }

  createCompanyModal(template: TemplateRef<any>) {
    this._companyService.initializeFormGroup();
    this.modalRef = this.modalService.show(template);
  }

  editCompanyModal(template: TemplateRef<any>, haken) {
    this._companyService.populateForm(haken);
    this.modalRef = this.modalService.show(template, haken);
  }

  onSubmit() {
    if (this._companyService.companyForm.valid) {
      if (!this._companyService.companyForm.get('id').value)
        this._companyService.createCompany(this._companyService.companyForm.value).subscribe(
          company=> {
            let data = company['data'];
            let message = company['message'];

            this.companies.push(data);
            this.showAlert = true;
            this.messageAlert = message;
          },
          err => console.log(err)
          );
      else
        this._companyService.updateCompany(this._companyService.companyForm.value).subscribe(
          company=>{
            let data = company['data'];
            let message = company['message'];
            
            this.companies.forEach((t, i) => {
              if (t.id == data.id) { this.companies[i] = data }
            });
            this.showAlert = true;
            this.messageAlert = message;
          },
          err=> console.log(err)
        );
      
      this.modalRef.hide();
      this._companyService.companyForm.reset();
    }
  }
}
