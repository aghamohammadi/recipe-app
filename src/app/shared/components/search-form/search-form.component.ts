import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SearchFormComponent {
  public searchForm!: FormGroup;
  @Output() onSearch = new EventEmitter<string>();

  ngOnInit() {
   
    this.initForm();
    this.setupSearch();
    
  }

  private initForm() {
      this.searchForm = new FormGroup({
        searchText: new FormControl(null, [Validators.required]),
    });
  }

  setupSearch(): void {
    this.searchForm.valueChanges.subscribe(val => {
      this.onSearch.emit(val.searchText);
    });
  }
}
