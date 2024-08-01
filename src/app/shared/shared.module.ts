import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './directives/highlight.directive';
import { NavComponent } from './components/nav/nav.component';
import { RouterModule } from '@angular/router';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagerComponent } from './components/pager/pager.component';



@NgModule({
  declarations: [
    HighlightDirective,
    NavComponent,
    SearchFormComponent,
    PagerComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    HighlightDirective,
    NavComponent,
    PagerComponent,
    SearchFormComponent
  ]
})
export class SharedModule { }
