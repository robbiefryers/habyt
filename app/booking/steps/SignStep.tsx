'use client';

import { useEffect, useState } from "react";
import { LeaseModel } from "@/shared/types";
import { Button } from "@/components/Button";


type Props = {
  stepComplete: () => void,
  leaseId: string
}
export default function SignStep({ stepComplete, leaseId }: Props) {

  const [data, setData] = useState<LeaseModel>();
  const [signError, setSignError] = useState<string>();

  useEffect(() => {
    console.log(leaseId);
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/lease/${ leaseId }`);
        const data: LeaseModel = await res.json();
        setData(data);
      } catch (error) {
        setSignError('Unable to get lease')
      }
    };

    fetchData();
  }, []);


  const handleSignature = async () => {
    try {
      await fetch(`/api/lease/sign/${ leaseId }`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({})
      })

      stepComplete();

    } catch (e) {
      setSignError('unable to sign lease')
    }
  }

  if (data === undefined) return <p>Loading lease...</p>

  return (
    <div className="flex flex-col gap-2 justify-center p-4 h-[600px]">
      <div className="text-center text-xl uppercase">lease agreement between</div>
      <div className="text-center text-lg">{ data.first_name } { data.last_name }</div>
      <div className="text-center text-lg">and</div>
      <div className="text-center text-lg">Habyt Living Inc.</div>
      <Button label="Sign Contract"  disabled={ false } on_click={ handleSignature } />
      { signError && <small className="text-xs text-red-600">{ signError }</small> }
    </div>
  )

}