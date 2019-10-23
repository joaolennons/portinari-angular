import { PoCircularChartSeries } from '../po-chart-circular/po-chart-circular-series.interface';

/**
 * @usedBy PoChartComponent
 *
 * @description
 *
 * Interface que define o objeto da série `PoChartType.Gauge`.
 */
export interface PoChartGaugeSerie {

  /**
   * @optional
   *
   * @description
   *
   * Define o texto que será exibido na área interna e centralizado ao gráfico.
   */
  description?: string;

  /**
   * @optional
   *
   * @description
   *
   * Define o texto que será exibido ao passar o *mouse* sobre o gráfico.
   *
   * > Caso não seja informado um valor para o *tooltip*, será exibido o valor contido em `description`.
   */
  tooltip?: string;

  /** Define o valor do objeto. */
  value: number;

}
