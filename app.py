from flask import Flask, request, jsonify
from flask_cors import CORS
from flask import send_file
import pandas as pd
from finalscheduler import run_scheduling_engine
from io import BytesIO
import zipfile

app = Flask(__name__)
CORS(app)

def aggregate_data(df, group_column):
    """Aggregate data by Employee_ID and sum numerical columns"""
    if not df.empty:
        # Group by Employee_ID and sum all numerical columns
        return df.groupby(group_column, as_index=False).sum()
    return df

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    daily_orders = int(data['orderVolume'])
    
    # Run scheduling engine
    df_sm, df_sp, df_r = run_scheduling_engine(daily_orders)
    
    # Aggregate data for each category
    aggregated_data = {
        'sweetsMakers': aggregate_data(df_sm, 'Employee_ID'),
        'packagers': aggregate_data(df_sp, 'Employee_ID'),
        'retailers': aggregate_data(df_r, 'Employee_ID')
    }
    
    # Convert to JSON format
    return jsonify({
        'sweetsMakers': df_sm.head(20).to_dict(orient='records'),
        'packagers': df_sp.head(20).to_dict(orient='records'),
        'retailers': df_r.head(20).to_dict(orient='records')
    })

@app.route('/download', methods=['POST'])
def download():
    data = request.get_json()
    daily_orders = int(data['orderVolume'])
    
    # Regenerate data (same logic as /calculate)
    df_sm, df_sp, df_r = run_scheduling_engine(daily_orders)

if __name__ == '__main__':
    app.run(port=5000)