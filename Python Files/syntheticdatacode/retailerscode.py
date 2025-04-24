import pandas as pd
import numpy as np
import random

# Parameters for Retailers
num_days = 30
num_employees = 20
employee_ids = [f"R{i:02d}" for i in range(1, num_employees+1)]
names = ['Kumar', 'Leena', 'Mohit', 'Nisha', 'Om', 'Praveen', 'Rekha', 'Suresh', 'Tina', 'Umesh',
         'Vikram', 'Wendy', 'Xavier', 'Yasmin', 'Zara', 'Amit', 'Bina', 'Chandan', 'Divya', 'Eshan']
target_sales = 10

data = []
for day in range(1, num_days+1):
    for emp_id, name in zip(employee_ids, names):
        # 80% chance to meet target; 20% chance to underperform by 1 or 2 units.
        if random.random() < 0.8:
            actual_sales = target_sales
        else:
            actual_sales = max(0, target_sales - random.choice([1, 2]))
        
        # Simulate completion time (in minutes) around 480 with a standard deviation of 20.
        completion_time = int(np.random.normal(480, 20))
        # Simulate feedback rating around 4.5 with some variance, clipped between 1 and 5.
        feedback_rating = round(np.clip(np.random.normal(4.5, 0.5), 1, 5), 1)
        
        data.append({
            "Day": day,
            "Employee_ID": emp_id,
            "Name": name,
            "Target_Sales": target_sales,
            "Actual_Sales": actual_sales,
            "Completion_Time (mins)": completion_time,
            "Feedback_Rating": feedback_rating
        })

df_r = pd.DataFrame(data)
df_r.to_csv("Synthetic_Retailers.csv", index=False)
print("Retailers synthetic dataset created.")
