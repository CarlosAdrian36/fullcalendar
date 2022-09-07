import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormRecord, Validators } from '@angular/forms';
import {  CalendarContent, CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { EventApi, DateSelectArg, EventClickArg, CalendarApi } from '@fullcalendar/core/';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  
  @ViewChild('calendar') calendarv! : FullCalendarComponent

  miFormulario: FormGroup = this.fb.group({
    
    titulo: ['',[Validators.required,Validators.minLength(3)]],
    inicio: ['',[Validators.required]],
    fin: [''],
    color: [''],
    Eventos : this.fb.array([

      
    ],Validators.required)
  });
  nuevoTitulo: FormControl = this.fb.control('',Validators.required)
  nuevoInicio: FormControl = this.fb.control('')

  get EventosArr(){
    return this.miFormulario.get('Eventos') as FormArray
  }

  constructor(private fb: FormBuilder){}

 

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
    let calendarApi = this.calendarv.getApi();

    calendarApi.addEvent({
      // title: this.miFormulario.controls?.['titulo'].value,
      title: this.nuevoTitulo.value,
      // start : this.miFormulario.controls?.['inicio'].value,
      start : this.nuevoInicio.value,
      end : this.miFormulario.controls?.['fin'].value,
      allDay: false,
      color: this.miFormulario.controls?.['color'].value,
    })
    
  // this.miFormulario.reset();
  }



  agregarListaEventos(){
  
    if(this.nuevoTitulo.invalid){return;}
    this.EventosArr.push( new FormControl( this.nuevoTitulo.value ) );
    this.EventosArr.push(new FormControl(this.nuevoInicio.value))
    this.nuevoTitulo.reset();
    this.nuevoInicio.reset();
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
}


