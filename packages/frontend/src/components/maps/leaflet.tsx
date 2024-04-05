import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.css?url=false';
import L from 'leaflet';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/hexadash-nextjs/img/map/marker-icon.png',
  iconUrl: '/hexadash-nextjs/img/map/marker-icon.png',
  shadowUrl: '/hexadash-nextjs/img/map/marker-shadow.png',
});

interface LeafletMapBasicProps {
  latitude: number;
  longitude: number;
  width: string;
  height: string;
  zoom: number;
}

function LeafletMapBasic(props:LeafletMapBasicProps) {
  const { latitude, longitude, width, height, zoom } = props;

  const position:any = [latitude, longitude];

  return (
    <>
      <MapContainer center={position} zoom={zoom} className="relative [&>.leaflet-map-pane]:w-full [&>.leaflet-map-pane]:h-full" style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup.
            <br />
            Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}

function LeafletMapMultipleIcon(props:any) {
  const { latitude, longitude, width, height, zoom, data } = props;

  const position:any = [latitude, longitude];
  return (
    <div>
      <MapContainer center={position} zoom={zoom} className="relative [&>.leaflet-map-pane]:w-full [&>.leaflet-map-pane]:h-full" style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {data.map((item:any) => {
          return (
            <Marker key={item.id} position={item.position}>
              <Popup>
                A pretty CSS3 popup.
                <br />
                Easily customizable.
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

function LeafletMapCustomIcon(props:any) {
  const { latitude, longitude, width, height, zoom, faIcon } = props;
  const fontAwesomeIcon = L.divIcon({
    html: `<i style="color: #2880CA" class="${faIcon}"></i>`,
    iconSize: [20, 20],
    className: 'myDivIcon',
  });

  const position:any = [latitude, longitude];
  return (
    <div>
      <MapContainer center={position} zoom={zoom} className="relative" style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={fontAwesomeIcon}>
          <Popup>
            A pretty CSS3 popup.
            <br />
            Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

function LeafletMarkerCluster(props:any) {
  const { latitude, longitude, width, height, zoom, data } = props;

  const position:any = [latitude, longitude];
  return (
    <div>
      <MapContainer center={position} zoom={zoom} maxZoom={18} className="markercluster-map relative" style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <>
          {data.map((item:any) => {
            return (
              <Marker key={item.id} position={item.position}>
                <Popup>
                  A pretty CSS3 popup.
                  <br />
                  Easily customizable.
                </Popup>
              </Marker>
            );
          })}
        </>
      </MapContainer>
    </div>
  );
}

export { LeafletMapBasic, LeafletMapMultipleIcon, LeafletMapCustomIcon, LeafletMarkerCluster };
