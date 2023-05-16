import { Component, ElementRef, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { usersDB } from '../../services/data';
import { IUsersTable } from '../../interfaces/users.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  loading: boolean = false;
  cols: any[] = [];
  users: IUsersTable[] = [];

  @ViewChild('filter') filter!: ElementRef;

  constructor() {}

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
  ngOnInit() {
    this.getUsers();

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'firstName', header: 'Nombre(s)' },
      { field: 'lastName', header: 'Apellido(s)' },
      { field: 'dni', header: 'Documento' },
      { field: 'phone', header: 'Teléfono' },
      { field: 'email', header: 'Email' },
    ];
  }
  getUsers() {
    usersDB.forEach((element: any) => {
      this.users.push({
        id: element.id,
        firstName: element.name,
        lastName: element.username,
        dni: element.address.zipcode,
        phone: element.phone,
        email: element.email.toLowerCase()
      })
    })
  }

}
