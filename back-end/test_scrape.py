from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

options = webdriver.ChromeOptions()
options.binary_location = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
chrome_driver_binary = ChromeDriverManager().install()
driver = webdriver.Chrome(chrome_driver_binary, options=options)
driver.get("https://www.google.com")