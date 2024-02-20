'use client';

import { useEffect, useState } from "react";
import { LeaseModel } from "@/shared/types";
import { Button } from "@/components/Button";
import { ErrorLabel } from "@/components/ErrorLabel";


type Props = {
  stepComplete: () => void,
  leaseId: string
}
export default function SignStep({ stepComplete, leaseId }: Props) {

  const [lease, setLease] = useState<LeaseModel>();
  const [leaseError, setLeaseError] = useState<string>();
  const [signError, setSignError] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/lease/${ leaseId }`);
      if(res.ok) {
        const lease: LeaseModel = await res.json();
        setLease(lease);
      }
      else {
        const errorMsg = await res.text();
        setLeaseError(errorMsg)
      }
    };
    fetchData();
  }, []);


  const handleSignature = async () => {
    const res = await fetch(`/api/lease/sign/${ leaseId }`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    })

    if (res.ok) {
      stepComplete();
    }
    else {
      const errorMsg = await res.text();
      setSignError(errorMsg)
    }
  }

  if (leaseError) return <div>{ leaseError }</div>
  else if (lease === undefined) return (<div>Loading lease...</div>)

  return (
    <div className="flex flex-col gap-2 justify-center p-4 h-[600px]">
      <div className="text-center text-xl uppercase">lease agreement between</div>
      <div className="text-center text-lg">{ lease.first_name } { lease.last_name }</div>
      <div className="text-center text-lg">and</div>
      <div className="text-center text-lg">Habyt Living Inc.</div>
      <Button label="Sign Contract" disabled={ false } on_click={ handleSignature } />
      <ErrorLabel error={ signError } />
    </div>
  )

}