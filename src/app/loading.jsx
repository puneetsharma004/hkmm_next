
export default function Loading() {


  return (
    <>

        <div
          key="loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-black"
        >
          <video
            autoPlay
            muted
            playsInline
            className="w-[320px]"
          >
            <source src="/loader.webm" type="video/webm" />
          </video>
        </div>
  </>  

  );
}
