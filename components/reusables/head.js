import { useRouter } from 'next/router'
import Head from 'next/head'

const SectionHead = ({ title, description, children }) => {
    const router = useRouter()
    const origin =
        typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : ''
    const url = origin + router.asPath
    const languages = router.locales || 'th'
    console.log(url)
    return (
        <Head>
            <title>{title}</title>
            <link
                rel="shortcut icon"
                href="https://cdn.sanity.io/images/k1265eyp/production/eaaf0e5329b6145f1fafa3587f835c22b00c94c5-95x104.png"
            />
            {languages.map((lang) => (
                <link
                    key={lang}
                    rel="alternate"
                    hrefLang={lang}
                    href={origin + '/' + lang}
                />
            ))}
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
            />
            <link rel="canonical" href={url} />
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta
                property="og:image"
                content="https://cdn.sanity.io/images/k1265eyp/production/c59661910728b56c7874931dee534e5bab4bcb6c-560x208.png"
            />
            {children}
        </Head>
    )
}

export default SectionHead
