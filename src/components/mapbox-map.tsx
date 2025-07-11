'use client';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, {Marker} from 'react-map-gl';

interface MapboxMapProps {
    lat: number;
    lng: number;
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const MapboxMap = ({ lat, lng }: MapboxMapProps) => {
    
    if (!MAPBOX_TOKEN) {
        return (
            <div className="h-full w-full bg-muted rounded-lg flex items-center justify-center text-center p-4">
                <div className="text-muted-foreground">
                    <p className="font-semibold">Map is not configured.</p>
                    <p className="text-sm">Please add your Mapbox Access Token to a `.env.local` file in the root of your project:</p>
                    <code className="text-xs bg-gray-200 p-1 rounded mt-2 block">NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN='your_token_here'</code>
                </div>
            </div>
        )
    }

    return (
        <Map
            initialViewState={{
                longitude: lng,
                latitude: lat,
                zoom: 13
            }}
            style={{ width: '100%', height: '100%', borderRadius: '0.5rem' }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
        >
            <Marker longitude={lng} latitude={lat} color="hsl(var(--primary))" />
        </Map>
    );
};

export default MapboxMap;