import base64

# Open the image file in binary mode
with open("image.jpg", "rb") as image_file:
    # Read the binary image data
    image_data = image_file.read()

# Encode the image data as base64
base64_image = base64.b64encode(image_data).decode("utf-8")

# Print the base64-encoded image string
print(base64_image)
