import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivePublicationsComponent } from './pages/active-publications/active-publications.component';
import { ClosedPublicationsComponent } from './pages/closed-publications/closed-publications.component';
import { CreatePublicationComponent } from './pages/create-publication/create-publication.component';
import { FavouritesComponent } from './pages/favourites/favourites.component';
import { LoginComponent } from './pages/login/login.component';
import { ManageTopicsComponent } from './pages/manage-topics/manage-topics.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { MyPublicationsComponent } from './pages/my-publications/my-publications.component';
import { PendentPublicationsComponent } from './pages/pendent-publications/pendent-publications.component';
import { PublicationPageComponent } from './pages/publication-page/publication-page.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [

  { path: '', component: ActivePublicationsComponent },

  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },

  { path: 'my_publications', component: MyPublicationsComponent },

  { path: 'pendent_publications', component: PendentPublicationsComponent },

  { path: 'closed_publications', component: ClosedPublicationsComponent },

  { path: 'favourites', component: FavouritesComponent },

  { path: 'users', component: ManageUsersComponent },

  { path: 'topics', component: ManageTopicsComponent },

  { path: 'publication/:id', component: PublicationPageComponent },

  { path: 'create_publication', component: CreatePublicationComponent },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
