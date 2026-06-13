import { ImageResponse } from 'next/og';
import { APP_NAME } from '@/lib/config';

export const alt = `${APP_NAME} keto meal generator and low carb meal planner`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          background: '#f8fafc',
          color: '#0f172a',
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          padding: '72px',
          width: '100%',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            border: '2px solid #d1fae5',
            boxShadow: '18px 18px 0 #fec445',
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
            padding: '56px',
            width: '100%',
          }}
        >
          <div
            style={{
              color: '#047857',
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            Free keto meal planner for US kitchens
          </div>
          <div
            style={{
              color: '#111827',
              fontSize: 78,
              fontWeight: 900,
              lineHeight: 1,
              maxWidth: 960,
            }}
          >
            Keto meal generator for quick low-carb ideas
          </div>
          <div
            style={{
              color: '#475569',
              fontSize: 34,
              lineHeight: 1.3,
              maxWidth: 900,
            }}
          >
            Easy keto meals, low-carb recipes, and simple meal planning inspiration.
          </div>
        </div>
      </div>
    ),
    size
  );
}
