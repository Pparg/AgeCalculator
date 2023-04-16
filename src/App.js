import React, { useEffect } from "react";
import { useState } from "react";
import './App.css'

function AgeCalc(bday) {
  let output = []
  let hoy = new Date();
  let cumple = new Date(`${bday[0]} ${bday[1]} ${bday[2]}`)//MM DD YYYY
  let diferencia = new Date(hoy - cumple);
  output.push(Math.abs(diferencia.getFullYear() - 1970))
  // calculando meses
  if(bday[0]>=hoy.getMonth()+1){
      output.push(bday[0] - (hoy.getMonth()+1))
  }else{
      output.push(12-((hoy.getMonth()+1)-bday[0]))
  }
  // calculando dias
  if(bday[1]>= hoy.getDate()){
      output.push(bday[1]- hoy.getDate())
  }else{
      output[1] -=1
      let variable = new Date(hoy.getFullYear(), hoy.getMonth()+1, 0)
      output.push(variable.getDate()-(hoy.getDate()-bday[1]))
  }
  return output
}

export function Main(){
  let [day, setDay] = useState(1)
  let [month, setMonth] = useState(1)
  let [year,setYear] = useState(2023)
  let [date, setDate]= useState("")
  let [valid, setValid] = useState(true)
  let [info, setInfo] = useState("")
  let handleSubmit =(e)=>{
      e.preventDefault()
      let birthday = new Date(`${month} ${day}, ${year}`)
      let search = birthday.getDate()
      if(search==="Nan"){
          // Invalid input on field
          setDate("")
          setValid(false)
      }else if(search !== parseInt(day)){
          // Invalid day
          setDate("Date not valid")
          setValid(false)
      }else{
          // Valid case
          setDate([month, day,year])
          setValid(true)
      }
  }
  useEffect(()=>{
    if(date!=="" && date[1]!=="Nan"){
      let timer = setTimeout(() => {
        let out = AgeCalc(date);
        setInfo(out) 
      }, 1000);
      return ()=>clearTimeout(timer);
    }
  },[date])
  return(
  <div id="container">
    <form id="dateForm" onSubmit={handleSubmit}>
          <div className="divform">
            <p>Day</p>
            <input min="1" max="31" required className={valid? "input_field": "invalid_input"} id="day" type="number" placeholder="DD" onChange={(e)=> setDay(e.target.value)}></input>
          </div>
          <div className="divform">
            <p>Month</p>
            <input min="1" max="12" required className={valid? "input_field": "invalid_input"} id="month" type="number" placeholder="MM" onChange={(e)=> setMonth(e.target.value)}></input>
          </div>
          <div className="divform">
            <p>Year</p>
            <input min="1900" max="2023" required className={valid? "input_field": "invalid_input"} id="year" type="number" placeholder="YYYY" onChange={(e)=> setYear(e.target.value)}></input>
          </div>
          <div className="error">
            <h3>{valid?"":"Must be a valid date" }</h3>
          </div>
          <div className="last_div">
            <div className="ligne"></div>
            <button id="submit"><i className="fa-solid fa-light fa-arrow-down fa-2xl"></i></button>
          </div>     
    </form>
    <div className="text_container">
      <div className="element">
        {info && valid? <h1 className="title">{info[0]}</h1>: 
        <div className="text_ligne_container">
          <div className="text_ligne"></div>
          <div className="text_ligne"></div>
        </div>}
        <h1>years</h1>
      </div>
      <div className="element">
        {info && valid? <h1 className="title">{info[1]}</h1>: 
        <div className="text_ligne_container">
          <div className="text_ligne"></div>
          <div className="text_ligne"></div>
        </div>}
        <h1>months</h1>
      </div>
      <div className="element">
        {info && valid? <h1 className="title">{info[2]}</h1>: 
        <div className="text_ligne_container">
          <div className="text_ligne"></div>
          <div className="text_ligne"></div>
        </div>}
        <h1>days</h1>
      </div>
      
    </div>
  </div>
  )
}