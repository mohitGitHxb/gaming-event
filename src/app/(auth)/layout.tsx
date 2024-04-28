const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-center min-h-screen w-full bg-custom-950 bg-opacity-95 saturate-200 bg-blend-overlay bg-[url('https://wallpapercave.com/wp/wp4833960.jpg')] bg-cover bg-fixed bg-center">
      {children}
    </div>
  );
};

export default Layout;
