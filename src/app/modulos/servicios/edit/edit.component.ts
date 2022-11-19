import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioModel } from 'src/app/modelos/servicio.model'; 
import { ServicioService } from 'src/app/servicios/servicio.service'; 
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private servicioService: ServicioService,
    private router: Router,
    private route: ActivatedRoute) { }

    fgValidacion = this.fb.group({
      id: ['', [Validators.required]],
      origen: ['', [Validators.required]],
      destino: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      encomienda: ['', [Validators.required]],
      valor: ['', [Validators.required]],
    });

    getWithId(id: string){
      this.servicioService.getWithId(id).subscribe((data: ServicioModel) => {
        console.log(data)
        this.fgValidacion.controls["id"].setValue(id)
        this.fgValidacion.controls["origen"].setValue(data.origen as string)
        this.fgValidacion.controls["destino"].setValue(data.destino as string)
        this.fgValidacion.controls["fecha"].setValue(data.fecha as string)
        this.fgValidacion.controls["hora"].setValue(data.hora as string)
        this.fgValidacion.controls["encomienda"].setValue(data.encomienda as string)
        this.fgValidacion.controls["valor"].setValue(data.valor as number)
      })
    }


  ngOnInit(): void {
    let id = this.route.snapshot.params["id"]
    this.getWithId(id)
  }
  edit(){
    let servicio = new ServicioModel();
    servicio.id = this.fgValidacion.controls["id"].value as string;
    servicio.origen = this.fgValidacion.controls["origen"].value as string;
    servicio.destino = this.fgValidacion.controls["destino"].value as string;
    servicio.fecha = this.fgValidacion.controls["fecha"].value as string;
    servicio.hora = this.fgValidacion.controls["hora"].value as string;
    servicio.encomienda = this.fgValidacion.controls["encomienda"].value as string;
    servicio.valor = this.fgValidacion.controls["valor"].value as number;
 
    this.servicioService.update(servicio).subscribe((data: ServicioModel)=> {
      alert(servicio.hora );
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/servicios/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

}