
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Publication_Topics } from 'src/app/interfaces/publication_topics';
import { TopicsService } from 'src/app/services/topics.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  @Input() topic!: Publication_Topics;
  topicUpdateForm!: FormGroup;
  token = ''+localStorage.getItem('token');

  constructor(private topicsService: TopicsService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.topicUpdateForm = this.fb.group({
      id: [this.topic.id],
      description: [this.topic.description]
    });

  }

  topicUpdate() {
    return this.topicsService.updateTopic(this.topic, this.topicUpdateForm.value.description,this.token).subscribe((topic) => {
      this.topicUpdateForm.updateValueAndValidity();
    });
  }

  disableTopic() {
    return this.topicsService.disableTopic(this.topic,this.token).subscribe(() => {
      window.location.reload();
    });
  }

  enableTopic() {
    return this.topicsService.enableTopic(this.topic,this.token).subscribe(() => {
      window.location.reload();
    });
  }

}