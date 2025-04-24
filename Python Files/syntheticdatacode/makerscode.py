import pandas as pd
import numpy as np
import random

# Parameters for Sweets Makers
num_days = 30
num_employees = 20
employee_ids = [f"SM{i:02d}" for i in range(1, num_employees+1)]
names = ['Anil', 'Bhavya', 'Chitra', 'Deepak', 'Esha', 'Farhan', 'Gauri', 'Hari', 'Isha', 'Jatin',
         'Kiran', 'Lata', 'Manoj', 'Nisha', 'Omkar', 'Prakash', 'Qadir', 'Rina', 'Suman', 'Tarun']
target_laddoos = 5
target_jalebis = 5

data = []
for day in range(1, num_days+1):
    for emp_id, name in zip(employee_ids, names):
        # 80% chance to meet target; 20% chance to underperform by 1 or 2 units.
        if random.random() < 0.8:
            actual_laddoos = target_laddoos
            actual_jalebis = target_jalebis
        else:
            actual_laddoos = max(0, target_laddoos - random.choice([1, 2]))
            actual_jalebis = max(0, target_jalebis - random.choice([1, 2]))
        
        # Simulate completion time (in minutes) around 480 with a standard deviation of 20.
        completion_time = int(np.random.normal(480, 20))
        # Simulate feedback rating around 4.5 with some variance, clipped between 1 and 5.
        feedback_rating = round(np.clip(np.random.normal(4.5, 0.5), 1, 5), 1)
        
        data.append({
            "Day": day,
            "Employee_ID": emp_id,
            "Name": name,
            "Target_Laddoos": target_laddoos,
            "Target_Jalebis": target_jalebis,
            "Actual_Laddoos": actual_laddoos,
            "Actual_Jalebis": actual_jalebis,
            "Completion_Time (mins)": completion_time,
            "Feedback_Rating": feedback_rating
        })

df_sm = pd.DataFrame(data)
df_sm.to_csv("Synthetic_SweetsMakers.csv", index=False)
print("Sweets Makers synthetic dataset created.")
