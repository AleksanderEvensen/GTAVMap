// The 0, 0 point in gta
const mapCenter:[number, number] = [-119.43, 58.84];
// How mouch latitude and longitude is incremented by pr 100 gta units
const latPr100 = 1.421;

export function gameToMap(x,y):[number, number] {
    return [mapCenter[0] + latPr100/100 * y, mapCenter[1] + latPr100 / 100 * x];
}

export function mapToGame(lat, lon):[number, number] {
    return [(lat-mapCenter[0]) / (latPr100/100), (lon-mapCenter[1]) / (latPr100/100)];
}

export {mapCenter, latPr100};