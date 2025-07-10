import os
import json
from datetime import datetime

def count_images(image_dir='images'):
    exts = ('.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg')
    count = 0
    for root, dirs, files in os.walk(image_dir):
        count += sum(1 for f in files if f.lower().endswith(exts))
    return count

if __name__ == '__main__':
    count = count_images()
    last_updated = datetime.now().strftime('%Y-%m-%d %H:%M:%S')  # or just '%Y-%m-%d' if you prefer
    data = {
        'count': count,
        'last_updated': last_updated
    }
    with open('image_count.json', 'w') as f:
        json.dump(data, f, indent=2)
    print(f"Counted {count} images. Last updated: {last_updated}")

