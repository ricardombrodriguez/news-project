import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Group } from 'src/app/interfaces/group';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  @Input() user!: User;
  @Input() groups!: Group[];
  token=''+localStorage.getItem("token")
  group=''+localStorage.getItem('group');
  formUser !:FormGroup
  constructor(private userSService: UsersService,private fb:FormBuilder) { }

  ngOnInit(): void {
    console.log("GRUPOS",this.groups)
    this.getGroupsPossible();
    console.log("GRUPOS",this.groups)
    this.formUser = this.fb.group({
      description: [null],
    })
  }

  getGroups() {
    return this.userSService.getGroups(this.token).subscribe((groups) => {
      this.groups = groups;
    })
    
  }

  getGroupsPossible(){
    return this.userSService.get_groupDescription(this.token,this.group).subscribe((groups) => {
      this.groups = groups;
    })
  }

}
