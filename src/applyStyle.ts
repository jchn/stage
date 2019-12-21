import { Style } from "./types";

function applyStyle(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  style: Style
) {
  if (style.fillStyle !== undefined) ctx.fillStyle = style.fillStyle;
  if (style.strokeStyle !== undefined) ctx.strokeStyle = style.strokeStyle;
  if (style.lineWidth !== undefined) ctx.lineWidth = style.lineWidth;
  if (style.lineCap !== undefined) ctx.lineCap = style.lineCap;
  if (style.shadowColor !== undefined) ctx.shadowColor = style.shadowColor;
  if (style.shadowBlur !== undefined) ctx.shadowBlur = style.shadowBlur;
  if (style.shadowOffsetX !== undefined)
    ctx.shadowOffsetX = style.shadowOffsetX;
  if (style.shadowOffsetY !== undefined)
    ctx.shadowOffsetY = style.shadowOffsetY;
  if (style.lineDash !== undefined) ctx.setLineDash(style.lineDash);
  if (style.lineDashOffset !== undefined)
    ctx.lineDashOffset = style.lineDashOffset;
  if (style.lineJoin !== undefined) ctx.lineJoin = style.lineJoin;
  if (style.miterLimit !== undefined) ctx.miterLimit = style.miterLimit;
  if (style.globalAlpha !== undefined) ctx.globalAlpha = style.globalAlpha;
  if (style.filter !== undefined) ctx.filter = style.filter;
  if (style.imageSmoothingEnabled !== undefined)
    ctx.imageSmoothingEnabled = style.imageSmoothingEnabled;
  if (style.imageSmoothingQuality !== undefined)
    ctx.imageSmoothingQuality = style.imageSmoothingQuality;
  if (style.globalCompositeOperation !== undefined)
    ctx.globalCompositeOperation = style.globalCompositeOperation;
}

export default applyStyle;
