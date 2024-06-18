import AppBar from "./components/AppBar";
import Footer from "./components/Footer";

export const Layout = (props) => {
  return (
    <div class="min-h-screen flex flex-col justify-between min-w-[100vw]">
      <AppBar />
      <div class="min-w-screen mb-auto flex flex-1 items-center justify-center flex-col">
        <div class="container flex flex-1 items-center justify-center flex-col">
          {props.children}
        </div>
      </div>
      <Footer />
    </div>
  );
};
