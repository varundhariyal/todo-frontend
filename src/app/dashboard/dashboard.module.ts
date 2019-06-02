import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashHomeComponent } from './dash-home/dash-home.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ListviewComponent } from './listview/listview.component';
import { TodolistService } from '../todolist.service';
import { UserHandleService } from '../user-handle.service';
import { UserOnServerComponent } from './user-on-server/user-on-server.component';
import { MultiviewComponent } from './multiview/multiview.component';
import { MultiHistoryComponent } from './multi-history/multi-history.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [DashHomeComponent, ListviewComponent, UserOnServerComponent, MultiviewComponent, MultiHistoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule.forRoot(),
    RouterModule.forChild([
      { path: 'dash/:userId', component: DashHomeComponent, pathMatch: 'full' },
      { path: 'listview/:listId', component: ListviewComponent, pathMatch: 'full' },
      { path: 'multiview', component: MultiviewComponent, pathMatch: 'full' },
      { path: 'multiview/history/:multiTodoId', component: MultiHistoryComponent, pathMatch: 'full' },
      { path: 'alluser', component: UserOnServerComponent, pathMatch: 'full' },
    ])
  ],
  providers: [UserHandleService, TodolistService]
})
export class DashboardModule { }
