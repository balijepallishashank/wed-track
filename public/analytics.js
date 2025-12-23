(function () {
  console.log("Analytics script loaded");

  function generateUUID(){//public domain/MIT
    return Date.now().toString(36) +Math.random().toString(36).substr(2,9);
  }

const session_duration = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
const now = Date.now();
let visitorId = localStorage.getItem('webtrack_visitor_id');
let sessionTime = localStorage.getItem('webtrack_session_time');

if (!visitorId || (now - sessionTime) > session_duration) {
    
    if (visitorId) {
        localStorage.removeItem('webtrack_visitor_id');
        localStorage.removeItem('webtrack_session_time');
    }

    visitorId = generateUUID();
    localStorage.setItem('webtrack_visitor_id', visitorId);
    localStorage.setItem('webtrack_session_time', now);
}

else{
  console.log("Existing Session");
}

  const script = document.currentScript;
  // Dynamically get the API host from the script's source URL
  const scriptUrl = new URL(script.src);
  const API_HOST = scriptUrl.origin;

  const websiteId = script.getAttribute("data-website-id");
  const domain = script.getAttribute("data-domain");

  const entryTime=  Math.floor(Date.now()/1000);
  const referrer = document.referrer || 'Direct'
  //utm_sources
const urlParams = new URLSearchParams(window.location.search);
const queryParams = {};
urlParams.forEach((value, key) => {
  queryParams[key] = value;
});
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
    urlParams: queryParams,
    utm_source,
    utm_medium,
    utm_campaign,
    RefParama,
    
  };

  fetch(`${API_HOST}/api/track`, {
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
 let activeStartTime = Math.floor(Date.now() / 1000);
 let totalActiveTime = 0;
 
 const handleExit = () => {
    const exitTime = Math.floor(Date.now() / 1000);
    totalActiveTime += (exitTime - activeStartTime);  // Fixed: Proper time difference calculation
    
    fetch(`${API_HOST}/api/track`, {
    method: 'POST',
    keepalive: true,
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        type: 'exit',
        websiteId,
        domain,
        exitTime: exitTime,
        totalActiveTime: totalActiveTime,
        visitorId: visitorId,
        exitUrl: window.location.href
    })
})
//localStorage.clear();

 }

window.addEventListener('beforeunload', handleExit);

  const sendLivePing = () => {
    fetch(`${API_HOST}/api/live`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            visitorId,
            websiteId,
            last_seen: Date.now().toString(),
            url: window.location.href
        })
    })
}

// Run this function every 10 seconds
setInterval(sendLivePing, 10000);

//window.addEventListener('pagehide', handleExit);
})();
 