'use client';

import useStepper from "../../hooks/useStepper";
import { ReactElement, useEffect, useId, useState } from "react";
import { PersonalDetailsStep } from "./steps/PersonalDetailsStep";
import { FinancialDetailsStep } from "./steps/FinancialDetailsStep";
import { ConfirmStep } from "./steps/ConfirmStep";
import SignStep from "./steps/SignStep";
import WelcomeView from "@/components/Welcome";
import { useSearchParams } from "next/navigation";
import { RoomModel } from "@/shared/types";


export default function BookingPage() {

  const onStepComplete = () => next();
  const onBookingComplete = () => setComplete(true);

  const [room, setRoom] = useState<RoomModel>();
  const [complete, setComplete] = useState(false);
  const [leaseId] = useState(crypto.randomUUID());

  const steps: ReactElement[] = [
    <PersonalDetailsStep key='step_info' stepComplete={ onStepComplete } />,
    <FinancialDetailsStep key='step_confirm' stepComplete={ onStepComplete } />,
    <ConfirmStep key='confirm_step' stepComplete={ onStepComplete } leaseId={leaseId} room={room}/>,
    <SignStep key='sign_step' stepComplete={ onBookingComplete } leaseId={leaseId} />
  ]

  const { prev, next, stepIdx } = useStepper(steps.length);
  const searchParams = useSearchParams();

  useEffect(() => {
  
    const roomId = searchParams.get('room_id') ?? '';


    const fetchData = async () => {
      try {
        const res = await fetch(`/api/rooms/${ roomId }`);
        const data: RoomModel = await res.json();
        setRoom(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  if(room === undefined) return (<div>Loading...</div>)
  if (complete) return <WelcomeView room={room}/>

  return (
    <div>
      <div className="flex flex-row justify-center gap-4 mb-6">
        { steps.map((step, idx) => (
          <div key={ idx }
            className={ `flex flex-row items-center justify-center 
            rounded-full h-10 w-10 text-white 
            ${ idx === stepIdx ? 'bg-black' : 'bg-neutral-300' }` }>
            { idx + 1 }
          </div>
        )) }
      </div>

      <div className="flex flex-row justify-center">
        <div className="w-[600px] rounded-lg border-2 border-neutral-200">
          <div className="flex flex-row p-4 bg-white text-center rounded-t-lg">
            { stepIdx !== 0 && <button type="button" className="text-neutral-400" onClick={ prev }>Back</button> }
            <div className="grow text-center">🎉 Apply now for special discounts</div>
          </div>
          <div className="bg-neutral-50">
            { steps[stepIdx] }
          </div>
        </div>
      </div>
    </div>
  )
}