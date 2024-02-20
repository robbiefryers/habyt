import Image from 'next/image';
import Link from 'next/link';
import { RoomModel } from '@/shared/types';



export const RoomCard = ({ room }: { room: RoomModel }) => (

  <div className="bg-neutral-50 border-2 border-neutral-200 rounded-lg">

    <div className="p-4">

      <div className="flex flex-col mb-2">
        <div className="text-2xl font-bold">{ room.marketingName }</div>
        <div className="text-sm text-neutral-500">{ room.address.streetAddress }, { room.address.city }</div>
      </div>

      <div className="flex flex-row gap-8 w-[700px]">
        <div className="flex-none p-0 h-52 w-80 relative">
          <Image
            src={ room.images[0].url }
            layout="fill"
            objectFit="cover"
            className="rounded-md"
            alt="Photo of apartment"
          />
        </div>
        <div className="grow text-sm">
          <div className='uppercase text-neutral-400 mb-2'>features</div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div>
              - { room.occupancyType === 'SHARED' ? 'Private room' : 'Private apartment' }
            </div>
            <div>
              - { room.listingSqft } sqft
            </div>
            <div>
              - { room.bedrooms } bedrooms
            </div>
          </div>

          <div className='uppercase text-neutral-400 mb-2'>amenities</div>
          <div className="grid grid-cols-2 gap-2">
            { room.amenities.map(amenity => (
              <div key={ amenity }>
                - { amenity }
              </div>
            )) }
          </div>
        </div>
      </div>
    </div>

    <div className="flex flex-row justify-between p-4 bg-white rounded-b-lg">

      <div className="text-sm">
        <div className="text-neutral-400 uppercase">move in</div>
        <div>{ room.availableDate }</div>
      </div>
      <div className="text-sm">
        <div className="text-neutral-400 uppercase">lease</div>
        <div>{ room.pricing.minimumStay } Mo+</div>
      </div>
      <div className="text-sm">
        <div className="text-neutral-400 uppercase">starts at</div>
        <div>${ Math.floor(room.pricing.minimumPrice / 100) }</div>
      </div>
      <div>
        <Link className="black-btn" href={ `booking/?room_id=${ room.id }` }>
          Book this place
        </Link>
      </div>

    </div>
  </div>
)