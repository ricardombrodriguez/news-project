import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/interfaces/comment';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment !:Comment
  public group = localStorage.getItem("group")
  token = ''+localStorage.getItem('token');
  username = localStorage.getItem('username');
  loggedIn = true ? this.token != null : false 
  constructor(private commentSerice: CommentsService) { }

  ngOnInit(): void {
  }

  deleteComment(){
    console.log("DELETE")
    
    this.commentSerice.deleteComment(this.comment,this.token).subscribe(() => window.location.reload());
  }
}
