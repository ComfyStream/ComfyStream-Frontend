import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Evento } from "src/app/models/evento";
import { Usuario } from "src/app/models/usuario";
import { AsistenciaService } from "src/app/services/asistencia.service";
import { EventoService } from "src/app/services/evento.service";
import { UsuarioService } from "src/app/services/usuario.service";
import { IPayPalConfig, ICreateOrderRequest } from "ngx-paypal";
import Swal from 'sweetalert2';
import { SuscripcionService } from '../../services/suscripcion.service';

@Component({
  selector: 'app-asistir',
  templateUrl: './asistir.component.html',
  styleUrls: ['./asistir.component.css']
})
export class AsistirComponent implements OnInit {
  public payPalConfig ? : IPayPalConfig;
  public evento: Evento;
  public eventoId: string;
  public usuario: Usuario;
  public bonoAplicado:Boolean = false
  public usuarioLogado:Usuario;
  public bonosRestantes:string;
  public suscrito:Boolean;

  constructor(private router:Router,
    private asistenciaService: AsistenciaService,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private eventoService: EventoService,
    private suscripcionService:SuscripcionService) { }

  async ngOnInit() {
    this.activatedRoute.params.subscribe( (params) => {
      this.eventoId = params['id']; 
    });
    this.initConfig();
    this.evento = await this.eventoService.getEventoPorID(this.eventoId);
    this.evento.descripcion = this.evento.descripcion.replace(/(?:\r\n|\r|\n)/g, '\n');
    this.usuario = await this.usuarioService.getUsuarioPorId(this.evento.profesional);
    this.usuarioLogado = await this.usuarioService.getUsuario()

    this.bonosRestantes = this.usuarioLogado.bonos > 1 ? `${this.usuarioLogado.bonos} bonos restantes` : "1 bono restante";
    this.suscrito = await this.suscripcionService.estaSuscrito(this.usuario._id);
    
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
                value: this.evento.precio.toString(),
                breakdown: {
                    item_total: {
                        currency_code: 'EUR',
                        value: this.evento.precio.toString()
                    }
                }
            },
            items: [{
                name: this.usuario.nombre + " - " + this.usuario._id + " - " + this.usuario.cuentaBancariaIBAN,
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                    currency_code: 'EUR',
                    value: this.evento.precio.toString()
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
        this.comprar(urlPago);
        
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
// this.comprar();
    // paypal.Buttons({
    //   createOrder: (data, actions)=>{
    //     return actions.order.create({
    //       purchase_units:[
    //         {
    //           amount :{
    //               value         : this.evento.precio,
    //               currency: 'EUR'
    //           }
    //         }
    //       ]
    //     })
    //   },
    //   onApprove: async (data, actions)=>{
    //    // const order = await actions.order.capture;
    //     console.log(data);
    //     this.comprar();
    //   },
    //   onError: err =>{
    //     console.log(err);
    //   }
    //   }).render(this.paypalElement.nativeElement);


    comprar(pago:string){
      if(!localStorage.getItem("token")){
        this.router.navigateByUrl("/login")
      }else{    

      const data = {
        eventoId: this.evento._id,
        pagoPaypalUrl: pago,
        bonoAplicado:this.bonoAplicado
      }
      this.asistenciaService.crearAsistencia(data);

      this.router.navigateByUrl("/mis-asistencias")

    }}

    aplicarBono(){
      Swal.showLoading()
      setTimeout(() => {
        Swal.close()
        this.evento.precio-=5;
        this.bonoAplicado = true;
      }, 500);
    }

    asistir(){
      const data = {
        eventoId: this.evento._id,
        idProfesional:this.evento.profesional
      }
      Swal.showLoading()
      this.asistenciaService.crearAsistencia(data);
      this.router.navigateByUrl("/mis-asistencias")
    }
}


