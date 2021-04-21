import Link from 'next/link'

const MyApp = ({ Component, pageProps }) => {
    return (
        <>
            <Link href="/">
                <a >Home</a>
            </Link>
            <Link href="/about">
                <a >About</a>
            </Link>
            <Component {...pageProps} />
            <footer>Footer</footer>
        </>
    );
};
/* Link permite renderização de algumas coisas no cliente, e evitar que toda a pagina seja renderizada, apenas o que mudou */
// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp