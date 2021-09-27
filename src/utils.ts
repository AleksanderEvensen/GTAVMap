// The 0, 0 point in gta
const mapCenter = [-119.43, 58.84];
// How mouch latitude and longitude is incremented by pr 100 gta units
const latPr100 = 1.421;

export function gameToMap(x,y) {
    return [mapCenter[0] + latPr100/100 * y, mapCenter[1] + latPr100 / 100 * x];
}

export function mapToGame(lat, lon) {
    
}


export {mapCenter, latPr100};