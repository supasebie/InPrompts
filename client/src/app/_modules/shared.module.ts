import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule, NgbDropdownModule, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FileUploadModule } from 'ng2-file-upload';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbModule,
    NgbDropdownModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    NgbNavModule,
    NgxGalleryModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    FileUploadModule,
    NgbDatepickerModule,
  ],
  exports: [
    NgbModule,
    NgbDropdownModule,
    ToastrModule,
    NgbNavModule,
    NgxGalleryModule,
    NgxSpinnerModule,
    FileUploadModule,
    NgbDatepickerModule
  ]
})
export class SharedModule { }
