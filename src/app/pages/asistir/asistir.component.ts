import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from 'src/app/models/evento';
import { Usuario } from 'src/app/models/usuario';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { EventoService } from 'src/app/services/evento.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from 'src/environments/environment';




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

  constructor(private router:Router,
    private asistenciaService: AsistenciaService,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private eventoService: EventoService) { }

  async ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      this.eventoId = params['id']; 
    });
    this.initConfig();
    this.evento = await this.eventoService.getEventoPorID(this.eventoId);
    this.usuario = await this.usuarioService.getUsuarioPorId(this.evento.profesional);
    const precio = this.evento.precio.toString()


    
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
        layout: 'vertical'
    },
    onApprove: (data, actions) => {
        //console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
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
    onError: err => {
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
      pagoPaypalUrl: pago
    }
    this.asistenciaService.crearAsistencia(data);

    this.router.navigateByUrl("/mis-asistencias")

  }}



  }


