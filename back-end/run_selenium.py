import time
import os.path
import logging
logging.basicConfig(level=logging.DEBUG)

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

chrome_options = Options()
chrome_options.add_argument("--no-sandbox")
# chrome_options.add_argument("--headless")

homedir = os.path.expanduser("~")
webdriver_service = Service(f"{homedir}/chromedriver/stable/chromedriver")

browser = webdriver.Chrome(service=webdriver_service, options=chrome_options)

browser.get("https://www.python.org")

# description = browser.find_element(By.NAME, "description").get_attribute("content")
# print(f"{description}")

time.sleep(10)
browser.quit()