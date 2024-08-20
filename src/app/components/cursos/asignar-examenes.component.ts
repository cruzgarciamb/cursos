import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Curso } from 'src/app/models/curso';
import { Examen } from 'src/app/models/examen';
import { CursoService } from 'src/app/services/curso.service';
import { ExamenService } from 'src/app/services/examen.service';
import { map, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-asignar-examenes',
  templateUrl: './asignar-examenes.component.html',
  styleUrls: ['./asignar-examenes.component.css']
})
export class AsignarExamenesComponent implements OnInit {

  curso: Curso;
  autocompleteControl = new FormControl();
  examenesFiltrados: Examen[] = [];

  constructor(private route: ActivatedRoute,
    private cursoSevice: CursoService,
    private examenService: ExamenService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      this.cursoSevice.ver(id).subscribe(c => this.curso = c);
    });
    // this.autocompleteControl.valueChanges.pipe(
    //   map(valor => typeof valor === 'string' ? valor : valor.nombre),
    //   flatMap(valor => valor ? this.examenService.filtrarPorNombre(valor) : [])
    // ).subscribe(examenes => this.examenesFiltrados = examenes);
    this.examenService.filtrarPorNombre('e').subscribe(examenes => this.examenesFiltrados = examenes);
  }


}
