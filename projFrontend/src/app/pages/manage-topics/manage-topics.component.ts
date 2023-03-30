import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Publication_Topics } from 'src/app/interfaces/publication_topics';
import { TopicsService } from 'src/app/services/topics.service';

@Component({
  selector: 'app-manage-topics',
  templateUrl: './manage-topics.component.html',
  styleUrls: ['./manage-topics.component.css']
})
export class ManageTopicsComponent implements OnInit {

  public topics: Publication_Topics[] = [];
  public topicAdded!: string;           // description of the topic to be added
  public repeated: boolean = false;
  topicForm !: FormGroup;
  token = ''+localStorage.getItem('token');

  constructor(private topicsService: TopicsService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.getTopics();
    this.topicForm = this.fb.group({
      description: [null],
      enabled: [true]
    });

  }

  getTopics() {
    return this.topicsService.getTopics().subscribe((topics) => {
      this.topics = topics;
    })
  }

  topicSubmit() {
    this.repeated = false;
    var descricao = (this.topicForm.value.description)
    var x: boolean = false
    for (var a of this.topics) {
      if (a.description == descricao) {
        x = true;
        break
      }
    }
    if (x) {
      this.topicForm.reset();
      this.repeated = true;
      return false;
    }
    return this.topicsService.createTopic(this.topicForm,this.token).subscribe((topic) => {
      this.topicAdded = topic;
      this.getTopics();
      this.topicForm.reset();
    });
  }

}
