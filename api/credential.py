import json

with open('ecopunto.json', 'r') as file:
    json_data = json.load(file)
    json_string = json.dumps(json_data)

print(json_string)