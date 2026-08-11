from PIL import Image

def remove_white_background(image_path, output_path, tolerance=240):
    img = Image.open(image_path)
    img = img.convert("RGBA")
    
    datas = img.getdata()
    
    newData = []
    for item in datas:
        # Check if pixel is close to white
        if item[0] >= tolerance and item[1] >= tolerance and item[2] >= tolerance:
            # Change all white (also shades of whites) to transparent
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    
    # Crop to bounding box of non-transparent pixels
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)

    img.save(output_path, "PNG")

input_file = r"C:\Users\anshk\.gemini\antigravity\brain\3147e9d7-3d0b-4b8e-859f-6488d6272b5a\.user_uploaded\media_1786349720892.png"
output_file = r"C:\Users\anshk\.gemini\antigravity\scratch\furrytails_main\public\flipkart_logo.png"

remove_white_background(input_file, output_file)
print("Background removed and saved to", output_file)
