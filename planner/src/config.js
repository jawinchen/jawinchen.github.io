export const DEFAULT_CONFIG={rows:2,cabinetsPerRow:10,cabinetSpacing:.25,rowGap:2.5};
export const CABINET={width:2.2,height:5.15,depth:3.85};
export function normalizeConfig(config){return{rows:Number(config.rows)===1?1:2,cabinetsPerRow:Math.max(1,Math.min(30,Number(config.cabinetsPerRow)||10)),cabinetSpacing:Math.max(0,Math.min(2,Number(config.cabinetSpacing)||0)),rowGap:Math.max(1.5,Math.min(10,Number(config.rowGap)||2.5))}}
export function getMetrics(config){const normalized=normalizeConfig(config);const width=normalized.cabinetsPerRow*CABINET.width+(normalized.cabinetsPerRow-1)*normalized.cabinetSpacing;const depth=normalized.rows*CABINET.depth+(normalized.rows-1)*normalized.rowGap;return{...normalized,width,depth,total:normalized.rows*normalized.cabinetsPerRow}}
