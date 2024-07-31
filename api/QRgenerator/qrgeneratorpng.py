import qrcode
from PIL import Image, ImageOps

# Datos para el QR
data = "https://ecopunto-gilt.vercel.app/local"

# Crear el objeto QR
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=10,
    border=4,
)
qr.add_data(data)
qr.make(fit=True)

# Crear la imagen QR en blanco y negro
qr_img = qr.make_image(fill_color="black", back_color="white").convert("RGB")

# Cargar la imagen del logo (PNG con transparencia)
logo_path = "grande2.png"
logo = Image.open(logo_path)

# Aumentar la resolución del logo si es necesario
max_logo_size = 200  # Ajusta el tamaño máximo del logo
logo.thumbnail((max_logo_size, max_logo_size))

# Agregar un borde blanco alrededor del logo
border_size = 10  # Ajusta el tamaño del borde según sea necesario
logo_with_border = ImageOps.expand(logo, border=border_size, fill='white')

# Calcular la posición para centrar el logo en el QR
logo_pos = (
    (qr_img.size[0] - logo_with_border.size[0]) // 2,
    (qr_img.size[1] - logo_with_border.size[1]) // 2,
)

# Hacer blanco el área detrás del logo en el QR
qr_pixels = qr_img.load()
for x in range(logo_pos[0], logo_pos[0] + logo_with_border.size[0]):
    for y in range(logo_pos[1], logo_pos[1] + logo_with_border.size[1]):
        qr_pixels[x, y] = (255, 255, 255)

# Pegar el logo con borde en el centro del QR
qr_img.paste(logo_with_border, logo_pos, logo_with_border)

# Guardar la imagen final
output_path = "qr_with_logo.png"
qr_img.save(output_path)

print(f"QR con logo generado y guardado en {output_path}")
