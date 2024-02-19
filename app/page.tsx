import { RoomCard } from '@/components/RoomCard';
import { config } from '@/config';
import { RoomModel } from '@/shared/types';
import fs from 'fs';

async function getData(): Promise<RoomModel[]> {
  
  const path = `${ config.DUMMY_DB_PATH }/rooms.json`;

  // Try to read current leases from dummy_db
  let rooms: RoomModel[] = []

  if(fs.existsSync(path)) {
    rooms = JSON.parse(fs.readFileSync(path, 'utf-8'));
    return rooms;
  }
  else {
    throw new Error('Failed to fetch data')
  }
}


export default async function RoomsPage() {

  const data = await getData();
  return (
    <div className="p-4">
      <div className="text-center text-2xl mb-6">Rooms</div>
      <div className="flex flex-wrap gap-8 justify-center">
        { data.map(room => <RoomCard key={ room.id } room={ room } />) }
      </div>
    </div>
  )
}