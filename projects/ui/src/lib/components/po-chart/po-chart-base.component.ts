import { EventEmitter, Input, Output } from '@angular/core';

import { convertToInt, isTypeof } from '../../utils/util';

import { PoChartType } from './enums/po-chart-type.enum';
import { PoDonutChartSeries } from './po-chart-types/po-chart-donut/po-chart-donut-series.interface';
import { PoPieChartSeries } from './po-chart-types/po-chart-pie/po-chart-pie-series.interface';

const poChartDefaultHeight = 400;
const poChartMinHeight = 200;
const poChartTypeDefault = PoChartType.Pie;

/**
 * @description
 *
 * O `po-chart` é um componente para renderização de dados através de gráficos, com isso facilitando a compreensão e tornando a
 * visualização destes dados mais agradável.
 *
 * Este componente também possibilita a definição das seguintes propriedades:
 *  - altura
 *  - series
 *  - tipo
 *  - título
 *
 * Além das definições de propriedades, também é possível definir uma ação que será executada ao clicar em determinado elemento do gráfico
 * e outra que será executada ao passar o *mouse* sobre o elemento.
 *
 * #### Boas práticas
 *
 * - Para que o gráfico não fique ilegível e incompreensível, evite uma quantia excessiva de séries.
 *
 */
export abstract class PoChartBaseComponent {

  private _height?: number = poChartDefaultHeight;
  private _type: PoChartType = poChartTypeDefault;

  public readonly poChartType = PoChartType;

  /**
   * @optional
   *
   * @description
   *
   * Define a altura do gráfico.
   *
   * > O valor mínimo que pode ser informado é 200.
   *
   * @default `400px`
   */
  @Input('p-height') set height(value: number) {
    const intValue = convertToInt(value);
    let height: number;

    if (isTypeof(value, 'number')) {
      height = intValue <= poChartMinHeight ? poChartMinHeight : intValue;
    } else {
      height = poChartDefaultHeight;
    }

    this._height = height;

    this.rebuildComponent();
  }

  get height(): number {
    return this._height;
  }

  /**
   * @description
   *
   * Define os elementos do gráfico que serão criados dinamicamente.
   *
   * > A coleção de objetos deve implementar alguma das interfaces abaixo:
   * - `PoDonutChartSeries`
   * - `PoPieChartSeries`
   */
  @Input('p-series') series: Array<PoDonutChartSeries | PoPieChartSeries>;

  /** Define o título do gráfico. */
  @Input('p-title') title?: string;

  /**
   * @optional
   *
   * @description
   *
   * Define o tipo de gráfico.
   *
   * > Veja os valores válidos no *enum* `PoChartType`.
   *
   * @default `PoChartType.Pie`
   */
  @Input('p-type') set type(value: PoChartType) {
    this._type = (<any>Object).values(PoChartType).includes(value) ? value : poChartTypeDefault;

    this.rebuildComponent();
  }

  get type(): PoChartType {
    return this._type;
  }

  /**
   * Evento executado quando o usuário clicar sobre um elemento do gráfico.
   *
   * > Será passado por parâmetro um objeto contendo a categoria e valor da série.
   */
  @Output('p-series-click')
  seriesClick?: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Evento executado quando o usuário passar o *mouse* sobre um elemento do gráfico.
   *
   * > Será passado por parâmetro um objeto contendo a categoria e valor da série.
   */
  @Output('p-series-hover')
  seriesHover?: EventEmitter<any> = new EventEmitter<any>();

  onSeriesClick(event: any): void {
    this.seriesClick.emit(event);
  }

  onSeriesHover(event: any): void {
    this.seriesHover.emit(event);
  }

  abstract rebuildComponent(): void;

}
