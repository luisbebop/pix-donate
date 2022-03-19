import Head from 'next/head'
import Image from 'next/image'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { CopyToClipboard } from "react-copy-to-clipboard"
import { useState, useEffect } from 'react'
import PulseLoader from "react-spinners/PulseLoader"
import {useRouter} from 'next/router'

function Home({data}) {
  const router = useRouter()
  const [state, setState] = useState({
    isQrcodeCopied: false,
    transaction_id: data.data.id
  })

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`/api/check_pix?uuid=${state.transaction_id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          if (data.attributes.authorization_code === "00") {
            router.push('/confirmed')
          }
        })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <Image
            priority
            src={`https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=${data.data.attributes.br_code}&choe=UTF-8`}
            className={utilStyles.borderCircle}
            height={200}
            width={200}
            alt="PIX QR Code"
        />

        <span className={utilStyles.smallStatus}>Checando pagamento</span>

        <PulseLoader color="#3775c6" loading={true} size={20} /> <br/>

        <CopyToClipboard text={data.data.attributes.br_code} onCopy={() => setState({isQrcodeCopied: true})}>
          <button className={utilStyles.button64} role="button">
            {state.isQrcodeCopied ? "Copiado!" : "Copiar PIX Copia e Cola"}
          </button>
        </CopyToClipboard>

        <p>
          Use o pix acima para doar R$ 1,11 ou mais para Ucrânia 🇺🇦 <br/>
          Você também pode copiar e colar o "Pix Copia Cola"<br/>
          Para cada real doado até 11/05/2022 <a href="https://twitter.com/luisbebop">@luisbebop</a> irá dar match<br/>
          Irei comprar cripto com o saldo doado e enviar para Ucrânia 🇺🇦<br/>
          Esse projeto é feito com a API do PIX da <a href="https://www.infinitepay.io">InfinitePay</a><br/>
          O código do projeto está <a href="https://github.com/luisbebop/pix-donate">aqui</a>
        </p>
      </section>
    </Layout>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  const res = await fetch(`https://api.infinitepay.io/v2/transactions`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Env': 'production',
      'Authorization': process.env.API_KEY_INFINITEPAY,
    },
    body: JSON.stringify({'amount': 111, 'capture_method': 'pix'})
  })
  const data = await res.json()

  console.log(data)

  return { props: { data } }
}

export default Home

