import { __decorate, __metadata } from 'tslib';
import { CommonModule } from '@angular/common';
import { EventEmitter, Input, Output, Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { isValidHex, ColorWrap, AlphaModule, CheckboardModule, EditableInputModule, HueModule, SaturationModule, SwatchModule } from 'ngx-color';

let SketchFieldsComponent = class SketchFieldsComponent {
    constructor() {
        this.disableAlpha = false;
        this.onChange = new EventEmitter();
        this.input = {
            width: '100%',
            padding: '4px 10% 3px',
            border: 'none',
            boxSizing: 'border-box',
            boxShadow: 'inset 0 0 0 1px #ccc',
            fontSize: '11px',
        };
        this.label = {
            display: 'block',
            textAlign: 'center',
            fontSize: '11px',
            color: '#222',
            paddingTop: '3px',
            paddingBottom: '4px',
            textTransform: 'capitalize',
        };
    }
    round(value) {
        return Math.round(value);
    }
    handleChange({ data, $event }) {
        if (data.hex) {
            if (isValidHex(data.hex)) {
                this.onChange.emit({
                    data: {
                        hex: data.hex,
                        source: 'hex',
                    },
                    $event,
                });
            }
        }
        else if (data.r || data.g || data.b) {
            this.onChange.emit({
                data: {
                    r: data.r || this.rgb.r,
                    g: data.g || this.rgb.g,
                    b: data.b || this.rgb.b,
                    source: 'rgb',
                },
                $event,
            });
        }
        else if (data.a) {
            if (data.a < 0) {
                data.a = 0;
            }
            else if (data.a > 100) {
                data.a = 100;
            }
            data.a /= 100;
            this.onChange.emit({
                data: {
                    h: this.hsl.h,
                    s: this.hsl.s,
                    l: this.hsl.l,
                    a: Math.round(data.a * 100) / 100,
                    source: 'rgb',
                },
                $event,
            });
        }
        else if (data.h || data.s || data.l) {
            this.onChange.emit({
                data: {
                    h: data.h || this.hsl.h,
                    s: Number((data.s && data.s) || this.hsl.s),
                    l: Number((data.l && data.l) || this.hsl.l),
                    source: 'hsl',
                },
                $event,
            });
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], SketchFieldsComponent.prototype, "hsl", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SketchFieldsComponent.prototype, "rgb", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SketchFieldsComponent.prototype, "hex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SketchFieldsComponent.prototype, "disableAlpha", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], SketchFieldsComponent.prototype, "onChange", void 0);
SketchFieldsComponent = __decorate([
    Component({
        selector: 'color-sketch-fields',
        template: `
  <div class="sketch-fields">
    <div class="sketch-double">
      <color-editable-input
        [style]="{ input: input, label: label }"
        label="hex"
        [value]="hex.replace('#', '')"
        (onChange)="handleChange($event)"
      ></color-editable-input>
    </div>
    <div class="sketch-single">
      <color-editable-input
        [style]="{ input: input, label: label }"
        label="r"
        [value]="rgb.r"
        (onChange)="handleChange($event)"
        [dragLabel]="true"
        [dragMax]="255"
      ></color-editable-input>
    </div>
    <div class="sketch-single">
      <color-editable-input
        [style]="{ input: input, label: label }"
        label="g"
        [value]="rgb.g"
        (onChange)="handleChange($event)"
        [dragLabel]="true"
        [dragMax]="255"
      ></color-editable-input>
    </div>
    <div class="sketch-single">
      <color-editable-input
        [style]="{ input: input, label: label }"
        label="b"
        [value]="rgb.b"
        (onChange)="handleChange($event)"
        [dragLabel]="true"
        [dragMax]="255"
      ></color-editable-input>
    </div>
    <div class="sketch-alpha" *ngIf="disableAlpha === false">
      <color-editable-input
        [style]="{ input: input, label: label }"
        label="a"
        [value]="round(rgb.a * 100)"
        (onChange)="handleChange($event)"
        [dragLabel]="true"
        [dragMax]="100"
      ></color-editable-input>
    </div>
  </div>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        preserveWhitespaces: false,
        styles: [`
    .sketch-fields {
      display: flex;
      padding-top: 4px;
    }
    .sketch-double {
      -webkit-box-flex: 2;
      flex: 2 1 0%;
    }
    .sketch-single {
      flex: 1 1 0%;
      padding-left: 6px;
    }
    .sketch-alpha {
      -webkit-box-flex: 1;
      flex: 1 1 0%;
      padding-left: 6px;
    }
  `]
    })
], SketchFieldsComponent);

let SketchPresetColorsComponent = class SketchPresetColorsComponent {
    constructor() {
        this.onClick = new EventEmitter();
        this.onSwatchHover = new EventEmitter();
        this.swatchStyle = {
            borderRadius: '3px',
            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.15)',
        };
    }
    handleClick({ hex, $event }) {
        this.onClick.emit({ hex, $event });
    }
    normalizeValue(val) {
        if (typeof val === 'string') {
            return { color: val };
        }
        return val;
    }
    focusStyle(val) {
        const c = this.normalizeValue(val);
        return {
            boxShadow: `inset 0 0 0 1px rgba(0,0,0,.15), 0 0 4px ${c.color}`,
        };
    }
};
__decorate([
    Input(),
    __metadata("design:type", Array)
], SketchPresetColorsComponent.prototype, "colors", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], SketchPresetColorsComponent.prototype, "onClick", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], SketchPresetColorsComponent.prototype, "onSwatchHover", void 0);
SketchPresetColorsComponent = __decorate([
    Component({
        selector: 'color-sketch-preset-colors',
        template: `
  <div class="sketch-swatches">
    <div class="sketch-wrap" *ngFor="let c of colors">
      <color-swatch
        [color]="normalizeValue(c).color"
        [style]="swatchStyle"
        [focusStyle]="focusStyle(c)"
        (onClick)="handleClick($event)"
        (onHover)="onSwatchHover.emit($event)"
        class="swatch"
      ></color-swatch>
    </div>
  </div>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        preserveWhitespaces: false,
        styles: [`
    .sketch-swatches {
      margin: 0px -10px;
      padding: 10px 0px 0px 10px;
      border-top: 1px solid rgb(238, 238, 238);
      display: flex;
      flex-wrap: wrap;
      position: relative;
    }
    .sketch-wrap {
      width: 16px;
      height: 16px;
      margin: 0px 10px 10px 0px;
    }
  `]
    })
], SketchPresetColorsComponent);

let SketchComponent = class SketchComponent extends ColorWrap {
    constructor() {
        super();
        /** Remove alpha slider and options from picker */
        this.disableAlpha = false;
        /** Hex strings for default colors at bottom of picker */
        this.presetColors = [
            '#D0021B',
            '#F5A623',
            '#F8E71C',
            '#8B572A',
            '#7ED321',
            '#417505',
            '#BD10E0',
            '#9013FE',
            '#4A90E2',
            '#50E3C2',
            '#B8E986',
            '#000000',
            '#4A4A4A',
            '#9B9B9B',
            '#FFFFFF',
        ];
        /** Width of picker */
        this.width = 200;
    }
    afterValidChange() {
        this.activeBackground = `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, ${this.rgb.a})`;
    }
    handleValueChange({ data, $event }) {
        this.handleChange(data, $event);
    }
    handleBlockChange({ hex, $event }) {
        if (isValidHex(hex)) {
            // this.hex = hex;
            this.handleChange({
                hex,
                source: 'hex',
            }, $event);
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], SketchComponent.prototype, "disableAlpha", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SketchComponent.prototype, "presetColors", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SketchComponent.prototype, "width", void 0);
SketchComponent = __decorate([
    Component({
        selector: 'color-sketch',
        template: `
  <div class="sketch-picker {{ className }}" [style.width]="width">
    <div class="sketch-saturation">
      <color-saturation [hsl]="hsl" [hsv]="hsv"
        (onChange)="handleValueChange($event)"
      >
      </color-saturation>
    </div>
    <div class="sketch-controls">
      <div class="sketch-sliders">
        <div class="sketch-hue">
          <color-hue [hsl]="hsl"
            (onChange)="handleValueChange($event)"
          ></color-hue>
        </div>
        <div class="sketch-alpha" *ngIf="disableAlpha === false">
          <color-alpha
            [radius]="2" [rgb]="rgb" [hsl]="hsl"
            (onChange)="handleValueChange($event)"
          ></color-alpha>
        </div>
      </div>
      <div class="sketch-color">
        <color-checkboard></color-checkboard>
        <div class="sketch-active" [style.background]="activeBackground"></div>
      </div>
    </div>
    <div class="sketch-controls">
      <color-sketch-fields
        [rgb]="rgb" [hsl]="hsl" [hex]="hex"
        [disableAlpha]="disableAlpha"
        (onChange)="handleValueChange($event)"
      ></color-sketch-fields>
    </div>
    <div class="sketch-controls">
      <color-sketch-preset-colors
        [colors]="presetColors"
        (onClick)="handleBlockChange($event)"
        (onSwatchHover)="onSwatchHover.emit($event)"
      ></color-sketch-preset-colors>
    </div>
  </div>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        preserveWhitespaces: false,
        styles: [`
    .sketch-picker {
      padding: 10px 10px 0;
      box-sizing: initial;
      background: #fff;
      border-radius: 4px;
      box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.15);
    }
    .sketch-saturation {
      width: 100%;
      padding-bottom: 75%;
      position: relative;
      overflow: hidden;
    }
    .sketch-controls {
      display: flex;
    }
    .sketch-sliders {
      padding: 4px 0px;
      -webkit-box-flex: 1;
      flex: 1 1 0%;
    }
    .sketch-hue {
      position: relative;
      height: 10px;
      overflow: hidden;
    }
    .sketch-alpha {
      position: relative;
      height: 10px;
      margin-top: 4px;
      overflow: hidden;
    }
    .sketch-color {
      width: 24px;
      height: 24px;
      position: relative;
      margin-top: 4px;
      margin-left: 4px;
      border-radius: 3px;
    }
    .sketch-active {
      position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      border-radius: 2px;
      box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.25) 0px 0px 4px inset;
    }
  `]
    }),
    __metadata("design:paramtypes", [])
], SketchComponent);
let ColorSketchModule = class ColorSketchModule {
};
ColorSketchModule = __decorate([
    NgModule({
        declarations: [
            SketchComponent,
            SketchFieldsComponent,
            SketchPresetColorsComponent,
        ],
        exports: [
            SketchComponent,
            SketchFieldsComponent,
            SketchPresetColorsComponent,
        ],
        imports: [
            CommonModule,
            AlphaModule,
            CheckboardModule,
            EditableInputModule,
            HueModule,
            SaturationModule,
            SwatchModule,
        ],
    })
], ColorSketchModule);

/**
 * Generated bundle index. Do not edit.
 */

export { ColorSketchModule, SketchComponent, SketchFieldsComponent as ɵa, SketchPresetColorsComponent as ɵb };
//# sourceMappingURL=ngx-color-sketch.js.map
