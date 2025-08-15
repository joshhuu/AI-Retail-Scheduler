import pandas as pd
import numpy as np
import random

# Parameters
num_days = 30
timeslots = ["Morning", "Afternoon", "Evening", "Night"]
base_order = 20  # Base number of orders for calculation

# Multipliers to simulate peak vs. off-peak times
timeslot_multiplier = {
    "Morning": 1.5,   # Peak
    "Afternoon": 1.0, # Moderate
    "Evening": 1.8,   # Highest peak
    "Night": 0.8      # Off-peak
}

order_data = []

for day in range(1, num_days + 1):
    for slot in timeslots:
        # Calculate mean order volume for the timeslot
        mean_orders = base_order * timeslot_multiplier[slot]
        # Generate order volume with some random noise (std deviation = 5)
        order_volume = max(0, int(np.random.normal(mean_orders, 5)))
        
        # Split the orders into laddoos and jalebis.
        # Randomly decide laddoos percentage between 40% and 60%
        laddoos_pct = random.uniform(0.4, 0.6)
        laddoos_orders = int(order_volume * laddoos_pct)
        jalebis_orders = order_volume - laddoos_orders
        
        order_data.append({
            "Day": day,
            "TimeSlot": slot,
            "Order_Volume": order_volume,
            "Laddoos_Orders": laddoos_orders,
            "Jalebis_Orders": jalebis_orders
        })

df_orders = pd.DataFrame(order_data)
df_orders.to_csv("Synthetic_Orders.csv", index=False)
print("Synthetic order dataset created.")
