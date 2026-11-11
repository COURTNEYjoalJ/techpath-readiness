import { useEffect, useRef } from 'react';

/**
 * Put the contents of this ZIP in your web app's public/marketcraft-3d/ folder.
 * Usage: <MarketCraftBackground theme="dark" motion />
 * Put existing hero content INSIDE the component to preserve your UI.
 */
export default function MarketCraftBackground({
  theme = 'dark', motion = true, children, height = 'min(68vh, 620px)',
  assetBase = '/marketcraft-3d', className = '',
}) {
  const frame = useRef(null);
  const url = `${assetBase}/index.html?embed=1&theme=${theme}&motion=${motion ? 'on' : 'off'}`;
  useEffect(() => {
    frame.current?.contentWindow?.postMessage(
      { source: 'marketcraft-parent', theme, motion: motion ? 'on' : 'off' }, '*'
    );
  }, [theme, motion]);

  return (
    <section className={className} style={{ position:'relative',height,overflow:'hidden',isolation:'isolate' }}>
      <iframe ref={frame} src={url} title="Animated mountain background"
        aria-hidden="true" tabIndex={-1}
        style={{ border:0,position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none' }} />
      <div style={{ position:'relative',zIndex:2,height:'100%' }}>
        {children}
      </div>
    </section>
  );
}
