import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayString = ""
  title = 'calculator-app';
  numbers = ['1', '2', '3', '4', '5', '6', '7','8','9','0']
  operatorIndex : any[] =[]
  splitNumbers: any[] = []
  splitOperators: any[] = []
  operators = ['+','-','x','/']
  updateDisplay(input: string){
    this.displayString = this.displayString + input
  }

  clearString(){
    this.displayString = ""
  }
  backspaceString(){
      this.displayString = this.displayString.slice(0,this.displayString.length-1)
  }
  calculate(){
    this.splitNumbers = []
    this.splitOperators = []
    this.operatorIndex = []
    console.log(this.displayString.length)
    var index = 0
    var prevStringElement
    for(let i=0; i<this.displayString.length; i++){ //iterating through string getting the index of the operators
      if(this.operators.includes(this.displayString[i])){
        this.operatorIndex.push(i)
        this.splitOperators.push(this.displayString[i])
        if(prevStringElement == 'operator'){
          return this.displayString = 'ERROR'
        }
        prevStringElement = 'operator'
      }
      else{
        prevStringElement = 'number'
      }
    }
    for(let i=0; i<this.operatorIndex.length; i++){ //splitting the string into numbers and operators
      var split = this.displayString.slice(index, this.operatorIndex[i])
      index = this.operatorIndex[i] + 1 //updating pointer
      this.splitNumbers.push(split)
    }
    split = this.displayString.slice(index, this.displayString.length)
    this.splitNumbers.push(split)
    console.log(this.splitNumbers)
    console.log(this.splitOperators)
    var outputNumber = Number(this.splitNumbers[0]) //setting stored variable to first item of array
    var splitNumberPointer = 1 //setting pointer to look at second element in the array
    for(let i=0; i<this.splitOperators.length; i++){
      if(this.splitOperators[i] == '+'){
        outputNumber = outputNumber + Number(this.splitNumbers[splitNumberPointer]) //operations on the first index and the number pointer pointing
        splitNumberPointer = splitNumberPointer + 1 //updating pointer
      }
      if(this.splitOperators[i] == '-'){
        outputNumber = outputNumber - Number(this.splitNumbers[splitNumberPointer])
        splitNumberPointer = splitNumberPointer + 1
      }
      if(this.splitOperators[i] == 'x'){
        outputNumber = outputNumber * Number(this.splitNumbers[splitNumberPointer])
        splitNumberPointer = splitNumberPointer + 1
      }
      if(this.splitOperators[i] == '/'){
        outputNumber = outputNumber * 1/Number(this.splitNumbers[splitNumberPointer])
        splitNumberPointer = splitNumberPointer + 1
      }

    }
    console.log(outputNumber)
    return this.displayString = String(outputNumber)
  }

}
