import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Worklog } from '../models/worklog';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
}
@Injectable({
  providedIn: 'root'
})
export class WorklogService {
  private _url = "http://127.0.0.1:8000/api/";
  private _indexUrl = this._url + "v1/work-logs";
  private _createUpdateUrl = this._url + "v1/work-logs";

  constructor(private http:HttpClient) { }

  worklogForm = new FormGroup({
    id: new FormControl(''),
    recruit_id: new FormControl(''),
    entry_datetime: new FormControl('', Validators.required),
    out_datetime: new FormControl('', Validators.required)
  });

  initializeFormGroup(recruidId) {    
    this.worklogForm.setValue({
      id:null,
      recruit_id:recruidId,
      entry_datetime:'',
      out_datetime: ''
    });
  }

  populateForm(worklog) {
    Object.keys(worklog).forEach(name => {
      if (this.worklogForm.controls[name]) {
        this.worklogForm.controls[name].patchValue(worklog[name]);
      }
    });
  }

  //GET Worklog
	getWorkLogs(recruitId): Observable<Worklog[]> {
		return this.http.get<Worklog[]>(this._indexUrl + '/' + recruitId, httpOptions);
  }

  //ADD Worklog
  createWorklog(worklog:Worklog) : Observable<Worklog> {
    return this.http.post<Worklog>(this._createUpdateUrl + '/' + worklog.recruit_id, worklog, httpOptions);
  }

  //UPDATE Worklog
  updateWorklog(worklog:Worklog) : Observable<Worklog> {
    return this.http.put<Worklog>(this._createUpdateUrl + '/' + worklog.id, worklog, httpOptions);
  }
}
