import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { DocAppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { DocAppRoutingModule } from "./app-routing.module";

@NgModule({
  declarations: [DocAppComponent],
  imports: [BrowserModule, HttpClientModule, DocAppRoutingModule],
  providers: [],
  bootstrap: [DocAppComponent],
})
export class DocAppModule {}
