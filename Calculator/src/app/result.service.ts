import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private result = new BehaviorSubject<object>({
    resultString:"",
    total:0
  });
  methods = ['/','*','-','+','^'];
  private localData:any = this.result.value;


  constructor() { }

  resetData(){
    this.result.next({
      resultString:"",
      total:0
    })
  }

  getResult(){
    return this.result.asObservable();
  }

  updateResult(value:any){
    let data:any = this.result.value;

    console.log(data.resultString.slice(data.resultString, -1));
    
    if(this.methods.includes(value) && this.methods.includes(data.resultString[data.resultString.length-1])){
      return;
    }
      console.log("power");
      

    if(value === "AC")
     {
      this.resetData();
      return ;
    }

    if(value === "=")
    this.getTotalResult();
    else if(value === "C")
      this.removeLastUpdate();
    else
    this.result.next({...this.result.value,resultString: data.resultString + value})
  }

  removeLastUpdate(){
    let data:any = this.result.value;
    this.result.next({...this.result.value,resultString:data.resultString.slice(0, -1)})
  }

  getTotalResult(){
    let splitedString:any[] = [];
    let data:any = this.result.value;
    let resultString:any = data.resultString;
    let index = 0; 
       
      while (resultString.length > (index)) {
        let text = ""; 
        if(!isNaN(resultString[index]))
          while (index < resultString.length && !isNaN(resultString[index])){
            text += resultString[index] ;
            index++;
          }
        else{
          splitedString.push(resultString[index]) 
        }

        splitedString.push(parseFloat(text)) 

        if(resultString[index] !== undefined && isNaN(resultString[index])){
          splitedString.push(resultString[index]) 
        }

        index++;
       }

      let startNumber =  splitedString[0];

      let total = 0;
      if(splitedString.length > 1)
       for (let index = 1; index < splitedString.length - 1; index+=2) {

         switch (splitedString[index]) {
           case "+":
              console.log("plus");
              startNumber = total = (startNumber + splitedString[1+index])
             break;

           case "-":
            startNumber = total = startNumber - splitedString[1+index];
              console.log("minus");
             break;

           case "*":
            startNumber = total = startNumber * splitedString[1+index];
              console.log("double");
             break;

           case "/":
            startNumber = total = startNumber / splitedString[1+index];
              console.log("tksem");
             break;

           case "^":
            startNumber = total =  Math.pow(startNumber,splitedString[1+index]);
              console.log("tksem");
             break;

           default:
             break;
         }  
       }
        else if(splitedString.length === 1)
          total = splitedString[0]
  
       
  
    this.result.next({...this.result.value,total:total})
    
  
  }
}
