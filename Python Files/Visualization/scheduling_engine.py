import pandas as pd

# Function to schedule Sweets Makers
def schedule_sweets_makers(file_path):
    df = pd.read_excel(file_path)
    # Assign targets as the schedule (for prototype, we simply use target values)
    df['Assigned_Laddoos'] = df['Target_Laddoos']
    df['Assigned_Jalebis'] = df['Target_Jalebis']
    # Optional: Flag underperformance (if actual output is less than target)
    df['Underperform'] = (df['Actual_Laddoos'] < df['Target_Laddoos']) | (df['Actual_Jalebis'] < df['Target_Jalebis'])
    return df

# Function to schedule Sweets Packagers
def schedule_sweets_packagers(file_path):
    df = pd.read_excel(file_path)
    # Assign packaging target
    df['Assigned_Packaged'] = df['Target_Packaged']
    # Optional: Flag underperformance
    df['Underperform'] = df['Actual_Packaged'] < df['Target_Packaged']
    return df

# Function to schedule Retailers
def schedule_retailers(file_path):
    df = pd.read_excel(file_path)
    # Assign sales target
    df['Assigned_Sales'] = df['Target_Sales']
    # Optional: Flag underperformance
    df['Underperform'] = df['Actual_Sales'] < df['Target_Sales']
    return df

def main():
    # File paths for the Excel files
    sweets_makers_file = 'SweetsMakers.xlsx'
    sweets_packagers_file = 'SweetsPackagers.xlsx'
    retailers_file = 'Retailers.xlsx'
    
    # Generate schedules for each role
    makers_schedule = schedule_sweets_makers(sweets_makers_file)
    packagers_schedule = schedule_sweets_packagers(sweets_packagers_file)
    retailers_schedule = schedule_retailers(retailers_file)
    
    # For the prototype, simply print the first few rows
    print("Sweets Makers Schedule:")
    print(makers_schedule.head(), "\n")
    
    print("Sweets Packagers Schedule:")
    print(packagers_schedule.head(), "\n")
    
    print("Retailers Schedule:")
    print(retailers_schedule.head(), "\n")
    
    # Optionally, you can write these schedules back to Excel for further review:
    makers_schedule.to_excel("Scheduled_SweetsMakers.xlsx", index=False)
    packagers_schedule.to_excel("Scheduled_SweetsPackagers.xlsx", index=False)
    retailers_schedule.to_excel("Scheduled_Retailers.xlsx", index=False)

if __name__ == "__main__":
    main()
