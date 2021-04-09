import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from 'src/app/models/evento';
import { Usuario } from 'src/app/models/usuario';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { EventoService } from 'src/app/services/evento.service';
import { UsuarioService } from 'src/app/services/usuario.service';
declare var paypal;

@Component({
  selector: 'app-asistir',
  templateUrl: './asistir.component.html',
  styleUrls: ['./asistir.component.css']
})
export class AsistirComponent implements OnInit {
  @ViewChild('paypal',{ static:true}) paypalElement:ElementRef;
  public evento: Evento;
  public eventoId: string;
  public usuario: Usuario;

  constructor(private router:Router,
    private asistenciaService: AsistenciaService,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private eventoService: EventoService) { }

  async ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      this.eventoId = params['id']; 
    });
    this.evento = await this.eventoService.getEventoPorID(this.eventoId);
    this.usuario = await this.usuarioService.getUsuarioPorId(this.evento.profesional);
    paypal.Buttons({
      createOrder: (data, actions)=>{
        return actions.order.create({
          purchase_units:[
            {
              amount :{
                  value         : this.evento.precio,
                  currency: 'EUR'
              }
            }
          ]
        })
      },
      onApprove: async (data, actions)=>{
       // const order = await actions.order.capture;
        console.log(data);
        this.comprar();
      },
      onError: err =>{
        console.log(err);
      }
      }).render(this.paypalElement.nativeElement);
  }

  comprar(){
    if(!localStorage.getItem("token")){
      this.router.navigateByUrl("/login")
    }else{    
    const data = {
      eventoId: this.evento._id
    }
    this.asistenciaService.crearAsistencia(data);
        console.log("asistido");
    this.router.navigateByUrl("/mis-asistencias")

  }}

  }


