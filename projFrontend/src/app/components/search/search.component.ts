import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Publication } from 'src/app/interfaces/publication';
import { Publication_Topics } from 'src/app/interfaces/publication_topics';
import { TopicsService } from 'src/app/services/topics.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  //preciso de ir buscar todos os tópicos
  public topics!: Publication_Topics[];
  contactForm !:FormGroup;
  @Output() submit=new EventEmitter<any>();
  constructor(private topicsService: TopicsService,private fb:FormBuilder) { }
  ngOnInit(): void {
    this.getTopics();
    this.contactForm = this.fb.group({
      topic: [null],
      title:[null],
      date:[null],
      author:[null]
    });
   
  }

  getTopics(): void {
    this.topicsService.getTopics().subscribe((topics) => {
      this.topics = topics;
    });
  }
  public tmp_submit(): void{
    console.log(this.contactForm.value)
    this.submit.emit(this.contactForm.value)
  }
  
  
  
}
