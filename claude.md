# Loop - Sustainable Fashion Web App

A Young Enterprise project for a student clothing business that refurbishes garments and sells them with provenance stories.

## Project Structure

```
/
├── index.html              Homepage with collection grid
├── css/style.css           Mobile-responsive styling
├── netlify.toml            Netlify deployment config
└── garments/
    ├── neptunes-knit.html  Cornish fisherman's jumper
    ├── rebel-blues.html    Designer jeans
    ├── time-warp.html      Retro denim jacket
    └── soul-steps.html     Vintage Converse All-Stars
```

## Deploying to Netlify (Free)

### Option 1: Drag & Drop (Easiest)
1. Go to [app.netlify.com](https://app.netlify.com)
2. Sign up / log in (can use GitHub, Google, or email)
3. Drag the entire project folder onto the page where it says "Drag and drop your site"
4. Done! You'll get a URL like `random-name-123.netlify.app`

### Option 2: Connect to GitHub (Auto-deploys)
1. Push this repo to GitHub
2. Go to [app.netlify.com](https://app.netlify.com) and click "Add new site" → "Import an existing project"
3. Choose GitHub and select the repo
4. Leave build settings as default (it'll use `netlify.toml`)
5. Click "Deploy site"

## After Deployment

### Custom domain (optional)
- In Netlify dashboard → Site settings → Domain management
- You can use a free `yourname.netlify.app` subdomain or connect a custom domain

### QR Code URLs
The config includes redirects so you can use shorter URLs without `.html`:
- `yoursite.netlify.app/garments/neptunes-knit`
- `yoursite.netlify.app/garments/rebel-blues`
- `yoursite.netlify.app/garments/time-warp`
- `yoursite.netlify.app/garments/soul-steps`

### Generate QR Codes
Once live, use any free QR generator like:
- [qr-code-generator.com](https://www.qr-code-generator.com)
- [qrcode-monkey.com](https://www.qrcode-monkey.com) (allows custom styling)

Just paste each garment URL and download the QR codes to print on tags!

## Adding New Garments

1. Copy an existing garment HTML file (e.g., `garments/neptunes-knit.html`)
2. Rename it to your new garment's slug (e.g., `garments/vintage-blazer.html`)
3. Update the content: title, story timeline, materials, embellishments
4. Add a card to `index.html` linking to the new page
5. Add a redirect in `netlify.toml` for the clean URL
6. Deploy and generate a new QR code
