import csv
import json
# Function to convert a CSV to JSON
# Takes the file paths as arguments
import os
import re
import urllib.parse
import sys
# Get path adjacent to this file
current_dir = os.path.dirname(os.path.abspath(__file__))
csvFilePath = os.path.join(current_dir, 'data_eskul.csv')
jsonFilePath = 'data_eskul.json' # Stored on root directory
translateKey = {
    "Timestamp": "timestamp",
    "nama ekstrakurikuler & organisasi": "organization_name",
    "nama lengkap pembina beserta gelar": "coach_name",
    "nama lengkap ketua": "chairman_name",
    "nama lengkap wakil ketua": "vice_chairman_name",
    "jadwal kumpulan eskul & organisasi": "schedule",
    "visi eskul & organisasi": "vision",
    "misi eskul & organisasi": "mission",
    "program kerja": "work_program",
    "logo ekstrakurikuler & organisasi": "logo",
    "nama akun instagram eskul & organisasi": "instagram_account"

}


def make_json(csvFilePath, jsonFilePath):
    # create a dictionary
    data = {}

    # Open a csv reader called DictReader
    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)

        # Convert each row into a dictionary
        # and add it to data
        for rows in csvReader:
            original_row = dict(rows)
            # translate the keys and convert \n to <br>
            for key in translateKey:
                if key in original_row:
                    rows[translateKey[key]] = original_row[key]
                    del rows[key]

            # make organization id
            rows['id'] = rows['organization_name']
            # replace non-alphanumeric to -
            rows['id'] = re.sub('[^0-9a-zA-Z]+', '-', rows['id'])
            # lowercase
            rows['id'] = rows['id'].lower()
            # remove space
            rows['id'] = rows['id'].replace(' ', '')
            # remove trailing -
            rows['id'] = rows['id'].rstrip('-')
            # remove leading -
            rows['id'] = rows['id'].lstrip('-')
            # remove multiple -
            rows['id'] = re.sub('-{2,}', '-', rows['id'])

            # urlencode the logo rows
            if 'logo' in rows:
                if rows['logo'].startswith('http'):
                    rows['logo'] = rows['id'].replace('-', ' ') + '.png'
                rows['logo'] = "https://github.com/itclub-one/web-eslul/raw/master/img/logo/" + urllib.parse.quote(
                    rows['logo'])


            if 'instagram_account' in rows:
                # if startswith '@' remove it
                rows['instagram_account'] = rows['instagram_account'].lstrip('@')
                # remove space
                rows['instagram_account'] = rows['instagram_account'].replace(' ', '')
                # trim
                rows['instagram_account'] = rows['instagram_account'].strip()

            data[rows['id']] = rows

    # Open a json writer, and use the json.dumps()
    # function to dump data
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))


# Driver Code

# Decide the two file paths according to your
# computer system



# Call the make_json function
make_json(csvFilePath, jsonFilePath)

# Check if it's github actions
if 'GITHUB_ACTIONS' in os.environ:
  try:
      os.system('git config user.email github-actions[bot]@users.noreply.github.com')
      os.system('git config user.name Updater[bot]')
      os.system('git add .')
      os.system('git commit -m "update data"')
      os.system('git push')
      print("pushed")
  except:
      pass
else:
    print("not pushed")
    pass