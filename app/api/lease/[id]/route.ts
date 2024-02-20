import { config } from "@/config";
import { LeaseModel } from "@/shared/types";
import fs from 'fs';


/**
 * 
 * @description Handles a GET request to fetch a lease agreement. This 
 * replaces an API call to DocuSign to with a read to the fs for demo purposes.
 * 
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {

  try {
    const path = `${ config.DUMMY_DB_PATH }/lease_docs.json`;
    const allLeases: LeaseModel[] = JSON.parse(fs.readFileSync(path, 'utf-8'));

    const lease = allLeases.find(lease => lease.id === params.id);

    if (lease === undefined) {
      return new Response('Lease not found', {
        status: 400
      })
    }
    return Response.json(lease);

  } catch (e) {
    return new Response('Unable to create draft lease', {
      status: 500
    })
  }
}