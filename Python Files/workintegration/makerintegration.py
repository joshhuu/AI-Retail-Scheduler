import pandas as pd

# Load synthetic orders data
df_orders = pd.read_csv("Synthetic_Orders.csv")

# Aggregate orders by Day (summing orders for all timeslots)
orders_by_day = df_orders.groupby("Day").agg({
    "Order_Volume": "sum",
    "Laddoos_Orders": "sum",
    "Jalebis_Orders": "sum"
}).reset_index()

# Load synthetic sweets makers data
df_sm = pd.read_csv("Synthetic_SweetsMakers.csv")

# Merge orders with sweets makers data on "Day"
df_sm_merged = pd.merge(df_sm, orders_by_day, on="Day", how="left")

# Feature Engineering:
# Performance ratios for sweets production
df_sm_merged["Laddoos_Ratio"] = df_sm_merged["Actual_Laddoos"] / df_sm_merged["Target_Laddoos"]
df_sm_merged["Jalebis_Ratio"] = df_sm_merged["Actual_Jalebis"] / df_sm_merged["Target_Jalebis"]

# Demand-to-Supply Ratios (Assuming 20 sweets makers in total)
df_sm_merged["Demand_Laddoos_Ratio"] = df_sm_merged["Laddoos_Orders"] / (20 * df_sm_merged["Target_Laddoos"])
df_sm_merged["Demand_Jalebis_Ratio"] = df_sm_merged["Jalebis_Orders"] / (20 * df_sm_merged["Target_Jalebis"])

# Example for Sweets Makers
# Underperform if Actual_Laddoos < Target_Laddoos OR Actual_Jalebis < Target_Jalebis
df_sm_merged["Underperform"] = (
    (df_sm_merged["Actual_Laddoos"] < df_sm_merged["Target_Laddoos"]) |
    (df_sm_merged["Actual_Jalebis"] < df_sm_merged["Target_Jalebis"])
).astype(int)  # 1 = Underperform, 0 = Not Underperform

# Save the integrated dataset
df_sm_merged.to_csv("Integrated_SweetsMakers.csv", index=False)
print("Integrated Sweets Makers dataset created.")
