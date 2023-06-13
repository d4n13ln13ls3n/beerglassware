from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains

import time

PATH = "C:\Program Files (x86)\chromedriver.exe"

driver = webdriver.Chrome(PATH)
options = webdriver.ChromeOptions()
options.add_experimental_option("detach", True)
driver = webdriver.Chrome(options=options)

driver.get('https://ratebeer.com')
# action = ActionChains(driver)
driver.implicitly_wait(2)
driver.fullscreen_window()

search = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'MuiInputBase-input.MuiInputBase-inputAdornedStart.MuiInputBase-inputAdornedEnd')))
search.send_keys("tripel karmeliet")
search.send_keys(Keys.RETURN)

time.sleep(5)

link_first_beer = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, "a[data-testid='beer-menu-item']"
)))
link_first_beer.click()

beer_name = driver.find_element(By.CSS_SELECTOR, ".MuiTypography-h4.hwjOn").get_attribute("textContent")
print('beer name:', beer_name)

time.sleep(10)
beer_style = driver.find_elements(By.ID, "styleLink")[1].get_attribute("textContent")
print('style:', beer_style)

time.sleep(10)
show_more = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, ".pb-4 .MuiButtonBase-root.mt-3")))
show_more.click()

time.sleep(1)
glasses = driver.find_elements(By.CSS_SELECTOR, ".mt-3.mr-4 .kbrPIo")

beer_info = {
    "name": beer_name,
    "style": beer_style,
    "glasses": []
}

for glass in glasses:
    beer_info['glasses'].append(glass.get_attribute("textContent"))

print('beerinfo:', beer_info)

# driver.quit()
