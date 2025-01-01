'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store'
import 'leaflet/dist/leaflet.css'

// Sample bank data - in a real app, this would come from an API
const banks = [
  {
    id: '1',
    name: 'Global Bank HQ',
    location: [51.505, -0.09] as [number, number],
    address: '123 Financial St, London',
    services: ['Personal Banking', 'Business Banking', 'Investments'],
  },
  {
    id: '2',
    name: 'City Bank Branch',
    location: [51.51, -0.1] as [number, number],
    address: '456 Banking Ave, London',
    services: ['Personal Banking', 'Mortgages'],
  },
]

export default function BankAtlas() {
  const { selectedBank, setSelectedBank } = useStore()

  useEffect(() => {
    // Load dynamic imports for Leaflet
    require('leaflet/dist/leaflet.css')
    const L = require('leaflet')
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    })
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Bank Atlas</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="h-[600px] rounded-lg overflow-hidden border">
            <MapContainer
              center={[51.505, -0.09]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {banks.map((bank) => (
                <Marker
                  key={bank.id}
                  position={bank.location}
                  eventHandlers={{
                    click: () => setSelectedBank(bank),
                  }}
                >
                  <Popup>{bank.name}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedBank ? selectedBank.name : 'Select a Bank'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedBank ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {banks.find((b) => b.id === selectedBank.id)?.address}
                  </p>
                  <div>
                    <h3 className="font-semibold mb-2">Available Services</h3>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {banks
                        .find((b) => b.id === selectedBank.id)
                        ?.services.map((service) => (
                          <li key={service}>{service}</li>
                        ))}
                    </ul>
                  </div>
                  <Button className="w-full">Schedule Appointment</Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Click on a bank marker on the map to view details
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
