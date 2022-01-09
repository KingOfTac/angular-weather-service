import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {
  allComponents,
  accentPalette,
  PaletteRGB,
  SwatchRGB,
  neutralPalette,
  controlCornerRadius,
  designUnit,
  baseHeightMultiplier,
  baseLayerLuminance,
  StandardLuminance,
  Swatch,
  bodyFont,
  density,
  typeRampBaseFontSize,
  typeRampBaseLineHeight,
  typeRampMinus1FontSize,
  typeRampMinus1LineHeight,
  typeRampMinus2FontSize,
  typeRampPlus2FontSize,
  typeRampPlus1FontSize,
  typeRampPlus1LineHeight,
  typeRampPlus2LineHeight,
  typeRampPlus3FontSize,
  typeRampPlus3LineHeight,
  typeRampPlus4FontSize,
  typeRampPlus4LineHeight,
  typeRampPlus5FontSize,
  typeRampPlus5LineHeight,
  typeRampPlus6FontSize,
  typeRampPlus6LineHeight,
  typeRampMinus2LineHeight,
} from '@microsoft/fast-components';
import { parseColorHexRGB } from '@microsoft/fast-colors';
import { DesignSystem, DesignToken } from '@microsoft/fast-foundation';
import { iconFillColor, iconStrokeColor, iconStrokeWidth } from './app/modules/icons/icons';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

const accentBase = parseColorHexRGB('#6476F6')!;
accentPalette.withDefault(
  PaletteRGB.from(
    SwatchRGB.create(accentBase.r, accentBase.g, accentBase.b)
  )
);

const neutralBase = parseColorHexRGB('#121331')!;
neutralPalette.withDefault(
  PaletteRGB.from(
    SwatchRGB.create(neutralBase.r, neutralBase.g, neutralBase.b)
  )
);

export const typeRampMultiplier = DesignToken.create<number>('type-ramp-multiplier').withDefault(1);

typeRampBaseFontSize.withDefault('calc(14px * var(--type-ramp-multiplier))');
typeRampBaseLineHeight.withDefault('calc(20px * var(--type-ramp-multiplier))');
typeRampMinus1FontSize.withDefault('calc(12px * var(--type-ramp-multiplier))');
typeRampMinus1LineHeight.withDefault('calc(16px * var(--type-ramp-multiplier))');
typeRampMinus2FontSize.withDefault('calc(10px * var(--type-ramp-multiplier))');
typeRampMinus2LineHeight.withDefault('calc(16px * var(--type-ramp-multiplier))');
typeRampPlus1FontSize.withDefault('calc(18px * var(--type-ramp-multiplier))');
typeRampPlus1LineHeight.withDefault('calc(24px * var(--type-ramp-multiplier))');
typeRampPlus2FontSize.withDefault('calc(20px * var(--type-ramp-multiplier))');
typeRampPlus2LineHeight.withDefault('calc(28px * var(--type-ramp-multiplier))');
typeRampPlus3FontSize.withDefault('calc(28px * var(--type-ramp-multiplier))');
typeRampPlus3LineHeight.withDefault('calc(36px * var(--type-ramp-multiplier))');
typeRampPlus4FontSize.withDefault('calc(34px * var(--type-ramp-multiplier))');
typeRampPlus4LineHeight.withDefault('calc(44px * var(--type-ramp-multiplier))');
typeRampPlus5FontSize.withDefault('calc(46px * var(--type-ramp-multiplier))');
typeRampPlus5LineHeight.withDefault('calc(56px * var(--type-ramp-multiplier))');
typeRampPlus6FontSize.withDefault('calc(60px * var(--type-ramp-multiplier))');
typeRampPlus6LineHeight.withDefault('calc(70px * var(--type-ramp-multiplier))');

export const cardMaxWidth = DesignToken.create<string>('card-max-width').withDefault('250px');
export const cardHeight = DesignToken.create<string>('card-height').withDefault('450px');
export const heightNumber = DesignToken.create<number>('height-number').withDefault(
  (target) => 
    (baseHeightMultiplier.getValueFor(target) +
    density.getValueFor(target)) *
    designUnit.getValueFor(target)
);

export const iconHeightMultiplier = DesignToken.create<number>('icon-height-multiplier').withDefault(1);

bodyFont.withDefault('"Rubik", sans-serif')
controlCornerRadius.withDefault(22);
baseLayerLuminance.withDefault(StandardLuminance.LightMode);

DesignSystem
  .getOrCreate()
  .withPrefix('neutron')
  .register(allComponents);