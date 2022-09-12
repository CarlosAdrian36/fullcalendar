import { isIdentifier } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, FormRecord, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import {  CalendarContent, CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { EventApi, DateSelectArg, EventClickArg, CalendarApi, removeElement, isDateSelectionValid, getUniqueDomId, Calendar } from '@fullcalendar/core/';
import { identity } from 'rxjs';
import { createEventId } from './event-utils';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  
  @ViewChild('calendar') calendar! : FullCalendarComponent
  
  miFormulario: FormGroup = this.fb.group({
    
    titulo: ['',[Validators.required,Validators.minLength(3)]],
    inicio: ['',[Validators.required]],
    fin: [''],
    color: [''],
    Eventos : this.fb.array([],Validators.required)
  });
  nuevoId : FormControl = this.fb.control(createEventId(),Validators.required)
  nuevoTitulo: FormControl = this.fb.control('',Validators.required)
  nuevoInicio: FormControl = this.fb.control('',Validators.required)
  nuevoColor : FormControl = this.fb.control('',Validators.required)
  

  get EventosArr(){
    return this.miFormulario.get('Eventos') as FormArray
  }

  constructor(private fb: FormBuilder){}

  currentEvents: any[] = [];

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
    };
    
  

  agregarEvento(){
    let calendarApi = this.calendar.getApi();

    calendarApi.addEvent({
      id: this.nuevoId.value,
      // title: this.miFormulario.controls?.['titulo'].value,
      title: this.nuevoTitulo.value,
      // start : this.miFormulario.controls?.['inicio'].value,
      start : this.nuevoInicio.value,
      end : this.miFormulario.controls?.['fin'].value,
      allDay: false,
      // color: this.miFormulario.controls?.['color'].value,
      color: this.nuevoColor.value
    })
    // var events = calendarApi.getEvents()
    // console.log(events)
  
  }

  
  agregarListaEventos(){
  
    if(this.nuevoTitulo.invalid){return;}
    this.EventosArr.push( new FormControl( this.nuevoId.value ) );
    this.EventosArr.push( new FormControl( this.nuevoTitulo.value ) );
    this.EventosArr.push( new FormControl( this.nuevoInicio.value ));
    this.EventosArr.push( new FormControl( this.nuevoColor.value ));
    // this.currentEvents.push( new FormControl( this.nuevoTitulo.value));
    // this.currentEvents.push( new FormControl( this.nuevoInicio.value));
    this.currentEvents.push( this.nuevoTitulo.value);
    
    this.currentEvents.push( this.nuevoInicio.value);


    
    this.nuevoTitulo.reset();
    this.nuevoInicio.reset();
    this.nuevoColor.reset();
    console.log(this.EventosArr)
    console.log(this.EventosArr.value);
    console.log(this.currentEvents);

    

    // console.log(this.currentEvents);
  }
  calendarApi(calendarApi: any) {
    throw new Error('Method not implemented.');
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

  
  
  
}


