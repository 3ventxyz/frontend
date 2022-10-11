export default function EmulatorLogin() {
  return (
    <div className="mx-[150px]">
      <h1>Firebase emulators not running.</h1>
      Hi, I see that you&apos;re trying to log in, in the development environment.
      Please, run firebase emulators with this command <b>firebase
      emulators:start</b>, in a new terminal window; once
      the firebase emulators are properly initialized, please refresh this page.
      <br />
      <br />
      <div>
        {true ? (
          <>firebase emulators are running please :{')'}</>
        ) : (
          <>
            firebase emulators are not running or function is not retriving the
            true value!
          </>
        )}
      </div>
    </div>
  )
}
