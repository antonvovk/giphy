import { __decorate, __metadata, __extends } from 'tslib';
import { CommonModule } from '@angular/common';
import { EventEmitter, Input, Output, Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { isValidHex, ColorWrap, AlphaModule, CheckboardModule, EditableInputModule, HueModule, SaturationModule, SwatchModule } from 'ngx-color';

var SketchFieldsComponent = /** @class */ (function () {
    function SketchFieldsComponent() {
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
    SketchFieldsComponent.prototype.round = function (value) {
        return Math.round(value);
    };
    SketchFieldsComponent.prototype.handleChange = function (_a) {
        var data = _a.data, $event = _a.$event;
        if (data.hex) {
            if (isValidHex(data.hex)) {
                this.onChange.emit({
                    data: {
                        hex: data.hex,
                        source: 'hex',
                    },
                    $event: $event,
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
                $event: $event,
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
                $event: $event,
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
                $event: $event,
            });
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
            template: "\n  <div class=\"sketch-fields\">\n    <div class=\"sketch-double\">\n      <color-editable-input\n        [style]=\"{ input: input, label: label }\"\n        label=\"hex\"\n        [value]=\"hex.replace('#', '')\"\n        (onChange)=\"handleChange($event)\"\n      ></color-editable-input>\n    </div>\n    <div class=\"sketch-single\">\n      <color-editable-input\n        [style]=\"{ input: input, label: label }\"\n        label=\"r\"\n        [value]=\"rgb.r\"\n        (onChange)=\"handleChange($event)\"\n        [dragLabel]=\"true\"\n        [dragMax]=\"255\"\n      ></color-editable-input>\n    </div>\n    <div class=\"sketch-single\">\n      <color-editable-input\n        [style]=\"{ input: input, label: label }\"\n        label=\"g\"\n        [value]=\"rgb.g\"\n        (onChange)=\"handleChange($event)\"\n        [dragLabel]=\"true\"\n        [dragMax]=\"255\"\n      ></color-editable-input>\n    </div>\n    <div class=\"sketch-single\">\n      <color-editable-input\n        [style]=\"{ input: input, label: label }\"\n        label=\"b\"\n        [value]=\"rgb.b\"\n        (onChange)=\"handleChange($event)\"\n        [dragLabel]=\"true\"\n        [dragMax]=\"255\"\n      ></color-editable-input>\n    </div>\n    <div class=\"sketch-alpha\" *ngIf=\"disableAlpha === false\">\n      <color-editable-input\n        [style]=\"{ input: input, label: label }\"\n        label=\"a\"\n        [value]=\"round(rgb.a * 100)\"\n        (onChange)=\"handleChange($event)\"\n        [dragLabel]=\"true\"\n        [dragMax]=\"100\"\n      ></color-editable-input>\n    </div>\n  </div>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            preserveWhitespaces: false,
            styles: ["\n    .sketch-fields {\n      display: flex;\n      padding-top: 4px;\n    }\n    .sketch-double {\n      -webkit-box-flex: 2;\n      flex: 2 1 0%;\n    }\n    .sketch-single {\n      flex: 1 1 0%;\n      padding-left: 6px;\n    }\n    .sketch-alpha {\n      -webkit-box-flex: 1;\n      flex: 1 1 0%;\n      padding-left: 6px;\n    }\n  "]
        })
    ], SketchFieldsComponent);
    return SketchFieldsComponent;
}());

var SketchPresetColorsComponent = /** @class */ (function () {
    function SketchPresetColorsComponent() {
        this.onClick = new EventEmitter();
        this.onSwatchHover = new EventEmitter();
        this.swatchStyle = {
            borderRadius: '3px',
            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.15)',
        };
    }
    SketchPresetColorsComponent.prototype.handleClick = function (_a) {
        var hex = _a.hex, $event = _a.$event;
        this.onClick.emit({ hex: hex, $event: $event });
    };
    SketchPresetColorsComponent.prototype.normalizeValue = function (val) {
        if (typeof val === 'string') {
            return { color: val };
        }
        return val;
    };
    SketchPresetColorsComponent.prototype.focusStyle = function (val) {
        var c = this.normalizeValue(val);
        return {
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,.15), 0 0 4px " + c.color,
        };
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
            template: "\n  <div class=\"sketch-swatches\">\n    <div class=\"sketch-wrap\" *ngFor=\"let c of colors\">\n      <color-swatch\n        [color]=\"normalizeValue(c).color\"\n        [style]=\"swatchStyle\"\n        [focusStyle]=\"focusStyle(c)\"\n        (onClick)=\"handleClick($event)\"\n        (onHover)=\"onSwatchHover.emit($event)\"\n        class=\"swatch\"\n      ></color-swatch>\n    </div>\n  </div>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            preserveWhitespaces: false,
            styles: ["\n    .sketch-swatches {\n      margin: 0px -10px;\n      padding: 10px 0px 0px 10px;\n      border-top: 1px solid rgb(238, 238, 238);\n      display: flex;\n      flex-wrap: wrap;\n      position: relative;\n    }\n    .sketch-wrap {\n      width: 16px;\n      height: 16px;\n      margin: 0px 10px 10px 0px;\n    }\n  "]
        })
    ], SketchPresetColorsComponent);
    return SketchPresetColorsComponent;
}());

