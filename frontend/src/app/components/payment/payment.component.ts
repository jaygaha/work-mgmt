import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RecruitService } from '../../services/recruit.service';
import { PaymentService } from '../../services/payment.service';
import { Payment } from '../../models/payment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  payments: Payment[] = [];
  showAlert: boolean = false;
  messageAlert: string = '';
  recruitId;
  recruit;

  constructor(private _paymentService: PaymentService,
    private _recruitService: RecruitService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => { 
      this.recruitId = params.get('recruit_id'); 
    });

    this.getInIt();
  }

  getInIt() {
    this._recruitService.getRelatedData(this.recruitId).subscribe(recruit=> this.recruit = recruit['data']);
    this._paymentService.getPayment(this.recruitId)
      .subscribe(
      payments => {
        let data = payments['data'];
        this.payments = data;
      },
      err => console.log(err)
    );
  }

  public toggleToPaid()
  {
    console.log('hi');
  }

  public onChange(value)
  {
    var date = new Date('1 ' + value);
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    this._paymentService.getSelectedPayment(this.recruitId, year, month)
      .subscribe(
      payments => {
        let data = payments['data'];
        this.payments = data;
      },
      err => console.log(err)
    );

  }
}
