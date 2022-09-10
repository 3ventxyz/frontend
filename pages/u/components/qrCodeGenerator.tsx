import React, { useState } from 'react'
import QRCode from 'qrcode.react'

export default function QRCodeGenerator({ uid }: { uid: string }) {
  const qrCode = (
    <QRCode
      id="qrCodeId"
      size={300}
      value={`https://www.3vent.xyz/u/${uid}`}
      bgColor="white"
      fgColor="black"
      level="H"
      imageSettings={{
        src: 'assets/logo-icon.svg',
        excavate: true,
        width: 400 * 0.1,
        height: 400 * 0.1
      }}
    />
  )
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="grow"></div>
      <h3>This is your QR code.</h3>
      <div className="grow"></div>
      <div className="mb-[10px] flex h-[315px] w-[315px] items-center justify-center rounded-xl bg-gray-200 shadow-xl">
        {qrCode}
      </div>
      <p className="text-red-400">Please DO NOT share this to the public.</p>
      <div className="grow"></div>
    </div>
  )
}
