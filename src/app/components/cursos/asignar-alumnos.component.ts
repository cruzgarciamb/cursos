import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { Curso } from 'src/app/models/curso';
import { AlumnoService } from 'src/app/services/alumno.service';
import { CursoService } from 'src/app/services/curso.service';
import { SelectionModel } from '@angular/cdk/collections';
import Swal from 'sweetalert2';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-asignar-alumnos',
  templateUrl: './asignar-alumnos.component.html',
  styleUrls: ['./asignar-alumnos.component.css']
})
export class AsignarAlumnosComponent implements OnInit {

  curso: Curso;
  alumnosAsignar: Alumno[] = []
  alumnos: Alumno[] = []
  // selectedIndex: number = 2;
  // mostrarColumnas: string[] = ['nombre', 'apellido']
  // mostrarColumnasAlumnos: string[] = ['nombre', 'apellido']
  seleccion: SelectionModel<Alumno> = new SelectionModel<Alumno>(true, [])

  // datasource: MatTableDataSource<Alumno>;
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private cursoService: CursoService,
    private alumnoService: AlumnoService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      this.cursoService.ver(id).subscribe(c => {
        this.curso = c;
        this.alumnos = this.curso.alumnos;
        // this.iniciarPaginador();
      });
    })
  }

  // iniciarPaginador(): void {
  //   this.datasource = new MatTableDataSource<Alumno>(this.alumnos);
  //   this.datasource.paginator = this.paginator;
  //   this.paginator._intl.itemsPerPageLabel = 'Registros por página';
  // }

  filtrar(nombre: string): void {
    nombre = nombre !== undefined ? nombre.trim() : '';
    if(nombre !== '') {
      this.alumnoService.filtrarPorNombre(nombre)
      .subscribe(alumnos => {
        this.alumnosAsignar = alumnos.filter(a => {
          let filtrar = true

          this.alumnos.forEach(ca => {
            if(ca.id === a.id) filtrar = false
          });
          return filtrar;
        })
      });
    }
  }

  seleccionarDesSeleccionarTodos(): void {
    this.estanTodosSeleccionados() ?
    this.seleccion.clear() :
    this.alumnosAsignar.forEach(a => this.seleccion.select(a));
  }

  estanTodosSeleccionados(): boolean {
    const seleccionados = this.seleccion.selected.length;
    const numAlumnos = this.alumnosAsignar.length;
    return (seleccionados === numAlumnos) 
  }

  asignar(): void {
    this.cursoService.asignarAlumnos(this.curso, this.seleccion.selected)
    .subscribe(c => {
      Swal.fire('Asignados:', `Alumnos Asignados con éxito al curso ${this.curso.nombre}`, 'success');
      this.alumnos = this.alumnos.concat(this.seleccion.selected);
      // this.iniciarPaginador();
      this.alumnosAsignar = [];
      this.seleccion.clear();
    }, e => {
      if(e.status === 500) {
        const message = e.error.message as string;
        if (message.indexOf('ConstraintViolationException') > -1) {
          Swal.fire('Cuidado:', 'No se puede asignar el alumno ya está asociado a otro curso', 'error');
        }
      }
    })
  }

  eliminarAlumno(alumno: Alumno) {
    Swal.fire({
      title: "Cuidado",
      text: `¿Seguro que desea eliminar a ${alumno.nombre}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar"
    }).then((result) => {
      if (result.value) {
        this.cursoService.eliminarAlumno(this.curso, alumno).subscribe(c => {
          this.alumnos = this.alumnos.filter(a => a.id !== alumno.id);
          // this.iniciarPaginador();
          Swal.fire('Eliminado:', `Alumno ${alumno.nombre} eliminado con éxito del curso ${c.nombre}`, 'success')
        });
      }
    });
  }

}
