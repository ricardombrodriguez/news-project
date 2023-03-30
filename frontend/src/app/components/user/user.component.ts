import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Group } from 'src/app/interfaces/group';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() user!: User;
  @Input() groups!: Group[];
  contactForm !:FormGroup;
  token = ''+localStorage.getItem('token');

  constructor(private fb:FormBuilder, private userService: UsersService) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      grupo: this.user.group.description
    })
  }

  saveUser(): void{
    console.log(this.contactForm.value)

    let grupo= this.contactForm.value["grupo"]
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].description == grupo){
        grupo=this.groups[i]
        break
      }
    }
    let tmp_user=this.user
    tmp_user.group=grupo
    this.userService.updateUser(tmp_user,this.token).subscribe( data_user => {
      this.user=tmp_user
    },
    error => {
      console.log('Error: ', error);
      
    })
    }
}