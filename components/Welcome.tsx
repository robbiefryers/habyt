"use client";

import { RoomModel } from '@/shared/types';
import { useWindowSize } from '@uidotdev/usehooks'
import Confetti from 'react-confetti'

type Props = {
  room: RoomModel
}

export default function WelcomeView({ room }: Props) {

  const { width, height } = useWindowSize()

  return (
    <>
      <Confetti
        recycle={ false }
        width={ width! }
        height={ height! }
      />

      <div className="flex flex-col justify-center gap-6 h-screen">

        <div className="text-3xl text-center">Apartment booked!</div>
        <div className="text-2xl text-center">Your new home is at: {room.address.fullAddress} </div>
        <div className="text-xl text-center">We will verify all your details and you will hear from us soon. Your keys will be with you in no time!</div>

      </div>
    </>

  )
}