import { LatLng } from "leaflet";
// Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

type Proposal = {
  id: bigint;
  name: string;
  description: string;
  location: string;
  url: string;
  fundingGoal: bigint;
  fundsRaised: bigint;
};

type MapComponentProps = {
  proposals?: ReadonlyArray<Proposal>;
};

const MapComponent: React.FC<MapComponentProps> = ({ proposals }) => {
  const position = new LatLng(41.89 as number, 12.49 as number); // default latitude and longitude

  const markers =
    proposals?.map(proposal => {
      const [lat, lng] = proposal.location.replaceAll(" ", "").split(",").map(Number);

      return {
        id: proposal.id,
        latitude: lat || 0,
        longitude: lng || 0,
        name: proposal.name,
        description: proposal.description,
        url: proposal.url,
        fundingGoal: proposal.fundingGoal,
        fundsRaised: proposal.fundsRaised,
      };
    }) ?? [];

  return (
    <MapContainer center={position} zoom={13} style={{ width: "100%", height: "100%" }}>
      {markers.map(marker => (
        <Marker key={marker.id} position={new LatLng(marker.latitude, marker.longitude)}>
          <Popup>
            <h1>{marker.name}</h1>
            <p>{marker.description}</p>
            <img src={marker.url} alt="proposal image" />
            <p>
              Funding Goal: {marker.fundingGoal.toString()}
              <br />
              Funding Raised: {marker.fundsRaised.toString()}
            </p>
          </Popup>
        </Marker>
      ))}

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
};

export default MapComponent;
