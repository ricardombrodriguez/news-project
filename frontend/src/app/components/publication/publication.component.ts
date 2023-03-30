import { Component, Input, OnInit } from '@angular/core';
import { Publication } from 'src/app/interfaces/publication';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  @Input() publication!: Publication;

  constructor() { }

  ngOnInit(): void {




  }



}
