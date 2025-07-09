import os
import json

def count_images(image_dir='images'):
    exts = ('.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg')
    count = 0
    for root, dirs, files in os.walk(image_dir):
        count += sum(1 for f in files if f.lower().endswith(exts))
    return count

if __name__ == '__main__':
    count = count_images()
    with open('image_count.json', 'w') as f:
        json.dump({'count': count}, f)
    print(f"Counted {count} images.")

