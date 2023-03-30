import { Component, OnInit } from '@angular/core';
import { Publication } from 'src/app/interfaces/publication';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  public favourites!: Publication[];

  public topic:string='';
  public author:string ='';
  public date:string='';
  public title:string='';
  public id:number=-1;
  token = ''+localStorage.getItem('token');





  constructor(private publicationService: PublicationService) { }

  ngOnInit(): void {
    var str_id =localStorage.getItem(('id'))
    if (str_id==null){
      str_id='-1'
    }
    this.id =+str_id
    this.getFavouritePublications(this.id);

  }

  getFavouritePublications(id: number) {
    return this.publicationService.getFavouritePublicationsByUser(id,this.token).subscribe((favourites) => {
      this.favourites = favourites;
    })
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
      this.publicationService.getSearchPublicationsApprovedFavorite(this.id,this.author,this.date,this.topic,this.title,this.token).subscribe((publications) => {
        this.favourites = publications;
      });
    }
    
  }

}
