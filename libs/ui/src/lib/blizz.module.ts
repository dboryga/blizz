import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlizzConfig } from './models';
import { BLIZZ_CONFIG, setupConfig } from './config';
import { BlizzService } from './blizz.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class BlizzModule {
  static forRoot(config?: BlizzConfig): ModuleWithProviders<BlizzModule> {
    return {
      ngModule: BlizzModule,
      providers: [
        BlizzService,
        {
          provide: BLIZZ_CONFIG,
          useValue: setupConfig(config),
        },
      ],
    };
  }

  constructor(blizzService: BlizzService) {
    blizzService.createGlobalCss();
  }
}
