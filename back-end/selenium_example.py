# importação do webdriver, que é o que possibilita a implementação para todos
# os principais navegadores da web
from time import sleep
from selenium import webdriver

# criação de uma instância de navegador utilizando o Firefox
chrome = webdriver.Chrome()

# requisições para essa instância criada utilizando o método `get`
response = chrome.get("https://www.python.org/")