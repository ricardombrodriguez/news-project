import { Component, OnInit } from '@angular/core';
import { Publication_Topics } from 'src/app/interfaces/publication_topics';
import { TopicsService } from 'src/app/services/topics.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PublicationService } from 'src/app/services/publication.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-publication',
  templateUrl: './create-publication.component.html',
  styleUrls: ['./create-publication.component.css']
})
export class CreatePublicationComponent implements OnInit {

  public topics!: Publication_Topics[];
  public postForm !: FormGroup;
  token = ''+localStorage.getItem('token');


  constructor(private topicService: TopicsService, private publicationService: PublicationService, private fb: FormBuilder, private router: Router) {

    this.postForm = this.fb.group({
      title: [null],
      content: [null],
      topic: [null]
    });

  }

  ngOnInit(): void {

    this.getTopics();

  }

  getTopics(): void {
    this.topicService.getEnabledTopics().subscribe((topics) => {
      this.topics = topics;
    });
  }

  submitPublication() {
    console.log("submit pub")
    console.log(this.postForm)
    return this.publicationService.createPublication(this.postForm, this.topics,this.token).subscribe((pub) =>
      this.router.navigate(['/publication/' + pub.id])
    );
  }

}
