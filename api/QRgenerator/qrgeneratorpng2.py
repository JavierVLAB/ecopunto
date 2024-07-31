import qrcode
import svgwrite
from qrcode.image.svg import SvgImage

# Datos para el QR
data = "https://www.ejemplo.com"

# Generar el código QR como objeto SVG
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=10,
    border=4,
)
qr.add_data(data)
qr.make(fit=True)

# Convertir el QR en un SVG string
img = qr.make_image(image_factory=SvgImage)
qr_svg_string = img.to_string()

# Crear un archivo SVG nuevo con svgwrite
dwg = svgwrite.Drawing('qr_with_logo.svg', profile='tiny')

# Añadir el código QR al archivo SVG
dwg.add(svgwrite.container.Group(id='qr_code', insert=(0, 0)).add(svgwrite.container.Use(href=qr_svg_string)))

# Ruta del logo SVG
logo_svg_path = "logo.svg"

# Calcular el tamaño y la posición del logo dentro del QR
qr_size = qr.modules_count * 10  # Esto depende del tamaño del QR generado
logo_size = int(qr_size * 0.25)  # 25% del tamaño del QR
logo_pos = ((qr_size - logo_size) // 2, (qr_size - logo_size) // 2)

# Insertar el logo SVG en el centro del QR
dwg.add(dwg.image(href=logo_svg_path, insert=logo_pos, size=(logo_size, logo_size)))

# Guardar el SVG final
dwg.save()

print("QR con logo SVG generado y guardado en 'qr_with_logo.svg'")
