'use client';

import { SubmitButton } from "@/components/SubmitButton";
import { bookingConfirmSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { LeaseModel, RoomModel } from "@/shared/types";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ErrorLabel } from "@/components/ErrorLabel";
type FormData = z.infer<typeof bookingConfirmSchema>;


type Props = {
  stepComplete: () => void,
  room: RoomModel | undefined,
  leaseId: string
}

export function ConfirmStep({ stepComplete, room, leaseId }: Props) {

  const searchParams = useSearchParams();
  const [leaseError, setLeaseError] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(bookingConfirmSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {

    const req: LeaseModel = {
      id: leaseId,
      first_name: searchParams.get('first_name')!,
      last_name: searchParams.get('last_name')!,
      email: searchParams.get('email')!,
      room_id: searchParams.get('room_id')!,
      move_in: searchParams.get('move_in')!,
      signed: false
    }

    // Make an API call that will 'call' DocuSign
    const res = await fetch(`/api/lease/`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req)
    });

    if (res.ok) {
      stepComplete();
    }
    else {
      const errorMsg = await res.text();
      setLeaseError(errorMsg)
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-row">
          <div className="grow">
            <div className="font-bold text-lg">Monthly rent</div>
            <div>Incl. furniture, utilities and Wi-Fi</div>
          </div>
          <div> { room!.currencyCode } { room!.pricing.minimumPrice / 100 }</div>
        </div>

        <div className="flex flex-row">
          <div className="grow">
            <div className="font-bold text-lg">Deposit</div>
            <div>Charged only at the signature of the contract</div>
          </div>
          {/* Assume deposit is 1 months rent */ }
          <div> { room!.currencyCode } { room!.pricing.minimumPrice / 100 } </div>
        </div>

        <div className="flex flex-row">
          <div className="grow">
            <div className="font-bold text-lg">Minimum stay</div>
            <div>You agree to pay full months rent for { room!.pricing.minimumStay } months</div>
          </div>
          <div>
            { room?.pricing.minimumStay } months
          </div>
        </div>
      </div>

      <form onSubmit={ handleSubmit(onSubmit) } onError={ (e) => console.log(e) }>

        <div className="flex flex-row items-start p-4 gap-4">
          <div>
            <input type="checkbox" { ...register("accept_terms") } />
          </div>

          <div className="grow">
            <p>
              I agree with Habyts <a className="underline text-neutral-500" href="#">Terms of Service</a> and <a className="underline text-neutral-500" href="#">Privacy Policy</a>
            </p>
            <ErrorLabel error={ errors.accept_terms?.message } />
          </div>
        </div>

        <div className="p-4">
          <SubmitButton label="Next" disabled={ false } />
          <ErrorLabel error={ leaseError } />
        </div>

      </form>
    </div>

  )
}