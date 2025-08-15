import pandas as pd

# Load synthetic orders data
df_orders = pd.read_csv("Synthetic_Orders.csv")

# Aggregate orders by Day; assume packaging demand equals the total of laddoos and jalebis orders
orders_by_day = df_orders.groupby("Day").agg({
    "Laddoos_Orders": "sum",
    "Jalebis_Orders": "sum"
}).reset_index()
orders_by_day["Packaging_Demand"] = orders_by_day["Laddoos_Orders"] + orders_by_day["Jalebis_Orders"]

# Load synthetic sweets packagers data
df_sp = pd.read_csv("Synthetic_SweetsPackagers.csv")

# Merge orders with sweets packagers data on "Day"
df_sp_merged = pd.merge(df_sp, orders_by_day[["Day", "Packaging_Demand"]], on="Day", how="left")

# Feature Engineering:
# Calculate Packaging Ratio: how many items packaged compared to target
df_sp_merged["Packaging_Ratio"] = df_sp_merged["Actual_Packaged"] / df_sp_merged["Target_Packaged"]

# Demand-to-Packaging Capacity Ratio (assuming 20 packagers)
df_sp_merged["Packaging_Demand_Ratio"] = df_sp_merged["Packaging_Demand"] / (20 * df_sp_merged["Target_Packaged"])

# Example for Sweets Makers
# Underperform if Actual_Laddoos < Target_Laddoos OR Actual_Jalebis < Target_Jalebis
df_sp_merged["Underperform"] = (
    (df_sp_merged["Actual_Packaged"] < df_sp_merged["Target_Packaged"])
).astype(int)  # 1 = Underperform, 0 = Not Underperform

# Save the integrated dataset
df_sp_merged.to_csv("Integrated_SweetsPackagers.csv", index=False)
print("Integrated Sweets Packagers dataset created.")
