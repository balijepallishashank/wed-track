(function () {
  console.log("Analytics script loaded");

  function generateUUID(){//public domain/MIT
    return Date.now().toString(36) +Math.random().toString(36).substr(2,9);
  }


  let visitorId = localStorage.getItem('webtrack_visitor_id');
if (!visitorId) {
    visitorId = generateUUID();
    localStorage.setItem('webtrack_visitor_id', visitorId);
}

  const script = document.currentScript;

  const websiteId = script.getAttribute("data-website-id");
  const domain = script.getAttribute("data-domain");

  const entryTime=  Math.floor(Date.now()/1000);
  const referrer = document.referrer || 'Direct'
  //utm_sources
const urlParams = new URLSearchParams(window.location.search);
const utm_source = urlParams.get('utm_source') || '';
const utm_medium = urlParams.get('utm_medium') || '';
const utm_campaign = urlParams.get('utm_campaign') || '';
const RefParama= window.location.href.split('?')[1] || '';


  const data = {
    type:'entry',
    websiteId,
    domain,
    entryTime:entryTime,
    referrer:referrer,
    url: window.location.href,
    visitorId:visitorId,
    urlParams,
    utm_source,
    utm_medium,
    utm_campaign,
    RefParama,
    
  };

  fetch("http://localhost:3000/api/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("Tracking success:", res);
    })
    .catch((err) => {
      console.error("Tracking failed:", err);
    });
/**
 * ACTIVE TIME TRACKING
 */
 let activeStartTime=Math.floor(Date.now()/1000);
 let totalActiveTime=0;
 
 const handleExit=()=>{
    const exitTime=Math.floor(Date.now()/1000);
    totalActiveTime +=Math.floor(Date.now()/1000);-activeStartTime;
    fetch('http://localhost:3000/api/track', {
    method: 'POST',
    keepalive:true,
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        type: 'exit',
        websiteId,
        domain,
        exitTime: exitTime,
        totalActiveTime: totalActiveTime,
        visitorId:visitorId
    })
})
localStorage.clear();

 }

window.addEventListener('beforeunload', handleExit);
//window.addEventListener('pagehide', handleExit);
})();
 