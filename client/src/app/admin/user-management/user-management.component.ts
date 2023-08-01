import { Component, OnInit } from '@angular/core';
import {
  ModalDismissReasons,
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';
import { RoleModalComponent } from 'src/app/modals/role-modal/role-modal.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  users: User[] | undefined;
  rolesToModal: string[] = ['Admin', 'Moderator', 'Member'];
  closeResult = '';
  constructor(
    private adminService: AdminService,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe({
      next: (user) => {
        if (user) this.users = user;
      },
    });
  }

  openRolesModal(user: User) {
    const modalRef = this.modalService.open(RoleModalComponent);
    modalRef.componentInstance.username = user.username;
    modalRef.componentInstance.availableRoles = this.rolesToModal;
    modalRef.componentInstance.selectedRoles = [...user.roles]

    modalRef.result.then(
      (result) => {
        user.roles = result;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
