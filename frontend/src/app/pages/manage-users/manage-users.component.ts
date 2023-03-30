import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Group } from 'src/app/interfaces/group';
import { Publication_Topics } from 'src/app/interfaces/publication_topics';
import { User } from 'src/app/interfaces/user';
import { TopicsService } from 'src/app/services/topics.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  public users!: User[];
  public topics!: Group[];
  
  topicForm !: FormGroup;
  token=''+localStorage.getItem("token")
  group=''+localStorage.getItem('group');
  constructor(private fb: FormBuilder,private userService: UsersService, private topicsService : TopicsService ) { }

  ngOnInit(): void {

    this.getAllUsers();
    this.getTopics();
    this.topicForm = this.fb.group({
      topic: [null],
      username : [null],
      name:[null],
    });
  }

  getAllUsers() {
    return this.userService.getUsersPossible(this.group).subscribe((users) => {
      this.users = users;
    })
  }
  getTopics() {
    return this.userService.get_groupDescription(this.token,this.group).subscribe((data) => {
      this.topics = data;
      console.log("AQUI")
    })
  }
  submit(){
    var data=this.topicForm.value
    var topic_description=data["topic"]
    var name=data["name"]
    var username=data["username"]
    this.group=''+localStorage.getItem("group")
    
    this.userService.getUsersSearch(topic_description,this.group,name,username).subscribe(data => {
      this.users=data
    });
    this.topicForm.reset()
  }
}
