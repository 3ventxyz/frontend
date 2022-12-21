import React from 'react'

/**
 *
 * check the figma
 */
export default function CreateNew() {
  return (
    <div className="flex w-full flex-col items-center justify-start">
      <div className="w-full max-w-[600px] bg-green-100">
        <h3>Create Event</h3>

        <hr />
        <div id="test" className="flex">
          <div className="flex flex-col">
            <div id="step-1">
              <h4>1.- Event title, location and date</h4>
              <hr />
              <div className="flex flex-col"></div>
            </div>
            <div id="step-2">
              <h4>2.- Description and max attendee cap</h4>
              <hr />
              <div className="flex flex-col"></div>
            </div>
            <div id="step-3">
              <h4>3.- Landing portrait and ticket image</h4>
              <hr />
              <div className="flex flex-col"></div>
            </div>
          </div>
        </div>

        <div
          id="create-event-steps"
          className="fixed right-[350px] flex flex-col"
        >
          <div>step 1</div>
          <div>step 2</div>
          <div>step 3</div>
        </div>
      </div>
    </div>
  )
}
