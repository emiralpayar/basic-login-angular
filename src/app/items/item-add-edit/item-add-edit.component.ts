import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, AbstractControl, FormBuilder, FormGroup, FormControl , Validator , FormsModule} from '@angular/forms';
import { Observable, Subject , Subscription, BehaviorSubject } from 'rxjs';
import { CheckRequiredField } from '../../_shared/helpers/form.helper';

import { ItemsService } from '../_services/items.service';
import { ItemModel } from '../_models/item.model';

@Component({
  selector: 'app-item-add-edit',
  templateUrl: './item-add-edit.component.html',
  styleUrls: ['./item-add-edit.component.css']
})
export class ItemAddEditComponent implements OnInit {

  @Input() item: ItemModel;
  @Output() formSubmitEvent = new EventEmitter<string>();

  itemForm: FormGroup;
  isProcessing: boolean = false;

  checkField  = CheckRequiredField;

  constructor(
    private itemsService: ItemsService,
    private formBuilder: FormBuilder // Assuming FormBuilder is used for simplicity
  ) { }

  ngOnInit() {
    this.initForm();
  }

  onSubmit($event) {
    this.isProcessing = true;

    if (this.itemForm.valid) {
      if (!this.item) {
        this.doAddItem();
      } else {
        this.doUpdateItem();
      }
    }
  }

  getButtonText(): string {
    return this.item ? 'Update' : 'Add';
  }

  private doAddItem() {
    this.itemsService.add(this.itemForm.value).subscribe(
      (result) => {
        this.itemForm.reset();
        this.formSubmitEvent.next('add');
        this.isProcessing  = false;
      }
    );
  }

  private doUpdateItem() {
    this.itemsService.update(this.itemForm.value.id , this.itemForm.value).subscribe(
      (result) => {
        if (result) {
          this.formSubmitEvent.next('update');
          this.reset();
        }
        this.isProcessing  = false;
      }
    );
  }

  private reset() {
    this.item = null;
    this.itemForm.reset();
    this.initForm();
  }

  private initForm() {
    this.itemForm = this.formBuilder.group({
      title: [this.item?.title || '', Validators.required],
      description: [this.item?.description || ''],
      id: [this.item?.id || null],
      birthDate: [this.item?.birthDate || ''],
      time: [this.item?.time || ''],
      occupation: [this.item?.occupation || ''],
      maritalStatus: [this.item?.maritalStatus || '']
    });
  }
}
