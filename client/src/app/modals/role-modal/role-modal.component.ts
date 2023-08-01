import { Component, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.scss'],
})
export class RoleModalComponent {
  username: string = '';
  availableRoles: any[] = [];
  selectedRoles: any[] = [];


  constructor(public modal: NgbActiveModal, private adminService: AdminService) {}
  ngOnInit() {
  }

  updateChecked(checkedValue: string)
  {
    const index = this.selectedRoles.indexOf(checkedValue);
    index !== -1  ? this.selectedRoles.splice(index, 1) : this.selectedRoles.push(checkedValue)
  }

  saveRoles(){
    const updatedRoles = this.selectedRoles.join(',');
    this.adminService.updateRoles(this.username, updatedRoles).subscribe({next: (response) => {
      if(response)
      {
        this.modal.close(response);
      }
    }})
  }

  // private arrayCheck(arr1: [], arr2: [])
  // {
  //   let res = JSON.stringify(arr1.sort()) == JSON.stringify(arr2.sort())
  //   console.log(res)
  // }
}
