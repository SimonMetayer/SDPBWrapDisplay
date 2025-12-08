import os
from datetime import datetime

def count_images(image_dir='images'):
    exts = ('.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg')
    count = 0
    for root, dirs, files in os.walk(image_dir):
        count += sum(1 for f in files if f.lower().endswith(exts))
    return count

if __name__ == '__main__':
    count = count_images()
    last_updated = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    js_content = (
        "window.imageInfo = {\n"
        f"  count: {count},\n"
        f"  last_updated: \"{last_updated}\"\n"
        "};\n"
    )

    with open('image_count.js', 'w') as f:
        f.write(js_content)

    print(f"Generated image_count.js — {count} images, updated {last_updated}")

