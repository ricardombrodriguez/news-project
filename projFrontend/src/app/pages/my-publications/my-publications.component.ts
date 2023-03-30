import { Component, OnInit } from '@angular/core';
import { Publication } from 'src/app/interfaces/publication';
import { Observable } from 'rxjs';
import { PublicationService } from 'src/app/services/publication.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Publication_Topics } from 'src/app/interfaces/publication_topics';
import { TopicsService } from 'src/app/services/topics.service';
@Component({
  selector: 'app-my-publications',
  templateUrl: './my-publications.component.html',
  styleUrls: ['./my-publications.component.css']
})
export class MyPublicationsComponent implements OnInit {
  public topics: Publication_Topics[] = [];
  contactForm !:FormGroup;
  public publications: Publication[] = [];
  public publications_pendent: Publication[] = [];
  public publications_filled: Publication[] = [];
  public id:number=-1;
  public topic:string='';
  public author:string ='';
  public date:string='';
  public title:string='';
  token = ''+localStorage.getItem('token');

  constructor(private topicsService: TopicsService,private publicationsService: PublicationService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getTopics();
    this.contactForm = this.fb.group({
      topic: [null],
      title:[null],
      date:[null],
    });
    var str_id =localStorage.getItem(('id'))
    if (str_id==null){
      str_id='-1'
    }
    this.id =+str_id
    this.getActivePublications(this.id);
    this.getPendentPublications(this.id);
    this.getFilledPublications(this.id);
  }
  getTopics(): void {
    this.topicsService.getTopics().subscribe((topics) => {
      this.topics = topics;
    });
  }
  getActivePublications(id:number): void {
    this.publicationsService.getActivePublicationsByUser(id,this.token).subscribe((publications) => {
      this.publications = publications;
    });
  }
  getPendentPublications(id:number): void {
    this.publicationsService.getPendentPublicationsByUser(id,this.token).subscribe((publications) => {
      this.publications_pendent = publications;
    });
  }
  getFilledPublications(id:number): void {
    this.publicationsService.getClosedPublicationsByUser(id,this.token).subscribe((publications) => {
      this.publications_filled = publications;
    });
  }


  public getFormData():void {
    const data=this.contactForm.value
    var x :boolean=false;
    if (data["topic"] !== undefined){
      if (data["topic"] !== null){
        this.topic=data["topic"]
        console.log(this.topic)
      }
      else{
        this.topic=''
      }
      x=true;
      
    }
    if (data["author"] !== undefined){
      if (data["author"] !== null){
        this.author=data["author"]
        console.log(this.author)
      }
      else{
        this.author=''
      }
      x=true;

    } 
    if (data["title"] !== undefined){
      if (data["title"] !== null) {
         this.title=data["title"]
      console.log(this.title)
      }
      else{
        this.title=''
      }
      x=true;
      
    }
    if (data["date"] !== undefined){
      if (data["date"] !== null){
         this.date=data["date"]
      console.log(this.date)
      }
      else{
        this.date=''
      }
      x=true;
    }
    if (x){
      //FAZER O SEARCH POR CADA USER OU SEJA PRECISO DE 3 FUNÇÕES +
      this.publicationsService.getSearchPublicationsApprovedByUser(this.id,this.date,this.topic,this.title,this.token).subscribe((publications) => {
        this.publications = publications;
      });
      this.publicationsService.getSearchPublicationsFilledByUser(this.id,this.date,this.topic,this.title,this.token).subscribe((publications) => {
        this.publications_filled = publications;
      });
      this.publicationsService.getSearchPublicationsPendentByUser(this.id,this.date,this.topic,this.title,this.token).subscribe((publications) => {
        this.publications_pendent = publications;
      });
    }
    
  }
}
