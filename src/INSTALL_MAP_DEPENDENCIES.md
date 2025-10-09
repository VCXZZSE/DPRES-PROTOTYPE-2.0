# Install Dependencies for Accurate India Map

To use the new accurate India map with real geographical boundaries, you need to install the following dependencies:

## Required Dependencies

```bash
# Install React Leaflet for interactive maps
npm install react-leaflet leaflet

# Install TypeScript types for Leaflet
npm install --save-dev @types/leaflet
```

## Alternative CDN Approach (if npm install fails)

If you can't install via npm, add these to your `index.html`:

```html
<!-- Leaflet CSS -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/>

<!-- Leaflet JavaScript -->
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossorigin=""></script>

<!-- React Leaflet (via CDN) -->
<script src="https://unpkg.com/react-leaflet@4.2.1/dist/index.min.js"></script>
```

## Features of the New Accurate Map

### ✅ **Real Geographical Boundaries**
- Uses accurate GeoJSON data for Indian state boundaries
- Proper coastlines and state shapes
- Real latitude/longitude coordinates

### ✅ **Interactive Features**
- Zoom and pan functionality
- Click states for detailed information
- Hover effects with tooltips
- Responsive design

### ✅ **Professional Styling**
- Modern tile layer from OpenStreetMap
- Custom state colors based on alerts/institutions
- Dark mode support
- Professional tooltips and popups

### ✅ **Accurate Institution Positioning**
- Real coordinates for educational institutions
- Custom markers for schools vs colleges
- Alert indicators on institutions
- Detailed popup information

## Usage

Once dependencies are installed, the map will automatically load:

```tsx
import { IndiaMap } from './components/IndiaMap';

// The component will automatically use the accurate map
<IndiaMap 
  showInstitutions={true} 
  onInstitutionClick={(id) => console.log('Clicked:', id)} 
/>
```

## Benefits Over Previous SVG Map

1. **Geographical Accuracy**: Real state boundaries instead of hand-drawn paths
2. **Interactivity**: Full zoom, pan, and click functionality
3. **Performance**: Optimized rendering for large datasets
4. **Scalability**: Easy to add more states or institutions
5. **Professional Appearance**: Modern map tiles and styling

## Troubleshooting

If you encounter issues:

1. **Map not loading**: Check that dependencies are installed correctly
2. **TypeScript errors**: Ensure `@types/leaflet` is installed
3. **Styling issues**: Verify that Leaflet CSS is properly imported
4. **Markers not showing**: Check that institution coordinates are valid

The map component includes fallback functionality - if the accurate map fails to load, it will show a loading indicator and can fallback to the previous SVG version.