import { writable } from 'svelte/store';


interface IMarker {
    id: number;
    type: string;
    x, y: number;
    label: string;

    content?: string;
}

const storage = JSON.parse(localStorage.markers ?? '[]');

export const markers = writable<IMarker[]>(storage ?? []);

markers.subscribe(markers => localStorage.setItem('markers', JSON.stringify(markers)));

export const addGameMarker = (x: number,y: number, name: string, content: string = null) => {
    markers.update(markers => {
        markers.push({
            id: markers.length,
            type: 'game',
            x:x, 
            y:y,
            label: name,

            content,
        });
        return markers;
    });
}

export const addMarker = (lat: number, lon: number, name: string, content: string = null) => {
    markers.update(markers => {
        markers.push({
            id: markers.length,
            type: 'normal',
            x: lon, 
            y: lat,
            label: name,

            content,
        });
        return markers;
    });
}

export const removeMarker = (id: number) => {
    markers.update(markers => {
        const index = markers.findIndex(m => m.id === id);
        if (index > -1) {
            markers.splice(index, 1);
        }
        return markers;
    });
}


// debug marker
export const debugMarker = writable<[number,number]>([0,0]);
export const setDebugMarker = (x,y) => debugMarker.update(v => [x,y]);