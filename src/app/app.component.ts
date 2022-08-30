import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormRecord, Validators } from '@angular/forms';
import {  CalendarContent, CalendarOptions } from '@fullcalendar/angular';
import { EventApi, DateSelectArg, EventClickArg, CalendarApi } from '@fullcalendar/core/';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  
  

  miFormulario: FormGroup = this.fb.group({
    
    titulo: ['',[Validators.required,Validators.minLength(3)]],
    inicio: ['',[Validators.required]],
    fin: [''],
    color: [''],
    Eventos : this.fb.array([
      ['deadth Stranding'],
      ['ddeded']
    ])
  });
  nuevoEvento: FormControl = this.fb.control('')

  get EventosArr(){
    return this.miFormulario.get('Eventos') as FormArray
  }

  constructor(private fb: FormBuilder){}

  currentEvent: EventApi[] = [];

  calendarOptions : CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar :{
      start : 'prev,next',
      center: 'title',
      end   : 'today,dayGridMonth,timeGridWeek,timeGridDay',
    },
    defaultAllDay: false,
    allDayMaintainDuration:false,
    weekends: false,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select : this.handleDateSelect.bind(this),
    eventClick : this.handleeventClick.bind(this), 
    eventsSet: this.handleEvents.bind(this),
    // eventAdd : this.agregarEvento.bind(this)
    
    };

  handleDateSelect(selectInfo : DateSelectArg){
    const calendarApi = selectInfo.view.calendar;
    
    this.EventosArr.push( new FormControl( this.nuevoEvento.value ) );

  //  this.nuevoEvento.reset();
   

    calendarApi.unselect();
    
      calendarApi.addEvent({
        
        title: this.miFormulario.controls?.['titulo'].value,
        start : this.miFormulario.controls?.['inicio'].value,
        end : this.miFormulario.controls?.['fin'].value,
        allDay: false,
        color: this.miFormulario.controls?.['color'].value
      })
    console.log(EventApi)
    console.log(this.EventosArr)
    console.log(selectInfo)
    console.log(calendarApi )
    
  }
  // agregarEvento(event:DateSelectArg){
  //   const calendarApi = event.view.calendar
   
  //   calendarApi.unselect();
    
  //     calendarApi.addEvent({
       
  //       title: this.miFormulario.controls?.['titulo'].value,
  //       start : this.miFormulario.controls?.['inicio'].value,
  //       end : this.miFormulario.controls?.['fin'].value,
  //       allDay: false,
  //       color: this.miFormulario.controls?.['color'].value
  //     })
  // }
  agregarEvento(){

  }

 handleeventClick(clickInfo: EventClickArg){
  if(confirm(`Desea eliminar el evento '${clickInfo.event.title}'`)){
    clickInfo.event.remove();
  }
 }
  
  CampoEsValido(campo: string){
    return this.miFormulario.controls?.[campo]?.errors 
    && this.miFormulario.controls?.[campo]?.touched;
  }
  
  toggleWeekends (){
    this.calendarOptions.weekends = !this.calendarOptions.weekends
  };

  handleEvents(events: EventApi[]){
    this.currentEvent = events
  }
}


