import * as shared from '@shared/index';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [...shared.components, ...shared.directives, ...shared.pipes],
  imports: [...shared.modules],
  exports: [...shared.components, ...shared.directives, ...shared.pipes, shared.modules],
})
export class SharedModule {}
