const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");

// Read and base64-encode the logo at cold start
let logoBase64;
try {
  const logoPath = path.join(__dirname, "logo.png");
  const logoBuffer = fs.readFileSync(logoPath);
  logoBase64 = logoBuffer.toString("base64");
} catch (e) {
  // Logo won't be embedded if file is missing
  logoBase64 = null;
}

exports.handler = async (event) => {
  const url = event.queryStringParameters?.url;

  if (!url) {
    return {
      statusCode: 400,
      body: "Missing ?url= parameter",
    };
  }

  try {
    let svg = await QRCode.toString(url, {
      type: "svg",
      errorCorrectionLevel: "H",
      margin: 2,
      color: {
        dark: "#2B2D42",
        light: "#FFFFFF",
      },
    });

    // Embed the logo in the centre of the QR code
    // Error correction level H tolerates up to 30% coverage
    if (logoBase64) {
      // Extract viewBox dimensions from the SVG
      const viewBoxMatch = svg.match(/viewBox="0 0 (\d+) (\d+)"/);
      if (viewBoxMatch) {
        const size = parseInt(viewBoxMatch[1], 10);
        const logoSize = Math.round(size * 0.22);
        const logoOffset = Math.round((size - logoSize) / 2);
        const padding = Math.round(logoSize * 0.08);

        const logoOverlay = `
  <rect x="${logoOffset - padding}" y="${logoOffset - padding}" width="${logoSize + padding * 2}" height="${logoSize + padding * 2}" rx="${Math.round(logoSize * 0.12)}" fill="#FFFFFF"/>
  <image x="${logoOffset}" y="${logoOffset}" width="${logoSize}" height="${logoSize}" href="data:image/png;base64,${logoBase64}" preserveAspectRatio="xMidYMid meet"/>`;

        svg = svg.replace("</svg>", `${logoOverlay}\n</svg>`);
      }
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=86400",
      },
      body: svg,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: "Error generating QR code",
    };
  }
};
