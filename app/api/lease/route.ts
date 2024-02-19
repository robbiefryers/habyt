import { config } from "@/config";
import { LeaseModel } from "@/shared/types";
import fs from 'fs';

/**
 * @description Handles a POST request to draft a new lease agreement. This 
 * replaces an API call to DocuSign with a write to the fs for demo purposes.
 * In reality this would likely verify the API call to DocuSign and store the 
 * docId and requesterId in our db ready for a lookup during the signing step
 */
export async function POST(request: Request) {

  try {
    const path = `${ config.DUMMY_DB_PATH }/lease_docs.json`;

    // Try to read current leases from dummy_db
    let allLeases: LeaseModel[] = []

    if(fs.existsSync(path)) {
      allLeases = JSON.parse(fs.readFileSync(path, 'utf-8'))
    }
    
    const newLease = await request.json() as LeaseModel;
    allLeases.push(newLease);
    
    // Update the dummy_db
    fs.writeFileSync(path, JSON.stringify(allLeases, null, 2), 'utf-8');
    
    return Response.json(allLeases)


  } catch (e) {
    return new Response('Unable to create draft lease', {
      status: 500
    })
  }

}