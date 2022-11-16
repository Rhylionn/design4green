# API
from pymongo import MongoClient

list = [
  'Albi',
  'Ales',
  'Anglet',
  'Bordeaux',
  'Boulogne-Billancourt',
  'La Bernardière',
  'La Rochelle',
  'Levallois-Perret\n',
  'Lille',
  'Lyon',
  'Montpellier',
  'Morlaix',
  'Mulhouse',
  'Nantes',
  'Nantes et Rennes', # Cas particulier 
  'National',         # Cas particulier 
  'Paris',
  'Paris - France',   # Cas particulier 
  'Pontoise',
  'Puteaux',
  'Puteaux-La défense',
  'Rennes',
  'Rouen',
  'SAINT MALO',
  "Saint-Barthélemy d'Anjou",
  'Saint-Etienne-de-Montluc',
  'Saint-Étienne',
  'Toulouse',
  'Toute la France', # Cas particulier 
  'Versailles',
  'Évry'
]


finalList = {
  "Albi": [43.927755, 2.147899],
  "Ales": [43.927755, 2.147899],
  "Anglet": [43.4813927, -1.5149935],
  "Bordeaux": [44.841225, -0.5800364],
  "Boulogne-Billancourt": [48.8356649, 2.240206],
  "La Bernardière": [47.0505556, -1.2647222],
  "La Rochelle": [46.1591126, -1.1520434],
  "Levallois-Perret": [48.892956, 2.2881683],
  "Lille": [50.6365654, 3.0635282],
  "Lyon": [45.7578137, 4.8320114],
  "Montpellier": [43.6112422, 3.8767337],
  "Morlaix": [48.5824932, -3.8331972],
  "Mulhouse": [47.7467233, 7.3389937],
  "Nantes": [47.2186371, -1.5541362],
  "Paris": [48.8588897, 2.320041],
  "Paris - France": [48.8588897, 2.320041],
  "Pontoise": [49.0508845, 2.1008067],
  "Versailles": [48.8035403, 2.1266886],
  "Évry": [48.26406, 3.25604],
  "Toulouse": [43.6044622, 1.4442469],
  "Saint-Étienne": [45.4401467, 4.3873058],
  "Saint-Etienne-de-Montluc": [47.2739351, -1.7810546],
  "Saint-Barthélemy d'Anjou": [47.4683081, -0.4932941],
  "SAINT MALO": [48.649518, -2.0260409],
  "Rouen": [49.4404591, 1.0939658],
  "Rennes": [48.1113387, -1.6800198],
  "Puteaux-La défense": [48.8922478, 2.2369184],
  "Puteaux": [48.8841522, 2.2368863]
}

client = MongoClient("mongodb://127.0.0.1:27017")
print("Connection successful")

db = client["design4green"]
collection = db["formations"]

for key in finalList:
  query = { "structLoc": key }
  new = { "$set": { "structCoords": finalList[key] }}
  x = collection.update_many(query, new)

client.close()
