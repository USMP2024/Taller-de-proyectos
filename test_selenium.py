from selenium import webdriver
from selenium.webdriver.chrome.options import Options

chrome_options = Options()
chrome_options.add_argument("--headless")  # Añade el argumento headless
chrome_options.add_argument("--no-sandbox")  # Añade este argumento si estás ejecutando como root/user en un entorno Docker
chrome_options.add_argument("--disable-dev-shm-usage")  # Supera limitaciones en entornos sin interfaz gráfica

driver = webdriver.Chrome(options=chrome_options)

driver.get("https://www.youtube.com/")
print(driver.title)  # Imprime el título de la página para demostrar que se cargó correctamente.

driver.quit()
