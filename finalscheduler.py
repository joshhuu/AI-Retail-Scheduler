import pandas as pd
import numpy as np
from joblib import load

def run_scheduling_engine(daily_orders):
    # Load raw integrated data for each worker group
    df_sm = pd.read_csv("csv/Integrated_SweetsMakers.csv")
    df_sp = pd.read_csv("csv/Integrated_SweetsPackagers.csv")
    df_r  = pd.read_csv("csv/Integrated_Retailers.csv")
    
    # Load saved AI models
    rf_sm = load("models/rf_sm_model.joblib")
    rf_sp = load("models/rf_sp_model.joblib")
    rf_r  = load("models/rf_r_model.joblib")
    
    # --------------------------
    # Recalculate target assignments based on daily orders
    # --------------------------
    # For Sweets Makers:
    num_sm = df_sm["Employee_ID"].nunique()
    new_target_sm = daily_orders / num_sm  # e.g., 1000 orders / 19 sweetmakers ≈ 52.6 laddoos per person
    df_sm["Assigned_Laddoos"] = new_target_sm
    df_sm["Assigned_Jalebis"] = new_target_sm

    # For Sweets Packagers:
    num_sp = df_sp["Employee_ID"].nunique()
    new_target_sp = daily_orders / num_sp  # e.g., 1000 orders / 20 packagers = 50.0 items per person
    df_sp["Assigned_Packaged"] = new_target_sp

    # For Retailers:
    num_r = df_r["Employee_ID"].nunique()
    new_target_r = daily_orders / num_r  # e.g., 1000 orders / 20 retailers = 50.0 sales per person
    df_r["Assigned_Sales"] = new_target_r

    # --------------------------
    # Define Feature Columns (as used during training)
    # --------------------------
    feature_cols_sm = [
        "Completion_Time (mins)",
        "Feedback_Rating",
        "Order_Volume",   # If using order volume in prediction
        "Laddoos_Orders",
        "Jalebis_Orders",
        "Laddoos_Ratio",
        "Jalebis_Ratio",
        "Demand_Laddoos_Ratio",
        "Demand_Jalebis_Ratio"
    ]
    feature_cols_sp = [
        "Total_Time_Taken (secs)",
        "Feedback_Rating",
        "Packaging_Ratio",
        "Packaging_Demand_Ratio"
    ]
    feature_cols_r = [
        "Completion_Time (mins)",
        "Feedback_Rating",
        "Sales_Ratio",
        "Sales_Demand_Ratio"
    ]
    
    # Optionally update Order_Volume if it exists in Sweets Makers data
    if "Order_Volume" in df_sm.columns:
        df_sm["Order_Volume"] = daily_orders
    
    # --------------------------
    # Make Predictions Using the AI Models
    # --------------------------
    df_sm["Predicted_Underperform"] = rf_sm.predict(df_sm[feature_cols_sm])
    df_sp["Predicted_Underperform"] = rf_sp.predict(df_sp[feature_cols_sp])
    df_r["Predicted_Underperform"] = rf_r.predict(df_r[feature_cols_r])
    
    # --------------------------
    # Adjustment Functions: Apply AI adjustments based on predictions
    # --------------------------
    def adjust_sm_schedule(row):
        if row["Predicted_Underperform"] == 1:
            row["Adjusted_Assigned_Laddoos"] = round(row["Assigned_Laddoos"] * 0.9, 1)
            row["Adjusted_Assigned_Jalebis"] = round(row["Assigned_Jalebis"] * 0.9, 1)
        else:
            row["Adjusted_Assigned_Laddoos"] = row["Assigned_Laddoos"]
            row["Adjusted_Assigned_Jalebis"] = row["Assigned_Jalebis"]
        return row

    def adjust_sp_schedule(row):
        if row["Predicted_Underperform"] == 1:
            row["Adjusted_Assigned_Packaged"] = round(row["Assigned_Packaged"] * 0.9, 1)
        else:
            row["Adjusted_Assigned_Packaged"] = row["Assigned_Packaged"]
        return row

    def adjust_r_schedule(row):
        if row["Predicted_Underperform"] == 1:
            row["Adjusted_Assigned_Sales"] = round(row["Assigned_Sales"] * 0.9, 1)
        else:
            row["Adjusted_Assigned_Sales"] = row["Assigned_Sales"]
        return row

    # Apply adjustments
    df_sm = df_sm.apply(adjust_sm_schedule, axis=1)
    df_sp = df_sp.apply(adjust_sp_schedule, axis=1)
    df_r  = df_r.apply(adjust_r_schedule, axis=1)
    
    # --- Aggregate data to remove repetition ---
    def aggregate_data(df, id_col, columns_to_keep):
        # Group by Employee_ID and retain all necessary fields (e.g., Laddoos, Jalebis)
        aggregation_rules = {col: 'first' for col in columns_to_keep}
        return df.groupby(id_col).agg(aggregation_rules).reset_index()

    # Define columns to keep for each DataFrame
    df_sm_agg = aggregate_data(df_sm, 'Employee_ID', [
        'Assigned_Laddoos', 'Adjusted_Assigned_Laddoos',
        'Assigned_Jalebis', 'Adjusted_Assigned_Jalebis',
        'Predicted_Underperform'
    ])
    
    df_sp_agg = aggregate_data(df_sp, 'Employee_ID', [
        'Assigned_Packaged', 'Adjusted_Assigned_Packaged',
        'Predicted_Underperform'
    ])
    
    df_r_agg = aggregate_data(df_r, 'Employee_ID', [
        'Assigned_Sales', 'Adjusted_Assigned_Sales',
        'Predicted_Underperform'
    ])

    return df_sm_agg, df_sp_agg, df_r_agg
    

# For testing, run the engine from the command line:
if __name__ == "__main__":
    try:
        daily_orders = int(input("Enter today's order volume: "))
    except ValueError:
        print("Invalid input. Please enter a valid integer.")
        exit(1)
    
    df_sm, df_sp, df_r = run_scheduling_engine(daily_orders)
    
    # Aggregate by employee to see one row per person (if needed)
    def aggregate_by_employee(df, id_col, normal_col, adjusted_col):
        df_agg = df.groupby(id_col).agg({
            normal_col: "mean",
            adjusted_col: "mean"
        }).reset_index()
        df_agg[normal_col] = df_agg[normal_col].round(1)
        df_agg[adjusted_col] = df_agg[adjusted_col].round(1)
        return df_agg
    
    df_sm_agg = aggregate_by_employee(df_sm, "Employee_ID", "Assigned_Laddoos", "Adjusted_Assigned_Laddoos")
    df_sp_agg = aggregate_by_employee(df_sp, "Employee_ID", "Assigned_Packaged", "Adjusted_Assigned_Packaged")
    df_r_agg  = aggregate_by_employee(df_r, "Employee_ID", "Assigned_Sales", "Adjusted_Assigned_Sales")
    
    print("\nSweets Makers Aggregated Schedule:")
    print(df_sm_agg)
    print("\nSweets Packagers Aggregated Schedule:")
    print(df_sp_agg)
    print("\nRetailers Aggregated Schedule:")
    print(df_r_agg)
