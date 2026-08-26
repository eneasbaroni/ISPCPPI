const Grill = () => {
  return (
    <div className="fixed top-0 left-0 w-[calc(100%-20rem)] tablet:w-[calc(100%-10rem)] mobile:w-[calc(100%-5rem)] ml-40 tablet:ml-20 mobile:ml-10 h-screen flex z-[-1]">
      <div className=" border-main/10 border-r border-l w-1/4 h-screen"></div>
      <div className=" border-main/10 border-r w-1/4 h-screen"></div>
      <div className=" border-main/10 border-r w-1/4 h-screen"></div>
      <div className=" border-main/10 border-r w-1/4 h-screen"></div>
    </div>
  );
};
export default Grill;
