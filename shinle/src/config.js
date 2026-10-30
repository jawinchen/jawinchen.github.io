export const SITE_CONFIG = {
  cabinetCount: 20,
  cabinetSpacing: 0.05,
  cabinetRotationY: -Math.PI / 2, // 原版櫃體局部 +X 操作面朝向世界 +Z
  electricalEquipmentGap: 0, // 沿用原本設備外緣配置
  electricalToBessGap: 8,
  foundationHeight: 1.04,
  showLabels: false,
  highVoltageWidth: 4.87,
  transformerWidth: 6.56,
  lowVoltageWidth: 4.87,
  cabinetEnvelopeWidth: 2.23,
  cabinetDepth: 3.86
};
export const highVoltageX = -8;
export const transformerX = highVoltageX + SITE_CONFIG.highVoltageWidth / 2
  + SITE_CONFIG.electricalEquipmentGap + SITE_CONFIG.transformerWidth / 2;
export const lowVoltageX = transformerX + SITE_CONFIG.transformerWidth / 2
  + SITE_CONFIG.electricalEquipmentGap + SITE_CONFIG.lowVoltageWidth / 2;
export const firstBessX = lowVoltageX + SITE_CONFIG.lowVoltageWidth / 2
  + SITE_CONFIG.electricalToBessGap + SITE_CONFIG.cabinetEnvelopeWidth / 2;
export const bessStep = SITE_CONFIG.cabinetEnvelopeWidth + SITE_CONFIG.cabinetSpacing;
export const lastBessX = firstBessX + (SITE_CONFIG.cabinetCount - 1) * bessStep;
export const sceneCenterX = (highVoltageX - SITE_CONFIG.highVoltageWidth / 2
  + lastBessX + SITE_CONFIG.cabinetEnvelopeWidth / 2) / 2;
