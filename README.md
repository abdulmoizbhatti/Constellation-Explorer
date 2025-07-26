# Constellation Explorer

An interactive 3D constellation explorer built with JavaScript, HTML, and CSS. Showcases real astronomical data with animated stars and immersive effects. 

Explore Orion, the Big Dipper, and Cassiopeia using intuitive camera controls, orbital navigation, and star details.

More Constellations and UI/UX updates to come!

## Demo
[![Watch on YouTube](https://img.shields.io/badge/Watch%20on-YouTube-red?style=for-the-badge&logo=youtube)](https://youtu.be/adi-YmoglAk)

## Features

- **Interactive 3D Constellations**: Zoom into individual constellations with smooth camera animations
- **Real Star Data**: Authentic star positions, brightness, and distance information
- **Dynamic Animations**: Beautiful star shimmering effects and 3D depth transitions
- **Star Information**: Click on stars to view detailed astronomical data
- **Responsive Design**: Works seamlessly across different screen sizes

## Setup

### Prerequisites
- A modern web browser with WebGL support
- A local web server (required for loading external fonts and modules)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/constellation-explorer.git
cd constellation-explorer
```

2. Start a local web server (any of these methods work):

**Option 1: Live Server (Recommended)**
```bash
# Install Live Server globally (if you have Node.js)
npm install -g live-server

# Then run in the project directory
live-server

# Or use the VS Code extension "Live Server"
# Right-click on index.html and select "Open with Live Server"
```

**Option 2: Python (if you have it installed)**
```bash
# Using Python 3
python3 -m http.server 8000
```

**Option 3: Node.js (if you have it installed)**
```bash
# Using Node.js
npx http-server
```

3. Open your browser and navigate to:
```
http://localhost:8080  # Live Server default port
# or http://localhost:8000  # Python default port
# or the port shown by your server
```

*Note: A local server is required because browsers block loading external resources (fonts, modules) when opening HTML files directly.*

### Controls
- **Click on constellations** to zoom in and explore
- **Click on individual stars** to view star information
- **Click on the star again** to hide star information
- **Use the back button** to return to the overview
- **Mouse/touch controls** to orbit around constellations when zoomed in

## Key Technologies Used

- **Three.js** - 3D graphics and rendering
- **JavaScript (ES6)** - Application logic and interactivity
- **HTML5** - Semantic markup and structure
- **CSS3** - Styling and responsive design
- **WebGL** - Hardware-accelerated graphics
