import Head from "next/head";
import { useRouter } from "next/router";

export default function MetaData({ title, description }) {
    const router = useRouter()
    const languages = router.locales
    const url = router.asPath
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
    return (
        <Head>
            <title>{title}</title>
            <link rel="shortcut icon" href="https://cdn.sanity.io/images/k1265eyp/production/eaaf0e5329b6145f1fafa3587f835c22b00c94c5-95x104.png" />
            {languages.map(lang => <link key={lang} rel="alternate" hrefLang={lang} href={origin + '/' + lang} />)}
            <meta httpEquiv='Content-Type' content="text/html; charset=utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="canonical" href={url} />
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content="https://cdn.sanity.io/images/a49e7mel/production/b01a4f79a354492c65846127f017b617690660a3-505x526.svg" />
        </Head>
    )
}
