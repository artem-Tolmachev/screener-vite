 interface BitmapPositionLength {
	/** coordinate for use with a bitmap rendering scope */
	position: number;
	/** length for use with a bitmap rendering scope */
	length: number;
}

export function fullBarWidth(
	xMedia: number,
	halfBarSpacingMedia: number,
	horizontalPixelRatio: number
): BitmapPositionLength {
	const fullWidthLeftMedia = xMedia - halfBarSpacingMedia;
	const fullWidthRightMedia = xMedia + halfBarSpacingMedia;
	const fullWidthLeftBitmap = Math.round(
		fullWidthLeftMedia * horizontalPixelRatio
	);
	const fullWidthRightBitmap = Math.round(
		fullWidthRightMedia * horizontalPixelRatio
	);
	const fullWidthBitmap = fullWidthRightBitmap - fullWidthLeftBitmap;
	return {
		position: fullWidthLeftBitmap,
		length: fullWidthBitmap,
	};
}