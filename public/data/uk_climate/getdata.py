import requests
from bs4 import BeautifulSoup
import os

# The URL of the website from which to download files
website_url = 'https://www.ncei.noaa.gov/data/global-summary-of-the-year/access/'

# Directory to save the downloaded files
download_directory = './'


def get_soup(url):
    """Fetch the webpage at the given URL and return a BeautifulSoup object."""
    response = requests.get(url)
    return BeautifulSoup(response.text, 'html.parser')


def download_file(file_url, save_path):
    """Download the file from file_url to the save_path."""
    response = requests.get(file_url)
    with open(save_path, 'wb') as file:
        file.write(response.content)

#==================

soup = get_soup(website_url)

# Assuming files are linked directly from <a> tags; adjust if necessary
for link in soup.find_all('a', href=True):
    href = link['href']

    # Check if the link's href attribute ends with a file-like pattern and starts with 'UK0'
    if href.startswith('UKE0'):
        file_url = href if href.startswith('http') else f'{website_url}/{href}'
        file_name = href.split('/')[-1]  # Extract file name from URL
        save_path = os.path.join(download_directory, file_name)

        print(f'Downloading {file_name}...')
        download_file(file_url, save_path)
        print(f'{file_name} downloaded to {save_path}')

print('All files starting with "UK0" have been downloaded.')

# main()
