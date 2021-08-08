import { CommonModule } from '@angular/common';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialComponentsModule } from '@shared/components/material.module';
import { ShellComponent } from '@shared/components/shell/shell.component';

export const components: any[] = [ShellComponent];

export const directives: any[] = [];

export const pipes: any[] = [];

export const modules: any[] = [
  CommonModule,
  LoadingBarRouterModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  FlexLayoutModule,
  LayoutModule,
  MaterialComponentsModule,
];
