import pandas as pd

encoding_to_try = 'ISO-8859-1'

# Load the datasets
world_cities = pd.read_csv('./worldcities.csv', encoding=encoding_to_try)
uk_imports = pd.read_csv('./uk-import-2023-all.csv', encoding=encoding_to_try)

# Ensure the correct column names for ISO codes in world_cities, assuming it's 'iso3'
# Adjust column name as necessary
iso_column_world_cities = 'iso3'  # or 'country' or another column name that holds the ISO code

# Extract lat, lng, and ISO code from world_cities
coordinates = world_cities[[iso_column_world_cities, 'lat', 'lng']].drop_duplicates(subset=[iso_column_world_cities])

# Merge the coordinates into uk_imports based on the PartnerISO column and the ISO column from world_cities
uk_imports_with_coordinates = pd.merge(uk_imports, coordinates, left_on='PartnerISO', right_on=iso_column_world_cities, how='left')

# Drop the redundant ISO column from the merge, if necessary
uk_imports_with_coordinates.drop(columns=[iso_column_world_cities], inplace=True)

# Save the merged dataset to a new CSV file
output_file_path = './uk-2023.csv'
uk_imports_with_coordinates.to_csv(output_file_path, index=False)

output_file_path
