import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Cuentas Claras - Calculadora de Gastos Compartidos'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a1a',
          backgroundImage: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 24,
              backgroundColor: '#ff6b35',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 60,
              fontWeight: 'bold',
              color: 'white',
              marginRight: 30,
            }}
          >
            CC
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                fontSize: 72,
                fontWeight: 'bold',
                color: '#ff6b35',
                lineHeight: 1.1,
              }}
            >
              Cuentas Claras
            </div>
            <div
              style={{
                fontSize: 32,
                color: '#cccccc',
                marginTop: 10,
              }}
            >
              Calculadora de Gastos Compartidos
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#ffffff',
            textAlign: 'center',
            maxWidth: 900,
            fontStyle: 'italic',
            marginTop: 20,
          }}
        >
          &ldquo;Cuentas claras conservan la amistad&rdquo;
        </div>
        <div
          style={{
            fontSize: 22,
            color: '#999999',
            marginTop: 40,
          }}
        >
          cc.nicomoccagatta.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
