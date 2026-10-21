import os
from PIL import Image

def make_transparent_corner():
    input_path = "public/frame-flower-corner.jpg"
    output_path = "public/frame-flower-corner.png"
    
    if not os.path.exists(input_path):
        print(f"Error: {input_path} does not exist")
        return

    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    new_data = []
    # In the corner illustration, the background is in the bottom-right or around the edges
    # We can calculate luminance and color difference from pure paper white (#fdfdfd)
    for item in datas:
        r, g, b, a = item
        # If very close to pure white / background paper texture
        # Let's check max and min
        max_c = max(r, g, b)
        min_c = min(r, g, b)
        diff = max_c - min_c
        
        # Pure white background: high brightness and low color difference
        if min_c > 242 and diff < 12:
            new_data.append((255, 255, 255, 0))
        elif min_c > 230 and diff < 16:
            # Smooth transition
            fade = (245 - min_c) / 15.0
            alpha = int(max(0, min(255, fade * 255)))
            new_data.append((r, g, b, alpha))
        else:
            new_data.append((r, g, b, 255))

    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Saved {output_path}")

if __name__ == "__main__":
    make_transparent_corner()
