import requests
import time
import random

url = 'http://gic-group-6.k3s'

#url = 'http://django.gic-group-6.k3s/admin'

"""urls = [
    'https://example.com/page1',
    'https://example.com/page2',
    'https://example.com/page3',
    'https://example.com/page4',
    'https://example.com/page5'
]"""

for i in range(100000):
    #url = random.choice(urls)
    response = requests.get(url)
    print(f"Request #{i} to {url} returned status code {response.status_code}")
    
    #time.sleep(0.1) # add a 0.1 second delay between requests
