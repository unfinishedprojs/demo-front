import type { JSXElement } from 'solid-js';
import MyAppBar from './AppBar';

const Layout = (props: { children: JSXElement }) => {
  return (
    <div>
      <MyAppBar />
      <main>
        {props.children}
      </main>
    </div>
  );
};

export default Layout;
