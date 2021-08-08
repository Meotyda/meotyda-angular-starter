import { NgModule } from '@angular/core';
import { LoginRoutingModule } from '@login/login-routing.module';
import { SharedModule } from '@shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { BgComponent } from './components/bg/bg.component';

@NgModule({
  declarations: [LoginComponent, BgComponent],
  entryComponents: [LoginComponent],
  imports: [LoginRoutingModule, SharedModule],
  exports: [LoginComponent],
})
export class LoginModule {}
