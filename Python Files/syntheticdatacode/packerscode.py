import pandas as pd
import numpy as np
import random

# Parameters for Sweets Packagers
num_days = 30
num_employees = 20
employee_ids = [f"SP{i:02d}" for i in range(1, num_employees+1)]
names = ['Fatima', 'Gaurav', 'Hema', 'Ishan', 'Jiya', 'Kabir', 'Lalit', 'Mira', 'Naveen', 'Omkar',
         'Priya', 'Rashmi', 'Siddharth', 'Tanvi', 'Usha', 'Varsha', 'Yash', 'Zain', 'Arjun', 'Bhavna']
target_packaged = 10

data = []
for day in range(1, num_days+1):
    for emp_id, name in zip(employee_ids, names):
        # 80% chance to meet target; 20% chance to underperform by 1 or 2 units.
        if random.random() < 0.8:
            actual_packaged = target_packaged
        else:
            actual_packaged = max(0, target_packaged - random.choice([1, 2]))
        
        # Assume a base time of 15 seconds per package (target total 150 secs) with some noise.
        base_time = 15 * target_packaged
        total_time_taken = int(np.random.normal(base_time, 10))
        
        # Simulate feedback rating around 4.5 with some variance, clipped between 1 and 5.
        feedback_rating = round(np.clip(np.random.normal(4.5, 0.5), 1, 5), 1)
        
        data.append({
            "Day": day,
            "Employee_ID": emp_id,
            "Name": name,
            "Target_Packaged": target_packaged,
            "Actual_Packaged": actual_packaged,
            "Total_Time_Taken (secs)": total_time_taken,
            "Feedback_Rating": feedback_rating
        })

df_sp = pd.DataFrame(data)
df_sp.to_csv("Synthetic_SweetsPackagers.csv", index=False)
print("Sweets Packagers synthetic dataset created.")
