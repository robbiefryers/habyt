import { config } from "@/config";
import { RoomModel } from "@/shared/types";
import fs from 'fs';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {

  try {
    const path = `${ config.DUMMY_DB_PATH }/rooms.json`;
    const allRooms: RoomModel[] = JSON.parse(fs.readFileSync(path, 'utf-8'));

    const room = allRooms.find(room => room.id === Number(params.id));

    if (room === undefined) {
      return new Response('Room not found', {
        status: 400
      })
    }

    return Response.json(room);

  } catch (e) {
    return new Response('Unable to create draft lease', {
      status: 500
    })
  }
}