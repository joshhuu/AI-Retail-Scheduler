import pandas as pd
import numpy as np
from joblib import load

def run_scheduling_engine(daily_orders, exclude_id=None, exclude_group=None):
    
    df_sm = pd.read_csv("csv/Integrated_SweetsMakers.csv")
    df_sp = pd.read_csv("csv/Integrated_SweetsPackagers.csv")
    df_r  = pd.read_csv("csv/Integrated_Retailers.csv")

    
    if exclude_id and exclude_group:
        if exclude_group == "sweetsMakers":
            df_sm = df_sm[df_sm["Employee_ID"] != exclude_id]
        elif exclude_group == "packagers":
            df_sp = df_sp[df_sp["Employee_ID"] != exclude_id]
        elif exclude_group == "retailers":
            df_r = df_r[df_r["Employee_ID"] != exclude_id]

    
    num_sm = df_sm["Employee_ID"].nunique()
    num_sp = df_sp["Employee_ID"].nunique()
    num_r = df_r["Employee_ID"].nunique()

    new_target_sm = round(daily_orders / num_sm, 1) if num_sm > 0 else 0
    new_target_sp = round(daily_orders / num_sp,1) if num_sp > 0 else 0
    new_target_r = round(daily_orders / num_r,1) if num_r > 0 else 0

    df_sm["Assigned_Laddoos"] = new_target_sm
    df_sm["Assigned_Jalebis"] = new_target_sm
    df_sp["Assigned_Packaged"] = new_target_sp
    df_r["Assigned_Sales"] = new_target_r

    
    rf_sm = load("models/rf_sm_model.joblib")
    rf_sp = load("models/rf_sp_model.joblib")
    rf_r  = load("models/rf_r_model.joblib")

    
    feature_cols_sm = [
        "Completion_Time (mins)", "Feedback_Rating", "Order_Volume",
        "Laddoos_Orders", "Jalebis_Orders", "Laddoos_Ratio", "Jalebis_Ratio",
        "Demand_Laddoos_Ratio", "Demand_Jalebis_Ratio"
    ]
    feature_cols_sp = [
        "Total_Time_Taken (secs)", "Feedback_Rating",
        "Packaging_Ratio", "Packaging_Demand_Ratio"
    ]
    feature_cols_r = [
        "Completion_Time (mins)", "Feedback_Rating",
        "Sales_Ratio", "Sales_Demand_Ratio"
    ]

    if "Order_Volume" in df_sm.columns:
        df_sm["Order_Volume"] = daily_orders

    
    df_sm["Predicted_Underperform"] = rf_sm.predict(df_sm[feature_cols_sm])
    df_sp["Predicted_Underperform"] = rf_sp.predict(df_sp[feature_cols_sp])
    df_r["Predicted_Underperform"] = rf_r.predict(df_r[feature_cols_r])

    
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
    
    
    df_sm = df_sm.apply(adjust_sm_schedule, axis=1)
    df_sp = df_sp.apply(adjust_sp_schedule, axis=1)
    df_r = df_r.apply(adjust_r_schedule, axis=1)

    
    def aggregate_data(df, id_col, columns_to_keep):
        aggregation_rules = {col: 'first' for col in columns_to_keep}
        return df.groupby(id_col).agg(aggregation_rules).reset_index()

    
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



if __name__ == "__main__":
    try:
        daily_orders = int(input("Enter today's order volume: "))
    except ValueError:
        print("Invalid input. Please enter a valid integer.")
        exit(1)

    df_sm, df_sp, df_r = run_scheduling_engine(daily_orders)

    
    print("\nSweets Makers Aggregated Schedule:")
    print(df_sm)
    print("\nSweets Packagers Aggregated Schedule:")
    print(df_sp)
    print("\nRetailers Aggregated Schedule:")
    print(df_r)
