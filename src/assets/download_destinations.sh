#!/bin/bash

# Download destination images from Unsplash (free, high quality)
# Europe - Eiffel Tower
curl -L "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80" -o destination-europe.jpg

# North America - Statue of Liberty
curl -L "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80" -o destination-north-america.jpg

# Middle East - Dubai
curl -L "https://images.unsplash.com/photo-1518684029980-cf91ee70ee05?w=800&q=80" -o destination-middle-east.jpg

# Asia Pacific - Singapore
curl -L "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80" -o destination-asia-pacific.jpg

# Australia & New Zealand - Sydney Opera House
curl -L "https://images.unsplash.com/photo-1506973404872-a4a50e48c4d5?w=800&q=80" -o destination-australia-nz.jpg

echo "✓ All destination images downloaded!"
ls -lh destination-*.jpg
