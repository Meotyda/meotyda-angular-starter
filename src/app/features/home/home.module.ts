import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [HomeComponent, DashboardComponent],
  entryComponents: [],
  imports: [HomeRoutingModule, SharedModule],
  exports: [],
})
export class HomeModule {}
