
import "tailwindcss/tailwind.css";


interface MyAppProps {
    Component: React.ComponentType<{ pageProps: any }>;
    pageProps: any;
  }
  
  function MyApp({ Component, pageProps }: MyAppProps) {
    return <Component {...pageProps} />;
  }
  
  export default MyApp;
  