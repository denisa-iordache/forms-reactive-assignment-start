import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  statuses = ['Stable', 'Critical', 'Finished'];
  signupForm: FormGroup;
  // forbiddenProjName = 'Test'

  ngOnInit(){
    this.signupForm = new FormGroup({
      // 'name': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
      'name': new FormControl(null, Validators.required, this.forbiddenNames),
      'mail': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl('Stable')
    });
  }

  onSubmit() {
    console.log(this.signupForm.value)
    this.signupForm.reset();
  }

  // forbiddenNames(control: FormControl): {[s: string]: boolean} {
  //   if(this.forbiddenProjNames.indexOf(control.value) !== -1){
  //     return {nameIsForbidden: true};
  //   }
  //   return null;
  // }

  forbiddenNames(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject)=>{
      setTimeout(()=>{
        if(control.value === 'Test'){
          resolve({'nameIsForbidden':true})
        }else{
          resolve(null);
        }
      }, 1500)
    })
    return promise;
  }
}
