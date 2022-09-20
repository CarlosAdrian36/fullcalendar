import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, FormRecord, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import {  CalendarContent, CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { EventApi, EventClickArg,  Calendar, createElement } from '@fullcalendar/core/';
import { createEventId } from './event-utils';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  
  @ViewChild('calendar') calendar! : FullCalendarComponent
  
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
    eventClick : this.handleeventClick.bind(this), 
    eventsSet: this.handleEvents.bind(this)
  };



  miFormulario: FormGroup = this.fb.group({
    
    titulo: ['',[Validators.required,Validators.minLength(3)]],
    inicio: ['',[Validators.required]],
    fin: [''],
    color: [''],
    Eventos : this.fb.array([
      
    ],Validators.required),
    
  });
  
  nuevoId    : FormControl = this.fb.control(createEventId(),Validators.required)
  nuevoTitulo: FormControl = this.fb.control('',Validators.required)
  nuevoInicio: FormControl = this.fb.control('',Validators.required)
  nuevoFin   : FormControl = this.fb.control('',Validators.required) 
  nuevoColor : FormControl = this.fb.control('',Validators.required)
  
  get EventosArr(){
    return this.miFormulario.controls['Eventos'] as FormArray
  }
 
 

  constructor(private fb: FormBuilder){}
  
  currentEvents: EventApi[] = [];

    
 

  addEvent(){
    let  Evento = this.calendar.getApi();

    Evento.addEvent({
      // id: this.nuevoId.value,
      title: this.nuevoTitulo.value,
      // title: this.miFormulario.controls?.['titulo'].value,
      color: this.nuevoColor.value,
      start: this.nuevoInicio.value,
      end : this.nuevoFin.value,
      allDay: false,
      
    })


    console.log(Evento.getEvents().values)
    // if(this.nuevoTitulo.invalid){return;}
    this.EventosArr.push( new FormControl( [this.nuevoTitulo.value,this.nuevoInicio.value,this.nuevoFin.value,this.nuevoColor.value] ) );
    // this.EventosArr.push( new FormControl( this.nuevoTitulo.value  ) )
    // this.EventosArr.push( new FormControl( this.nuevoInicio.value ) )
    // this.EventosArr.push( new FormControl( this.nuevoFin.value ) )
    // this.EventosArr.push( new FormControl( this.nuevoColor.value ) )
    this.nuevoTitulo.reset();
    this.nuevoInicio.reset();
    this.nuevoFin.reset();
    this.nuevoColor.reset();

    
    console.log(this.EventosArr.value);


    // var a = Evento.getEvents();
    
    // var event = a.map(function(event){return event.title, event.start, event.backgroundColor})
   
    // console.log(a)

    
  }


  
  agregarListaEventos(){
    console.log(this.EventosArr.value)
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

  eliminar( i: number ){

    this.EventosArr.removeAt(i);
  }

  handleEvents(events: EventApi[]){
    this.currentEvents = events
  }

  
  
  
}


