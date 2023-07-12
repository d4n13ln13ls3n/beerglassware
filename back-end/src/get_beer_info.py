from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.chrome.service import Service

import time
import psycopg2

PATH = "C:\Program Files (x86)\chromedriver.exe"

beer = 'invicta pumpking'

url = "postgres://danielyabu:d4n13l@localhost:5432/beerdata"


def get_beer_info(beer, path):
    service = Service(path)
    # driver = webdriver.Chrome(path)
    options = webdriver.ChromeOptions()
    options.add_argument("start-maximized") 
    options.add_argument("disable-infobars")
    options.add_argument("--disable-extensions")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--no-sandbox")
    options.add_argument("--headless=new")
    options.add_experimental_option("detach", True)
    driver = webdriver.Chrome(service=service, options=options)
    # driver = webdriver.Chrome(options=options)

    driver.get('https://ratebeer.com')
    action = ActionChains(driver)
    driver.implicitly_wait(2)
    driver.fullscreen_window()

    search = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'MuiInputBase-input.MuiInputBase-inputAdornedStart.MuiInputBase-inputAdornedEnd')))
    search.send_keys(beer)
    search.send_keys(Keys.RETURN)

    time.sleep(5)

    link_first_beer = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, "a[data-testid='beer-menu-item']"
    )))
    link_first_beer.click()

    beer_name = driver.find_element(By.CSS_SELECTOR, ".MuiTypography-h4.hwjOn").get_attribute("textContent")
    # print('beer name:', beer_name)

    time.sleep(10)
    beer_style = driver.find_elements(By.ID, "styleLink")[1].get_attribute("textContent")
    # print('style:', beer_style)

    # time.sleep(10)
    # show_more = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, ".pb-4 .MuiButtonBase-root.mt-3")))
    # show_more.click()

    # time.sleep(1)
    # glasses = driver.find_elements(By.CSS_SELECTOR, ".mt-3.mr-4 .kbrPIo")

    beer_info = {
        "name": beer_name,
        "style": beer_style
        # "glasses": []
    }

    # for glass in glasses:
    #     beer_info['glasses'].append(glass.get_attribute("textContent"))

    print('beerinfo:', beer_info)
    return beer_info

def save_beer(beer_info, url):
    print('style inside save beer:', beer_info["style"])
    connection = psycopg2.connect(url)
    cursor = connection.cursor()
    cursor.execute('SELECT "styleId" FROM "Styles" WHERE "styleName" = %s', (beer_info["style"],))
    result = cursor.fetchall()
    # style_ids = result[0] if result else None
    style_ids = [row[0] for row in result] if result else []
    print('style ids inside save beer:', style_ids)
    # cur = connection.cursor()
    for style_id in style_ids:
        cursor.execute('INSERT INTO "Beers" ("beerName", "beerStyleId") VALUES (%s, %s)', (beer_info["name"], style_id,))
    connection.commit()
    cursor.close()
    connection.close()
    # print('inserted beers')
    

def get_glasses(beer_info, url):
    glasses = []
    connection = psycopg2.connect(url)
    cursor = connection.cursor()
    # style_id = cursor.execute('SELECT "styleId" FROM "Styles" WHERE "styleName" = beer_info["style"]')
    # style_id = cursor.execute('SELECT "styleId" FROM "Styles" WHERE "styleName" = %s', (beer_info["style"],))
    cursor.execute('SELECT "styleId" FROM "Styles" WHERE "styleName" = %s', (beer_info["style"],))
    style_ids = cursor.fetchall()
    print('style_id (may return more than one value because of the glasses):', style_ids)
    for style_id in style_ids:
        style_id_str = str(style_id) 
        style_id_str = style_id_str.replace('(', '').replace(')', '').replace(',', '')
        style_id = int(style_id_str)
        print('style id:', style_id)
        # glass_id = cursor.execute('SELECT "glassId" FROM "Styles" WHERE "styleId" = %s', (style_id,))
        cursor.execute('SELECT "glassId" FROM "Styles" WHERE "styleId" = %s', (style_id,))
        glass_id = cursor.fetchone()
        glass_id_str = str(glass_id)
        glass_id_str = glass_id_str.replace('(', '').replace(')', '').replace(',', '')
        glass_id = glass_id_str
        print('glass id:', glass_id)
        cursor.execute('SELECT "glassName" FROM "Glasses" WHERE "glassId" = %s', (glass_id,))
        glass = cursor.fetchone()
        glass_str = str(glass)
        glass_str = glass_str.replace('(', '').replace(')', '').replace(',', '').replace("'", "")
        glass = glass_str
        glasses.append(glass)
        print('glasses:', glasses)
    return glasses
    # return beer_info['glasses']

def main(beer, PATH, url):
    print('beer in main:', beer)
    beer_info = get_beer_info(beer, PATH)
    save_beer(beer_info, url)
    glasses = get_glasses(beer_info, url)
    print('glasses:', glasses)
    return glasses

main(beer, PATH, url)
# driver.quit()