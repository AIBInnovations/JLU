// Server component — renders into the initial HTML so it shows BEFORE
// React hydrates and BEFORE any below-fold content can flash.
// Removed by an inline <script> when `window.load` fires (all assets loaded)
// or after a hard 8s safety timeout, whichever comes first.

export default function PageLoader() {
  return (
    <>
      <div
        id="page-loader"
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          backgroundColor: '#f6f7f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          transition: 'opacity 0.5s ease',
          willChange: 'opacity',
        }}
      >
        {/* Editorial corner ticks — matches the site's minimal vibe */}
        <span style={{ position: 'absolute', top: 24, left: 24, width: 18, height: 18, borderTop: '1px solid #21313c', borderLeft: '1px solid #21313c', opacity: 0.4 }} />
        <span style={{ position: 'absolute', top: 24, right: 24, width: 18, height: 18, borderTop: '1px solid #21313c', borderRight: '1px solid #21313c', opacity: 0.4 }} />
        <span style={{ position: 'absolute', bottom: 24, left: 24, width: 18, height: 18, borderBottom: '1px solid #21313c', borderLeft: '1px solid #21313c', opacity: 0.4 }} />
        <span style={{ position: 'absolute', bottom: 24, right: 24, width: 18, height: 18, borderBottom: '1px solid #21313c', borderRight: '1px solid #21313c', opacity: 0.4 }} />

        {/* Wordmark — matches site typography (Inter + italic Times Roman) */}
        <div
          style={{
            color: '#21313c',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 600,
            fontSize: 'clamp(1.5rem, 4vw, 2.75rem)',
            letterSpacing: '0.01em',
            lineHeight: 1.1,
            textAlign: 'center',
            padding: '0 1.5rem',
          }}
        >
          Jagran Lakecity{' '}
          <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
            University
          </span>
        </div>

        {/* Hairline progress track */}
        <div
          style={{
            width: 'min(220px, 50vw)',
            height: 1,
            backgroundColor: 'rgba(33, 49, 60, 0.15)',
            marginTop: '2.25rem',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            id="page-loader-bar"
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: '#027ea1',
              transform: 'scaleX(0)',
              transformOrigin: 'left center',
              willChange: 'transform',
            }}
          />
        </div>

        {/* Bottom marker */}
        <div
          style={{
            position: 'absolute',
            bottom: '3rem',
            color: '#999',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 10,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          Loading
        </div>
      </div>

      {/* Inline removal script.
         - Locks scroll while loader is up (`body.loading` + `overflow:hidden`).
         - Animates a progress bar that eases toward 90% over 8s.
         - Snaps to 100% and fades out when window.load fires (all assets ready).
         - 8 s safety timeout so the loader can never get stuck. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){
var L=document.getElementById('page-loader'),
    B=document.getElementById('page-loader-bar'),
    start=Date.now(),
    done=false,
    MIN=600,MAX=8000;
document.body.classList.add('loading');
function tick(){
  if(done)return;
  var e=Date.now()-start,
      p=Math.min(1,e/MAX),
      eased=1-Math.pow(1-p,2.2);
  if(B)B.style.transform='scaleX('+Math.min(0.9,eased)+')';
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
function exit(){
  if(done)return;
  done=true;
  var wait=Math.max(0,MIN-(Date.now()-start));
  setTimeout(function(){
    if(B){B.style.transition='transform 0.35s ease-out';B.style.transform='scaleX(1)';}
    setTimeout(function(){
      if(L)L.style.opacity='0';
      setTimeout(function(){
        if(L&&L.parentNode)L.parentNode.removeChild(L);
        document.body.classList.remove('loading');
      },520);
    },280);
  },wait);
}
if(document.readyState==='complete')exit();
else window.addEventListener('load',exit,{once:true});
setTimeout(exit,MAX);
})();`,
        }}
      />
    </>
  );
}
