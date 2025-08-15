from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import pandas as pd
from python_files.finalscheduler import run_scheduling_engine
from io import BytesIO
import zipfile

app = Flask(__name__)
CORS(app)

def aggregate_data(df, group_column):
    """Aggregate data by Employee_ID and sum numerical columns"""
    if not df.empty:
        
        return df.groupby(group_column, as_index=False).sum()
    return df

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    daily_orders = int(data['orderVolume'])
    
    excluded_employee_id = data.get('excludeEmployeeId')  
    worker_group = data.get('workerGroup')  

    
    df_sm, df_sp, df_r = run_scheduling_engine(
        daily_orders,
        exclude_id=excluded_employee_id,
        exclude_group=worker_group
    )

    
    return jsonify({
        'sweetsMakers': df_sm.to_dict(orient='records'),
        'packagers': df_sp.to_dict(orient='records'),
        'retailers': df_r.to_dict(orient='records')
    })

if __name__ == '__main__':
    app.run(port=5000)
