import { Directive, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { MatPaginator, PageEvent } from '@angular/material';
import { Generic } from '../models/generic';
import { CommonService } from '../services/common.service';

@Directive()
export abstract class CommonListarComponent<E extends Generic, S extends CommonService<E>> implements OnInit {

  titulo: string
  lista : E[]
  protected nombreModel: string

  totalRegistros = 0;
  paginaActual = 0;
  totalPorPagina = 4;
  pageSizeOptions: number[] = [3, 5, 10, 25, 100];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(protected service: S) { }

  ngOnInit(): void {
    this.calcularRangos();
  }

  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.calcularRangos();
  }

  private calcularRangos() {
    this.service.listarPaginas(this.paginaActual.toString(), this.totalPorPagina.toString())
      .subscribe(p => {
        this.paginator._intl.itemsPerPageLabel = 'Registros por página:'
        this.lista = p.content as E[];
        this.totalRegistros = p.totalElements as number;
      });
  }

  public eliminar(e: E): void {
    Swal.fire({
      title: "Cuidado",
      text: `¿Seguro que desea eliminar a ${e.nombre}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminar(e.id).subscribe(() => {
          //this.alumnos = this.alumnos.filter(a => a.id !== alumno.id);
          this.calcularRangos();
          Swal.fire('Eliminado', `${this.nombreModel} ${e.nombre} eliminado con éxito`, 'success')
        });
      }
    });
  }

}
