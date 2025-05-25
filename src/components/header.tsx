const Header = () => {
  return (
    <>
      {/* Header */}
      {/* Locked on top of screen */}
      <header className="flex justify-center bg-gray-800 p-3 fixed top-0 w-full z-10">
        <h1 className="custom-container text-2xl font-mono text-white">
          Simdisk
        </h1>
      </header>
    </>
  );
};

export { Header };
