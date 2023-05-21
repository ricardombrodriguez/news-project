
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Comment } from 'src/app/interfaces/comment';
import { Favorite } from 'src/app/interfaces/favorite';
import { Publication } from 'src/app/interfaces/publication';
import { Publication_Status } from 'src/app/interfaces/publication_status';
import { User } from 'src/app/interfaces/user';
import { CommentsService } from 'src/app/services/comments.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { PubStatusService } from 'src/app/services/pub-status.service';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-publication-page',
  templateUrl: './publication-page.component.html',
  styleUrls: ['./publication-page.component.css']
})
export class PublicationPageComponent implements OnInit {

  public id!: number;
  public pub!: Publication;
  public comments: Comment[] = [];
  public group = localStorage.getItem("group")
  token =''+ localStorage.getItem('token');
  loggedIn = true ? this.token != null : false 
  username = localStorage.getItem('username');
  user_id:number=-1
  fav_id:number=-1
  fav !: Favorite;
  isFav : boolean =false
  error : boolean=false
  contactForm !:FormGroup;
  public user = new User();
  constructor(private fb:FormBuilder,private commentSerice: CommentsService,private publicationService: PublicationService, private router: Router,private favoriteService:FavoriteService,private pubStatusService:PubStatusService) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      date:[null],
    })
    var str_id =localStorage.getItem(('id'))
    if (str_id==null){
      str_id='-1'
    }
    this.user_id =+str_id
    const url_array = this.router.url.split("/");
    this.id = +url_array[url_array.length - 1];
    //this.getPublicationDetails();
    this.getPublicationComments()
  }

  /*
  async getPublicationDetails() {
    return (await this.publicationService.getPublication(this.id)).subscribe((pub) => {
      this.pub = pub;

      
      this.favoriteService.checkIfFavorite(this.user_id,this.pub.id).subscribe(
        data => {
          this.isFav=true
          this.fav_id=data["id"]
          this.fav=data
        },
        error =>{
            this.isFav=false
        });
      //metodo para ver se é favorito , se receber algo é se não é false
    
    })
  }
  */
  accept(){
    console.log("accept")
    //quero mudar o estado da publicação atual para Approved 
    var tmp_pub = this.pub
    const estados=this.pubStatusService.getOne("Approved").subscribe(
      data => {
        var status = data
        tmp_pub.status=status
        this.publicationService.updatePublication(tmp_pub,this.token).subscribe(
          data => {
            this.pub=tmp_pub
            
          },
          error =>{
             console.log("erro")
        })
      },
      error =>{
         console.log("erro")
    })
  }

  addFav(){
    console.log("addFav")
    var fav = new Favorite()
    fav.publication=this.pub
    this.user.id=this.user_id
    this.user.username!=this.username
    fav.author=this.user
    this.favoriteService.addFavorite(fav,this.token).subscribe( (data) => window.location.reload());

  }
  rmFav(){
    this.favoriteService.deleteFavorite(this.fav,this.token).subscribe((data) => window.location.reload());
  }
  getPublicationComments(){
    console.log("OLA")
    this.commentSerice.getComments(this.id).subscribe(
      data => {
        this.comments=data
        
      },
      error =>{
         console.log("erro")
    })
  }
  arquivar(){
    console.log("arquivar")
    var tmp_pub = this.pub
    const estados=this.pubStatusService.getOne("Archived").subscribe(
      data => {
        var status = data
        tmp_pub.status=status
        this.publicationService.updatePublication(tmp_pub,this.token).subscribe(
          data => {
            this.pub=tmp_pub
            
          },
          error =>{
             console.log("erro")
        })
      },
      error =>{
         console.log("erro")
    })  }
    sendComment(){
      var comentario=(this.contactForm.value)["date"]
      var com = new Comment()
      com.publication=this.pub
      this.user.id=this.user_id
      this.user.username!=this.username
      com.author=this.user
      com.comment=comentario
      this.commentSerice.createComment(com,this.token).subscribe(
        data => {
          window.location.reload();
        },
        error => {
          alert(error)
        }
      )
    }
}
