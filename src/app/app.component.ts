import { Component } from '@angular/core';
import { ConnectableObservable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent 
{
  displayString = ""
  title = 'calculator-app';
  numbers = ['1', '2', '3', '4', '5', '6', '7','8','9','0']
  operatorIndex : any[] =[]
  splitNumbers: any[] = []
  splitOperators: any[] = []
  operators = ['+','-','x','÷',]

  updateDisplay(input: string)
  {
    this.displayString = this.displayString + input
  }

  clearString()
  {
    this.displayString = ""
  }

  backspaceString()
  {
    this.displayString = this.displayString.slice(0,this.displayString.length-1)
  }

  calculate()
  {
    this.splitNumbers = []
    this.splitOperators = []
    this.operatorIndex = []
    console.log(this.splitNumbers)
    console.log(this.splitOperators)
    console.log(this.displayString.length)
    var index = 0
    var prevStringElement
    //iterating through string getting the index of the operators
    for(let i=0; i<this.displayString.length; i++)
    { 
      if(this.operators.includes(this.displayString[i]))
      {
        this.operatorIndex.push(i)
        this.splitOperators.push(this.displayString[i])
        //if(prevStringElement == 'operator')
        //{
        //  return this.displayString = 'ERROR'
        //}
        //prevStringElement = 'operator'
      }
      else
      {
        prevStringElement = 'number'
      }
    }

    //splitting the string into numbers and operators
    for(let i=0; i<this.operatorIndex.length; i++)
    { 
      var split = this.displayString.slice(index, this.operatorIndex[i])
      //updating pointer
      index = this.operatorIndex[i] + 1 
      this.splitNumbers.push(split)
    }
    split = this.displayString.slice(index, this.displayString.length)
    this.splitNumbers.push(split)
    console.log(this.splitNumbers)
    console.log(this.splitOperators)
    //setting stored variable to first item of array
    var outputNumber = Number(this.splitNumbers[0]) 
    //setting pointer to point at second element in the array
    var splitNumberPointer = 1 
    for(let i=0; i<this.splitOperators.length; i++)
    {
      if(this.splitOperators[i] == '+')
      {
        //operations on the first index and the number pointer pointing
        outputNumber = outputNumber + Number(this.splitNumbers[splitNumberPointer])
        //updating pointer 
        splitNumberPointer = splitNumberPointer + 1 
      }
      console.log(this.splitNumbers[i-1])
      console.log(this.splitNumbers[i])
      if(this.splitOperators[i] == '-')
      {
        outputNumber = outputNumber - Number(this.splitNumbers[splitNumberPointer])
        splitNumberPointer = splitNumberPointer + 1
      }
      if(this.splitOperators[i] == 'x')
      {
        outputNumber = outputNumber * Number(this.splitNumbers[splitNumberPointer])
        splitNumberPointer = splitNumberPointer + 1
      }
      if(this.splitOperators[i] == '÷')
      {
        outputNumber = outputNumber / Number(this.splitNumbers[splitNumberPointer])
        if(this.splitNumbers[splitNumberPointer] == 0)
        {
          return this.displayString = 'ERROR'
        }
        else
        {
          splitNumberPointer = splitNumberPointer + 1
        }
      }
      //  if(this.splitOperators[i] == '--')
      //  {
      //    outputNumber = outputNumber + Number(this.splitNumbers[splitNumberPointer])
      //    splitNumberPointer = splitNumberPointer + 1
      //  }

    }
    console.log(outputNumber)
    return this.displayString = String(outputNumber)
  }

}
