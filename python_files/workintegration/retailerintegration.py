import pandas as pd

# Load synthetic orders data
df_orders = pd.read_csv("Synthetic_Orders.csv")

# Aggregate orders by Day (using total order volume for retailers)
orders_by_day = df_orders.groupby("Day").agg({
    "Order_Volume": "sum"
}).reset_index()

# Load synthetic retailers data
df_r = pd.read_csv("Synthetic_Retailers.csv")

# Merge orders with retailers data on "Day"
df_r_merged = pd.merge(df_r, orders_by_day, on="Day", how="left")

# Feature Engineering:
# Calculate Sales Ratio: actual sales divided by target sales
df_r_merged["Sales_Ratio"] = df_r_merged["Actual_Sales"] / df_r_merged["Target_Sales"]

# Demand-to-Sales Capacity Ratio (assuming 20 retailers)
df_r_merged["Sales_Demand_Ratio"] = df_r_merged["Order_Volume"] / (20 * df_r_merged["Target_Sales"])

# Underperform if Actual_Laddoos < Target_Laddoos OR Actual_Jalebis < Target_Jalebis
df_r_merged["Underperform"] = (
    (df_r_merged["Actual_Sales"] < df_r_merged["Target_Sales"])
).astype(int)  # 1 = Underperform, 0 = Not Underperform

# Save the integrated dataset
df_r_merged.to_csv("Integrated_Retailers.csv", index=False)
print("Integrated Retailers dataset created.")
