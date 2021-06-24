import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StreamerComponent } from './streamer/streamer.component';

const routes: Routes = [{ path: '', component: StreamerComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
