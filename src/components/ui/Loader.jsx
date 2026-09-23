

const Loader = () => {
  return (
    <div className="relative w-[75px] h-[100px]">
      {/* Bar 1 */}
      <div
        className="absolute bottom-0 left-0 w-[10px] h-1/2 bg-black
                   origin-bottom shadow-[1px_1px_0_rgba(0,0,0,0.2)]
                   scale-y-[0.2] animate-[barUp1_4s_infinite]"
      />
      {/* Bar 2 */}
      <div
        className="absolute bottom-0 left-[15px] w-[10px] h-1/2 bg-black
                   origin-bottom shadow-[1px_1px_0_rgba(0,0,0,0.2)]
                   scale-y-[0.4] animate-[barUp2_4s_infinite]"
      />
      {/* Bar 3 */}
      <div
        className="absolute bottom-0 left-[30px] w-[10px] h-1/2 bg-black
                   origin-bottom shadow-[1px_1px_0_rgba(0,0,0,0.2)]
                   scale-y-[0.6] animate-[barUp3_4s_infinite]"
      />
      {/* Bar 4 */}
      <div
        className="absolute bottom-0 left-[45px] w-[10px] h-1/2 bg-black
                   origin-bottom shadow-[1px_1px_0_rgba(0,0,0,0.2)]
                   scale-y-[0.8] animate-[barUp4_4s_infinite]"
      />
      {/* Bar 5 */}
      <div
        className="absolute bottom-0 left-[60px] w-[10px] h-1/2 bg-black
                   origin-bottom shadow-[1px_1px_0_rgba(0,0,0,0.2)]
                   scale-y-[1] animate-[barUp5_4s_infinite]"
      />
      {/* Bouncing ball */}
      <div
        className="absolute bottom-[10px] left-0 w-[10px] h-[10px] rounded-full
                   bg-[rgb(44,143,255)] animate-[ball624_4s_infinite]"
      />
    </div>
  );
};

export default Loader;