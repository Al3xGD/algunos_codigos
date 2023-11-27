# Pequeña guia para la escritura de un compresor de PDF entre otras cosas

Vamos a usar Python para comprimir un PDF con la menor perdida de calidad posible usando
para ello el modulo ```PyPDF2```

### Empezamos con la instalacion del modulo

```bash
pip install PyPDF2
```

### Primer metodo de compresion

Este metodo de compresion fue sacado de la pagina de documentacion de <a href="https://pypdf2.readthedocs.io/en/3.0.0/user/file-size.html">PyPDF2</a>

```python
from PyPDF2 import PdfReader, PdfWriter

reader = PdfReader("example.pdf")
writer = PdfWriter()

for page in reader.pages:
    page.compress_content_streams()  # This is CPU intensive!
    writer.add_page(page)

with open("out.pdf", "wb") as f:
    writer.write(f)
```

### Segundo metodo de compresion

```python
import PyPDF2

def comprimir_pdf(archivo_entrada, archivo_salida):
    # Abrir el archivo PDF de entrada en modo lectura
    pdf_entrada = open(archivo_entrada, 'rb')

    # Crear un objeto PDFWriter para el archivo de salida
    pdf_writer = PyPDF2.PdfFileWriter()

    # Crear un objeto PDFReader para el archivo de entrada
    pdf_reader = PyPDF2.PdfFileReader(pdf_entrada)

    # Recorrer cada página del PDF de entrada y agregarla al objeto PDFWriter
    for num_pagina in range(pdf_reader.numPages):
        pagina = pdf_reader.getPage(num_pagina)
        pdf_writer.addPage(pagina)

    # Crear un archivo de salida en modo escritura binaria
    with open(archivo_salida, 'wb') as pdf_salida:
        # Comprimir el PDF escribiendo el contenido del PDFWriter en el archivo de salida
        pdf_writer.write(pdf_salida)

    # Cerrar los archivos abiertos
    pdf_entrada.close()

if __name__ == "__main__":
    archivo_entrada = 'input.pdf'  # Reemplaza 'input.pdf' con tu archivo PDF de entrada
    archivo_salida = 'compressed_output.pdf'  # Nombre del archivo PDF comprimido de salida
    comprimir_pdf(archivo_entrada, archivo_salida)

```

## Uniendo varios PDFs en un solo fichero

```python
import PyPDF2

def unir_pdfs(archivos_entrada, archivo_salida):
    # Crear un objeto PDFWriter para el archivo de salida
    pdf_writer = PyPDF2.PdfFileWriter()

    for archivo in archivos_entrada:
        # Abrir cada archivo PDF de entrada en modo lectura binaria
        with open(archivo, 'rb') as pdf:
            # Crear un objeto PDFReader para cada archivo de entrada
            pdf_reader = PyPDF2.PdfFileReader(pdf)

            # Recorrer cada página del PDF de entrada y agregarla al objeto PDFWriter
            for num_pagina in range(pdf_reader.numPages):
                pagina = pdf_reader.getPage(num_pagina)
                pdf_writer.addPage(pagina)

    # Crear un archivo de salida en modo escritura binaria
    with open(archivo_salida, 'wb') as pdf_salida:
        # Escribir el contenido del PDFWriter en el archivo de salida
        pdf_writer.write(pdf_salida)

if __name__ == "__main__":
    archivos_entrada = ['archivo1.pdf', 'archivo2.pdf']  # Lista de nombres de archivos PDF de entrada
    archivo_salida = 'pdf_unido.pdf'  # Nombre del archivo PDF de salida
    unir_pdfs(archivos_entrada, archivo_salida)
```

Si deseas leerte mas documentacion sobre pyPDF2, he aqui... https://pypdf2.readthedocs.io/en/3.0.0/
