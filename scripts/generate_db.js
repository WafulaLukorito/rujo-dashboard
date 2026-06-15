const fs = require('fs');
const path = require('path');

const names = ["Bantu Collective", "Nyota Groove", "Dhahabu Vibes", "Neema Zuhura", "Kipepeo Project"];
const db = { artists: [] };

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

names.forEach((name, i) => {
  const id = (i + 1).toString();
  const balance = random(1000000, 10000000);
  const revenueYTD = balance + random(5000000, 20000000);
  const spotifyRev = Math.floor(revenueYTD * 0.4);
  const youtubeRev = Math.floor(revenueYTD * 0.3);
  
  const artistData = {
    id,
    name,
    financials: {
      availableBalance: balance,
      totalRevenueYTD: revenueYTD,
      spotifyRevenue: spotifyRev,
      youtubeRevenue: youtubeRev,
      lastPayment: {
        amount: random(500000, 3000000),
        date: "2026-06-01"
      }
    },
    activity: [
      {
        "id": `${id}-1`, "category": "financial", "subType": "royalty_drop", "severity": "success",
        "title": "Boomplay Mechanical Royalties", "description": `Processed Q1 mechanical royalties for ${name} from Boomplay.`,
        "amount": random(200000, 800000), "date": "2026-06-14T10:30:00Z", "actionable": false,
        "metadata": { "source": "Boomplay", "territory": "East Africa" }
      },
      {
        "id": `${id}-2`, "category": "financial", "subType": "streaming_anomaly", "severity": "urgent",
        "title": "Streaming Velocity Spike", "description": "Detected a 400% increase in streaming velocity on Spotify Kenya.",
        "date": "2026-06-14T08:15:00Z", "actionable": true,
        "metadata": { "platform": "Spotify" }
      },
      {
        "id": `${id}-3`, "category": "sync", "subType": "contract_approval", "severity": "warning",
        "title": "Action Required: License Approval", "description": "Final terms for a sync placement need admin sign-off.",
        "amount": random(1000000, 3000000), "date": "2026-06-11T16:20:00Z", "actionable": true,
        "metadata": { "licenseType": "All Media" }
      }
    ],
    catalog: (() => {
      const artistTracks = {
        "Bantu Collective": [
          "Sema Nami", "Kesho Kutwa", "Machozi ya Furaha", "Upendo wa Dhati", 
          "Mwangaza", "Safari Ndefu", "Nyumbani", "Tujengane", 
          "Dunia Duara", "Upepo wa Pwani", "Sherehe", "Wimbi la Bahari"
        ],
        "Nyota Groove": [
          "Muziki Tamu", "Nipe Nafasi", "Ladha ya Mapenzi", "Chakacha", 
          "Jasho na Damu", "Mapambano", "Kipepeo Rangi", "Ngoma ya Usiku", 
          "Tabasamu Yako", "Cheza Kidogo", "Asali na Nyuki", "Nyota ya Alfajiri"
        ],
        "Dhahabu Vibes": [
          "Dhahabu", "Pesa Mkononi", "Kazi na Bati", "Vibe la Mtaa", 
          "Sura Yako", "Mvua ya Baraka", "Nishike Mkono", "Kiu ya Maji", 
          "Ukweli Mtupu", "Moto na Maji", "Maisha Marefu", "Zamani Sana"
        ],
        "Neema Zuhura": [
          "Neema ya Mungu", "Zuhura", "Sauti ya Moyo", "Kipepeo wa Dhahabu", 
          "Ahadi ya Kweli", "Macho Yako", "Subira Huvuta Heri", "Bahari ya Mapenzi", 
          "Nuru ya Mchana", "Matumaini", "Amani na Upendo", "Funguo ya Moyo"
        ],
        "Kipepeo Project": [
          "Kipepeo", "Sauti Tamu", "Mti wa Matunda", "Njia ya Maisha", 
          "Malkia wa Amani", "Rhythm ya Rusinga", "Ziwa Victoria", "Kikwetu", 
          "Harambee", "Safarini", "Ndoto za Usiku", "Mwamba wa Imara"
        ]
      };
      
      const tracks = artistTracks[name] || [];
      return tracks.map((title, idx) => {
        const trackId = idx + 1;
        const year = random(2022, 2026);
        const yearShort = year.toString().slice(-2);
        const streams = random(200000, 15000000);
        // Revenue typically ~0.35 to 0.65 KSh per stream
        const revenue = Math.floor(streams * (random(35, 65) / 100));
        const split = [50, 75, 100][random(0, 2)];
        
        return {
          id: `${id}-c${trackId}`,
          title,
          artist: name,
          releaseDate: `${year}-${String(random(1, 12)).padStart(2, '0')}-${String(random(1, 28)).padStart(2, '0')}`,
          isrc: `KE-A1Z-${yearShort}-${id}${String(trackId).padStart(3, '0')}`,
          streams,
          revenue,
          split
        };
      });
    })(),
    settings: {
      profile: {
        email: `management@${name.replace(' ', '').toLowerCase()}.com`,
        phone: "+254 700 000000",
        notifications: true
      },
      payout: {
        method: "M-Pesa",
        accountNumber: "254700000000",
        status: "Verified"
      },
      platforms: {
        spotify: "Connected",
        youtube: "Connected",
        appleMusic: "Disconnected"
      }
    }
  };
  
  db.artists.push(artistData);
});

fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'mockDb.json'), JSON.stringify(db, null, 2));
console.log('Done generating mockDb.json');