var SketchComponent = /** @class */ (function (_super) {
    __extends(SketchComponent, _super);
    function SketchComponent() {
        var _this = _super.call(this) || this;
        /** Remove alpha slider and options from picker */
        _this.disableAlpha = false;
        /** Hex strings for default colors at bottom of picker */
        _this.presetColors = [
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
        _this.width = 200;
        return _this;
    }
    SketchComponent.prototype.afterValidChange = function () {
        this.activeBackground = "rgba(" + this.rgb.r + ", " + this.rgb.g + ", " + this.rgb.b + ", " + this.rgb.a + ")";
    };
    SketchComponent.prototype.handleValueChange = function (_a) {
        var data = _a.data, $event = _a.$event;
        this.handleChange(data, $event);
    };
    SketchComponent.prototype.handleBlockChange = function (_a) {
        var hex = _a.hex, $event = _a.$event;
        if (isValidHex(hex)) {
            // this.hex = hex;
            this.handleChange({
                hex: hex,
                source: 'hex',
            }, $event);
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
            template: "\n  <div class=\"sketch-picker {{ className }}\" [style.width]=\"width\">\n    <div class=\"sketch-saturation\">\n      <color-saturation [hsl]=\"hsl\" [hsv]=\"hsv\"\n        (onChange)=\"handleValueChange($event)\"\n      >\n      </color-saturation>\n    </div>\n    <div class=\"sketch-controls\">\n      <div class=\"sketch-sliders\">\n        <div class=\"sketch-hue\">\n          <color-hue [hsl]=\"hsl\"\n            (onChange)=\"handleValueChange($event)\"\n          ></color-hue>\n        </div>\n        <div class=\"sketch-alpha\" *ngIf=\"disableAlpha === false\">\n          <color-alpha\n            [radius]=\"2\" [rgb]=\"rgb\" [hsl]=\"hsl\"\n            (onChange)=\"handleValueChange($event)\"\n          ></color-alpha>\n        </div>\n      </div>\n      <div class=\"sketch-color\">\n        <color-checkboard></color-checkboard>\n        <div class=\"sketch-active\" [style.background]=\"activeBackground\"></div>\n      </div>\n    </div>\n    <div class=\"sketch-controls\">\n      <color-sketch-fields\n        [rgb]=\"rgb\" [hsl]=\"hsl\" [hex]=\"hex\"\n        [disableAlpha]=\"disableAlpha\"\n        (onChange)=\"handleValueChange($event)\"\n      ></color-sketch-fields>\n    </div>\n    <div class=\"sketch-controls\">\n      <color-sketch-preset-colors\n        [colors]=\"presetColors\"\n        (onClick)=\"handleBlockChange($event)\"\n        (onSwatchHover)=\"onSwatchHover.emit($event)\"\n      ></color-sketch-preset-colors>\n    </div>\n  </div>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            preserveWhitespaces: false,
            styles: ["\n    .sketch-picker {\n      padding: 10px 10px 0;\n      box-sizing: initial;\n      background: #fff;\n      border-radius: 4px;\n      box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.15);\n    }\n    .sketch-saturation {\n      width: 100%;\n      padding-bottom: 75%;\n      position: relative;\n      overflow: hidden;\n    }\n    .sketch-controls {\n      display: flex;\n    }\n    .sketch-sliders {\n      padding: 4px 0px;\n      -webkit-box-flex: 1;\n      flex: 1 1 0%;\n    }\n    .sketch-hue {\n      position: relative;\n      height: 10px;\n      overflow: hidden;\n    }\n    .sketch-alpha {\n      position: relative;\n      height: 10px;\n      margin-top: 4px;\n      overflow: hidden;\n    }\n    .sketch-color {\n      width: 24px;\n      height: 24px;\n      position: relative;\n      margin-top: 4px;\n      margin-left: 4px;\n      border-radius: 3px;\n    }\n    .sketch-active {\n      position: absolute;\n      top: 0px;\n      right: 0px;\n      bottom: 0px;\n      left: 0px;\n      border-radius: 2px;\n      box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.25) 0px 0px 4px inset;\n    }\n  "]
        }),
        __metadata("design:paramtypes", [])
    ], SketchComponent);
    return SketchComponent;
}(ColorWrap));
var ColorSketchModule = /** @class */ (function () {
    function ColorSketchModule() {
    }
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
    return ColorSketchModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { ColorSketchModule, SketchComponent, SketchFieldsComponent as ɵa, SketchPresetColorsComponent as ɵb };
//# sourceMappingURL=ngx-color-sketch.js.map
