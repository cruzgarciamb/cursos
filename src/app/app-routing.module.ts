import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { ExamenesComponent } from './components/examenes/examenes.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { AlumnosFormComponent } from './components/alumnos/alumnos-form.component';
import { CursoFormComponent } from './components/cursos/curso-form.component';
import { ExamenFormComponent } from './components/examenes/examen-form.component';
import { AsignarAlumnosComponent } from './components/cursos/asignar-alumnos.component';
import { AsignarExamenesComponent } from './components/cursos/asignar-examenes.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'cursos'},
  {path: 'alumnos', component: AlumnosComponent},
  {path: 'alumnos/form', component: AlumnosFormComponent},
  {path: 'alumnos/form/:id', component: AlumnosFormComponent},
  {path: 'cursos', component: CursosComponent},
  {path: 'cursos/form', component: CursoFormComponent},
  {path: 'cursos/form/:id', component: CursoFormComponent},
  {path: 'examenes', component: ExamenesComponent},
  {path: 'examen/form', component: ExamenFormComponent},
  {path: 'examen/form/:id', component: ExamenFormComponent},
  {path: 'cursos/asignar-alumnos/:id', component: AsignarAlumnosComponent},
  {path: 'cursos/asignar-examenes/:id', component: AsignarExamenesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
