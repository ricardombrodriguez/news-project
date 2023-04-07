import { Component, OnInit } from '@angular/core';
import { Publication_Topics } from 'src/app/interfaces/publication_topics';
import { TopicsService } from 'src/app/services/topics.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PublicationService } from 'src/app/services/publication.service';
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

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '100px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Write your publication here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };

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