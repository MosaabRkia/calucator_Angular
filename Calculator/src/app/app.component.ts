import { Component, Input } from '@angular/core';
import { ResultService } from './result.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  resultData:any;
  calculatorSqaures = ["AC","/","*","C","9","8","7","+","6","5","4","-","3","2","1","^","0","00",'000',"="];


  constructor(private result:ResultService ) {
     
   }

  ngOnInit(): void {

      this.result.getResult().subscribe((data:any)=>{
        console.log(data)
        this.resultData = data;
      })


    
  }

  updateResult(data:any){
    this.result.updateResult(data);
  }

}
