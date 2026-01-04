import { ArrowRight, ArrowLeft, MapPin, Navigation, Check } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { KYCData } from '../KYCWizard';

interface ResidenceVerificationProps {
  data: KYCData;
  onNext: (data: Partial<KYCData>) => void;
  onBack: () => void;
}

export function ResidenceVerification({ data, onNext, onBack }: ResidenceVerificationProps) {
  const [landlordName, setLandlordName] = useState(data.landlordName || 'Hari Prasad Sharma');
  const [landlordPhone, setLandlordPhone] = useState(data.landlordPhone || '9851234567');
  const [landmark, setLandmark] = useState(data.landmark || 'Near Garden of Dreams');
  const [distanceFromLandmark, setDistanceFromLandmark] = useState(data.distanceFromLandmark || '50 meters');
  const [ownershipType, setOwnershipType] = useState<'rented' | 'owned'>(data.ownershipType || 'rented');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    data.residenceLocation || { lat: 27.7172, lng: 85.3240 } // Default: Kathmandu center
  );
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationConfirmed, setLocationConfirmed] = useState(!!data.residenceLocation);
  const [mapError, setMapError] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Initialize Google Maps
  useEffect(() => {
    // Check if already loaded
    if (window.google?.maps) {
      setIsMapLoaded(true);
      initMap();
      return;
    }

    // Create callback for when Maps loads
    (window as any).initGoogleMaps = () => {
      setIsMapLoaded(true);
      initMap();
    };

    // Load Google Maps script with async
    const script = document.createElement('script');
    // NOTE: Replace YOUR_API_KEY_HERE with your actual Google Maps API key
    // Get one at: https://console.cloud.google.com/google/maps-apis
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&callback=initGoogleMaps&libraries=marker&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      setMapError('Failed to load Google Maps. Please check your internet connection and API key.');
    };
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.head.removeChild(script);
      }
      delete (window as any).initGoogleMaps;
    };
  }, []);

  const initMap = () => {
    if (!mapRef.current || !location || !window.google?.maps) return;

    try {
      const mapOptions: google.maps.MapOptions = {
        center: location,
        zoom: 15,
        mapId: 'DEMO_MAP_ID', // Required for AdvancedMarkerElement
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      };

      const map = new google.maps.Map(mapRef.current, mapOptions);
      googleMapRef.current = map;

      // Add marker using AdvancedMarkerElement
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: location,
        map: map,
        gmpDraggable: true,
        title: 'Your Residence',
      });
      markerRef.current = marker;

      // Update location when marker is dragged
      marker.addListener('dragend', () => {
        const position = marker.position as google.maps.LatLng;
        if (position) {
          setLocation({ lat: position.lat, lng: position.lng });
          setLocationConfirmed(false);
        }
      });

      // Allow clicking on map to set location
      map.addListener('click', (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          const newLocation = { lat: e.latLng.lat(), lng: e.latLng.lng() };
          setLocation(newLocation);
          marker.position = newLocation;
          map.panTo(newLocation);
          setLocationConfirmed(false);
        }
      });
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Failed to initialize map. Please refresh the page.');
    }
  };

  // Trigger map initialization when loaded
  useEffect(() => {
    if (isMapLoaded) {
      initMap();
    }
  }, [isMapLoaded]);

  // Update marker when location changes
  useEffect(() => {
    if (markerRef.current && location && googleMapRef.current) {
      markerRef.current.position = location;
      googleMapRef.current.panTo(location);
    }
  }, [location]);

  const handleGetCurrentLocation = () => {
    setIsLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(newLocation);
          setLocationConfirmed(false);
          setIsLoadingLocation(false);
          
          if (googleMapRef.current) {
            googleMapRef.current.setCenter(newLocation);
            googleMapRef.current.setZoom(18);
          }
          if (markerRef.current) {
            markerRef.current.setPosition(newLocation);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your current location. Please ensure location permissions are enabled.');
          setIsLoadingLocation(false);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
      setIsLoadingLocation(false);
    }
  };

  const handleConfirmLocation = () => {
    setLocationConfirmed(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!locationConfirmed) {
      alert('Please confirm your residence location on the map before continuing.');
      return;
    }

    onNext({
      landlordName,
      landlordPhone,
      landmark,
      distanceFromLandmark,
      ownershipType,
      residenceLocation: location,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-8">
      <div className="mb-6">
        <h2 className="text-gray-900 mb-2">Residence Verification</h2>
        <p className="text-sm text-gray-600">निवास प्रमाणीकरण - Verify your residential address and location</p>
      </div>

      {/* Ownership Type */}
      <div className="mb-6">
        <label className="block text-sm text-gray-700 mb-3">
          Residence Ownership Type <span className="text-red-600">*</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setOwnershipType('rented')}
            className={`p-4 border-2 rounded-lg transition-all ${
              ownershipType === 'rented'
                ? 'border-emerald-600 bg-emerald-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-center">
              <p className="text-gray-900">Rented</p>
              <p className="text-xs text-gray-600 mt-1">भाडामा लिएको</p>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setOwnershipType('owned')}
            className={`p-4 border-2 rounded-lg transition-all ${
              ownershipType === 'owned'
                ? 'border-emerald-600 bg-emerald-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-center">
              <p className="text-gray-900">Self-Owned</p>
              <p className="text-xs text-gray-600 mt-1">आफ्नै</p>
            </div>
          </button>
        </div>
      </div>

      {/* Landlord Details - Only show if rented */}
      {ownershipType === 'rented' && (
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm text-gray-700 mb-2" htmlFor="landlordName">
              Landlord Name / घर धनीको नाम <span className="text-red-600">*</span>
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              id="landlordName"
              type="text"
              required={ownershipType === 'rented'}
              value={landlordName}
              onChange={(e) => setLandlordName(e.target.value)}
              placeholder="Enter landlord full name"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2" htmlFor="landlordPhone">
              Landlord Phone Number / घर धनीको फोन <span className="text-red-600">*</span>
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              id="landlordPhone"
              type="tel"
              required={ownershipType === 'rented'}
              value={landlordPhone}
              onChange={(e) => setLandlordPhone(e.target.value)}
              placeholder="98XXXXXXXX"
            />
          </div>
        </div>
      )}

      {/* Location Details */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm text-gray-700 mb-2" htmlFor="landmark">
            Nearest Landmark / नजिकको चिन्ह <span className="text-red-600">*</span>
          </label>
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            id="landmark"
            type="text"
            required
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            placeholder="e.g., Garden of Dreams, School, Temple"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-2" htmlFor="distanceFromLandmark">
            Distance from Landmark / चिन्हबाट दूरी <span className="text-red-600">*</span>
          </label>
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            id="distanceFromLandmark"
            type="text"
            required
            value={distanceFromLandmark}
            onChange={(e) => setDistanceFromLandmark(e.target.value)}
            placeholder="e.g., 50 meters, 2 minutes walk"
          />
        </div>
      </div>

      {/* Map Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm text-gray-700">
            Pinpoint Your Exact Location / आफ्नो ठेगाना नक्सामा देखाउनुहोस् <span className="text-red-600">*</span>
          </label>
          <button
            type="button"
            onClick={handleGetCurrentLocation}
            disabled={isLoadingLocation}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Navigation className="w-4 h-4" />
            {isLoadingLocation ? 'Getting Location...' : 'Use Current Location'}
          </button>
        </div>

        <div className="bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-300 mb-3" style={{ height: '400px' }}>
          {/* Map Container */}
          <div ref={mapRef} className="w-full h-full" />
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-3">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-blue-900 mb-2">
                <strong>How to use the map:</strong>
              </p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Click "Use Current Location" to auto-detect your position</li>
                <li>• Drag the red marker to your exact residence location</li>
                <li>• Or click anywhere on the map to place the marker</li>
                <li>• Zoom in for better accuracy using the controls</li>
                <li>• Click "Confirm Location" when the marker is correctly placed</li>
              </ul>
            </div>
          </div>
        </div>

        {location && (
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4 mb-3">
            <div>
              <p className="text-sm text-gray-600">Selected Coordinates:</p>
              <p className="text-sm text-gray-900">
                Latitude: {location.lat.toFixed(6)}, Longitude: {location.lng.toFixed(6)}
              </p>
            </div>
            {!locationConfirmed ? (
              <button
                type="button"
                onClick={handleConfirmLocation}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm"
              >
                <Check className="w-4 h-4" />
                Confirm Location
              </button>
            ) : (
              <div className="flex items-center gap-2 text-green-600">
                <Check className="w-5 h-5" />
                <span className="text-sm">Location Confirmed</span>
              </div>
            )}
          </div>
        )}

        {!locationConfirmed && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-sm text-amber-800">
              ⚠️ Please confirm your location before continuing to the next step
            </p>
          </div>
        )}
      </div>

      {/* Info Note */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> Accurate location data helps us verify your residence and may be used for 
          physical verification by bank officials. This information is kept confidential and used only for KYC purposes.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          Continue <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}