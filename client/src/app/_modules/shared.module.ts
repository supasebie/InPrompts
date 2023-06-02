import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';



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
    NgxGalleryModule
  ],
  exports: [
    NgbModule,
    NgbDropdownModule,
    ToastrModule,
    NgbNavModule,
    NgxGalleryModule
  ]
})
export class SharedModule { }
