import { GoogleMap, MarkerF , useJsApiLoader} from '@react-google-maps/api';

const apiKey:any = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;
const icon = '/hexadash-nextjs/img/map/mpc.png';

interface GoogleMapsProps {
  latitude: number;
  longitude: number;
  google?: any;
  width?: string;
  height?: string;
  zoom?: number;
  mapStyles?: any;
  place?: any;
  styles?: any;
  infoWindow?: any;
}

const GoogleMaps = ( property:GoogleMapsProps ) => {
  const { latitude, longitude, google, width, height, zoom, mapStyles, place, styles, infoWindow } = property;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  })

  const containerStyle = {
    width: '100%',
    height: '100%'
  };

  return (
    <div className="relative" style={{ height: '400px', width: '100%' }}>
      {isLoaded ? 
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: latitude, lng: longitude }}
          zoom={zoom ? zoom : 2}
        >
          {place !== undefined ? (
            place.map((item:any) => {
              return (
                <MarkerF
                  key={item.id}
                  position={{ lat: item.latitude, lng: item.longitude }}
                  // @ts-ignore
                  icon={icon}
                />
              );
            })
          ) : (
            <MarkerF
              // onClick={onMarkerClick}
              position={{ lat: latitude, lng: longitude }}
              // @ts-ignore
              icon={icon}
            />
          )}
        </GoogleMap> : 
        <></>
      }
    </div>
  );
};

export { GoogleMaps };
