import AppBar from "./components/AppBar";
import Footer from "./components/Footer";

export const Layout = (props) => {
  return (
    <div class="flex min-h-dvh min-w-[100vw] flex-col justify-between">
      <AppBar />
      <div class="min-w-screen mb-auto flex flex-1 flex-col items-center justify-center">
        <div class="container flex flex-1 flex-col items-center justify-center">
          {props.children}
        </div>
      </div>
      <Footer />
    </div>
  );
};
