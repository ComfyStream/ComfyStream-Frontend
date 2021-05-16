import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "../../services/usuario.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Usuario } from "src/app/models/usuario";
import { Evento } from "src/app/models/evento";
import { EventoService } from "../../services/evento.service";
import { AsistenciaService } from "../../services/asistencia.service";
import { Valoracion } from "src/app/models/valoracion";
import { ValoracionService } from "src/app/services/valoracion.service";
import { SuscripcionService } from '../../services/suscripcion.service';
import { IPayPalConfig, ICreateOrderRequest } from "ngx-paypal";
import { Suscripcion } from '../../models/suscripcion';
import Swal from "sweetalert2";

@Component({
  selector: 'app-detalles-profesional',
  templateUrl: './detalles-profesional.component.html',
  styleUrls: ['./detalles-profesional.component.css']
})
export class DetallesProfesionalComponent implements OnInit {

  public usuarioId: string;
  public profesional: Usuario;
  public eventosDisponibles: Evento[] = [];
  public eventosDelProfesional: Evento[] = [];
  public misEventos: Evento[] = [];
  public misAsistencias: Evento[] = [];
  public mediaEstrellas :number = 3.5
  public valoraciones:Valoracion[] = [];
  public numeroValoraciones:number;
  public puedoValorar = false;
  public suscrito:Boolean;
  public suscripcionActiva:Suscripcion
  public payPalConfig ? : IPayPalConfig;

  constructor(private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private eventoService : EventoService,
    private asistenciaService:AsistenciaService,
    private valoracionService:ValoracionService,
    private router: Router,
    private suscripcionService:SuscripcionService) { }

  async ngOnInit() {
    this.activatedRoute.params.subscribe( (params) => {
      this.usuarioId = params['id']; 
    });
    
    if(localStorage.getItem("profesional") == "true"){
      this.misEventos = await (this.eventoService.getMisEventos());
    }
    if(localStorage.getItem("token")){
      this.misAsistencias = await (this.asistenciaService.getMisAsistencias());
    }
    this.profesional = await this.usuarioService.getUsuarioPorId(this.usuarioId);
    this.profesional.descripcion = this.profesional.descripcion.replace(/(?:\r\n|\r|\n)/g, '\n');
    this.puedoValorar = await this.valoracionService.puedoValorar(this.profesional._id);
    
    this.numeroValoraciones = this.profesional.numeroValoraciones;
    this.mediaEstrellas = this.profesional.valoracionMedia;
    if(typeof this.numeroValoraciones === 'undefined'){
      this.numeroValoraciones = 0;
    }else{
      this.numeroValoraciones = this.profesional.numeroValoraciones;
    }
    
    this.eventosDisponibles = await this.eventoService.getEventosDisponibles();
    this.valoraciones = await this.valoracionService.getValoracionesPorId(this.usuarioId);
    for(let evento of this.eventosDisponibles){
      if(evento.profesional === this.usuarioId){
        this.eventosDelProfesional.push(evento);
      }
    }
    
    this.suscrito = await this.suscripcionService.estaSuscrito(this.profesional._id);
    this.suscripcionActiva = await this.suscripcionService.suscripcionActiva(this.profesional._id);
    this.initConfig();

  }

  mostrarEvento(id: string){
    this.router.navigate(['/evento', id]);
  }
  valorar(){
    this.router.navigateByUrl("/valorar/"+this.profesional._id);
  }

  private initConfig(): void{
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'AYJQd_YaOe54PUIG6DxF_9nj3orm8NoLgdk8xUPbqAMubLtYb_-7Q0mtcWNzsIVHqeVtI7N5-1sVD-tW',
      createOrderOnClient: (data) => < ICreateOrderRequest > {
          intent: 'CAPTURE',
          purchase_units: [{
              amount: {
                  currency_code: 'EUR',
                  value: this.profesional.precioSuscripcion.toString(),
                  breakdown: {
                      item_total: {
                          currency_code: 'EUR',
                          value: this.profesional.precioSuscripcion.toString()
                      }
                  }
              },
              items: [{
                  name: this.profesional.nombre + " - " + this.profesional._id + " - " + this.profesional.cuentaBancariaIBAN,
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                      currency_code: 'EUR',
                      value: this.profesional.precioSuscripcion.toString()
                  },
              }]
          }]
      },
      advanced: {
          commit: 'true'
      },
      style: {
          label: 'paypal',
          layout: 'horizontal'
      },
      onApprove: (data, actions) => {
          //console.log('onApprove - transaction was approved, but not authorized', data, actions);
          actions.order.get().then((details) => {
             // console.log('onApprove - you can get full order details inside onApprove: ', details);
              
              
          });
  
      },
      onClientAuthorization: (data) => {
  
          //console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
          const urlPago: string = data["links"][0]["href"];
          this.suscribirse(urlPago);
          
      },
      onCancel: (data, actions) => {
          //console.log('OnCancel', data, actions);
  
  
      },
      onError: (err) => {
         // console.log('OnError', err);
  
      },
      onClick: (data, actions) => {
          //console.log('onClick', data, actions);
  
      },
  };
  }

  async suscribirse(urlPago:string){
    let datos = {
      idProfesional:this.profesional._id,
      pagoPaypalUrl: urlPago,
    }
    Swal.showLoading()
    this.suscripcionActiva = await this.suscripcionService.suscribirse(datos);
    Swal.fire("Suscripción realiza", "", "success");
    this.suscrito = await this.suscripcionService.estaSuscrito(this.profesional._id);
  }

}
