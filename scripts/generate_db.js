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
    catalog: [
      { "id": `${id}-c1`, "title": `${name} Hit 1`, "artist": name, "releaseDate": "2025-04-12", "isrc": `KE-A1Z-25-${id}001`, "streams": random(5000000, 20000000), "revenue": random(3000000, 8000000), "split": 50 },
      { "id": `${id}-c2`, "title": `${name} Hit 2`, "artist": name, "releaseDate": "2026-05-20", "isrc": `KE-A1Z-26-${id}002`, "streams": random(100000, 1000000), "revenue": random(50000, 300000), "split": 100 }
    ],
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
