import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlizzConfig } from './models';
import { BLIZZ_CONFIG, BLIZZ_SERVICE_OPTIONS, setupConfig } from './config';
import { BlizzService, BlizzServiceOptions } from './blizz.service';

@NgModule({
  imports: [CommonModule],
})
export class BlizzModule {
  static forRoot(
    config?: BlizzConfig,
    options?: BlizzServiceOptions,
  ): ModuleWithProviders<BlizzModule> {
    return {
      ngModule: BlizzModule,
      providers: [
        BlizzService,
        {
          provide: BLIZZ_CONFIG,
          useValue: setupConfig(config),
        },
        {
          provide: BLIZZ_SERVICE_OPTIONS,
          useValue: options,
        },
      ],
    };
  }

  constructor(blizzService: BlizzService) {
    blizzService.initiateBlizz();
  }
}
