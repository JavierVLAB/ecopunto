import os

print(os.listdir('.'))

# Obtener el directorio actual donde se encuentra el archivo Python
current_directory = os.path.dirname(os.path.abspath(__file__))

# Listar todos los archivos en el directorio actual
files_in_directory = os.listdir(current_directory)

# Mostrar los archivos
print("Archivos en el directorio actual:")
for file in files_in_directory:
    print(file)
    