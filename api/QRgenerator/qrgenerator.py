import qrcode
from PIL import Image
import svgwrite

# Datos para el QR
data = "https://www.ejemplo.com"

# Crear el objeto QR
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=10,
    border=4,
)
qr.add_data(data)
qr.make(fit=True)

# Crear la imagen QR en formato SVG
img = qr.make_image(fill_color="black", back_color="white").convert('RGB')
img.save("qr_temp.png")

# Convertir el PNG a SVG
def png_to_svg(png_path, svg_path):
    img = Image.open(png_path)
    dwg = svgwrite.Drawing(svg_path, profile='tiny', size=img.size)

    for x in range(img.size[0]):
        for y in range(img.size[1]):
            pixel = img.getpixel((x, y))
            if pixel == (0, 0, 0):  # Si el píxel es negro
                dwg.add(dwg.rect((x, y), (1, 1), fill='black'))

    dwg.save()

# Convertir el QR a SVG
png_to_svg("qr_temp.png", "qr_with_logo.svg")

# Cargar el logo SVG
logo_svg = svgwrite.Drawing("Asset 4.svg")

# Posición y tamaño del logo
logo_size = 100  # Ajustar el tamaño según sea necesario
qr_size = img.size[0]
logo_pos = ((qr_size - logo_size) // 2, (qr_size - logo_size) // 2)

# Incrustar el logo en el QR
dwg = svgwrite.Drawing("qr_with_logo.svg", profile='tiny', size=(qr_size, qr_size))
dwg.embed("qr_with_logo.svg", insert=(0, 0))
dwg.embed("logo.svg", insert=logo_pos, size=(logo_size, logo_size))
dwg.save()
