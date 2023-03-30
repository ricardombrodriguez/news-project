import { Component, OnInit } from '@angular/core';
import { Publication } from 'src/app/interfaces/publication';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-pendent-publications',
  templateUrl: './pendent-publications.component.html',
  styleUrls: ['./pendent-publications.component.css']
})
export class PendentPublicationsComponent implements OnInit {

  public publications: Publication[] = [];
  public topic:string='';
  public author:string ='';
  public date:string='';
  public title:string='';
  constructor(private publicationsService: PublicationService) { }

  ngOnInit(): void {

    this.getPendentPublications();

  }

  getPendentPublications(): void {
    this.publicationsService.getPendentPublications().subscribe((publications) => {
      this.publications = publications;
    });
  }
  public getFormData(data:any):void {
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
      this.publicationsService.getSearchPublicationsPendent(this.author,this.date,this.topic,this.title).subscribe((publications) => {
        this.publications = publications;
      });
    }

  }


}
