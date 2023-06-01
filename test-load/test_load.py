import requests
import time
import random

#url = 'http://gic-group-6.k3s'

#url = 'http://django.gic-group-6.k3s/admin'

urls = [
    'http://gic-group-6.k3s/publication/1',
    'http://gic-group-6.k3s/publication/2',
]

for i in range(100000):
    url = random.choice(urls)
    response = requests.get(url)
    print(f"Request #{i} to {url} returned status code {response.status_code}")
    
    #time.sleep(0.1) # add a 0.1 second delay between requests
