from server.getDistance import utils
import math
import os
from dotenv import load_dotenv
from collections import defaultdict
import pandas as pd


def find_path_points(start_lat, start_lon):
    df = pd.read_csv("server/data/data.csv")

    items_numppy = df['name'].unique()
    # items = items_numppy.tolist() + ["Home"]
    items = items_numppy.tolist()

    print("Items", items)

    shops = utils.convert_to_dict(df.to_json(orient='records'), start_lat, start_lon)
    print("Shops", shops)
    lst = len(shops)
    
    result, total_dist = optimised_tsp_with_hieuristic(shops, items, start_lat, start_lon, lst)
    print(total_dist)
    print(result)
    
    # Track shops and associated info to avoid duplicates
    shop_seen = set()
    shop_items_map = defaultdict(list)
    shop_coords_map = {}

    for coord, item, shop in result:
        if shop == "Home":
            continue
        shop_seen.add(shop)
        shop_items_map[shop].append(item)
        shop_coords_map[shop] = coord  # This will store the last coord (or overwrite, doesn't matter since it's same shop)

    formatted_best_path = []
    for shop in shop_seen:
        formatted_coord = {
            "coordinates": {
                "Latitude": shop_coords_map[shop][0],
                "Longitude": shop_coords_map[shop][1]
            },
            "Shop": shop,
            "Items": shop_items_map[shop]
        }
        formatted_best_path.append(formatted_coord)
        
    # Add start and end back
    formatted_best_path = [
        {
            "coordinates": {"Latitude": start_lat, "Longitude": start_lon},
            "Shop": "Home",
            "Items": ["Start"]
        }
    ] + formatted_best_path + [
        {
            "coordinates": {"Latitude": start_lat, "Longitude": start_lon},
            "Shop": "Home",
            "Items": ["End"]
        }
    ]

    # Shop to items mapping with cost per unit
    shop_item_map = {}
    for entry in result:
        coord, item, shop = entry
        if shop == "Home":
            continue
        # Find cost from original shop list
        matching_shop = next((s for s in shops if s['name'] == item and s['shops']['name'] == shop), None)
        if not matching_shop:
            continue
        cost = matching_shop['price']

        if shop not in shop_item_map:
            shop_item_map[shop] = []

        # Avoid duplicate entries for same item in same shop
        if not any(existing['item'] == item for existing in shop_item_map[shop]):
            shop_item_map[shop].append({"item": item, "cost": cost})

    return formatted_best_path, shop_item_map

    
def optimised_tsp_with_hieuristic(shops, items_to_visit, start_lat, start_lon, lst):
    
    num_items = len(items_to_visit)      # Calculate the number of unique items to visit
    all_items_mask = (1 << num_items) - 1   # Create a bitmask to represent visited items

    # Helper function to recursively find the shortest path using hieuristics like  A*.
    def dp(mask, last_shop_coord, last_shop_index):
        if  last_shop_index == lst and mask != all_items_mask:
            return float('inf'), []
        if mask == all_items_mask:
            return 0, []  # All unique items have been visited

        if (mask, last_shop_index) in memo:
            return memo[(mask, last_shop_index)]

        shortest_distance = float('inf')
        best_path = []

        for shop_index, shop in enumerate(shops):
            shop_coords = (shop['shops']['latitude'], shop['shops']['longitude'])
            item_name = shop['name']

            if item_name not in items_to_visit:
                continue

            item_index = items_to_visit.index(item_name)

            if not (mask & (1 << item_index)): # If the item hasn't been visited yet
                new_mask = mask | (1 << item_index)
                distance_travel = shop['price'] + utils.haversine(last_shop_coord[0], last_shop_coord[1], shop_coords[0], shop_coords[1])
                dist, path = dp(new_mask, shop_coords, shop_index + 1)

                if dist + distance_travel < shortest_distance:
                    shortest_distance = dist + distance_travel
                    best_path = [(shop_coords, item_name, shop['shops']['name'])] + path

        if shortest_distance < float('inf'):
            memo[(mask, last_shop_index)] = (shortest_distance, best_path)
            return shortest_distance, best_path
        else:
            return float('inf'), []

    memo = {}
    shortest_distance, shortest_path = dp(0, (start_lat, start_lon), 0)
    
    shortest_path = [((start_lat, start_lon), "Start", "Home")] + shortest_path + [((start_lat, start_lon), "End", "Home")]
    return shortest_path, shortest_distance