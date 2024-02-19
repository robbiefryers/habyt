import { config } from "@/config";
import { LeaseModel } from "@/shared/types";
import fs from 'fs';


/**
 * @description Handles a PATCH request 'sign' a lease agreement. This 
 * replaces an API call to DocuSign with an update to the fs for demo purposes.
 * In reality this would make an API call to DocuSign and verify the response before
 * updating our db
 */
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }) {

  try {
    const path = `${ config.DUMMY_DB_PATH }/lease_docs.json`;

    const allLeases: LeaseModel[] = JSON.parse(fs.readFileSync(path, 'utf-8'));
    const leaseToSign = allLeases.find(lease => lease.id === params.id);

    if (leaseToSign === undefined) {
      return new Response('Lease not found', {
        status: 400
      })
    }

    // make another call to DocuSign and verify the signed state
    leaseToSign.signed = true

    fs.writeFileSync(path, JSON.stringify(allLeases, null, 2), 'utf-8');

    return Response.json({message: 'Lease signed successfully'});

  } catch (e) {
    return new Response('Unable to create draft lease', {
      status: 500
    })
  }
}