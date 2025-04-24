import streamlit as st
import pandas as pd
from datetime import datetime

st.title("Employee Feedback")

# Emoji options for rating
feedback_options = {
    "😃": "Very Satisfied",
    "🙂": "Satisfied",
    "😐": "Neutral",
    "😞": "Dissatisfied",
    "😠": "Very Dissatisfied"
}

selected_emoji = st.radio("How was your work today?", list(feedback_options.keys()))

# Optional additional feedback
optional_feedback = st.text_area("Additional Feedback (optional)")

if st.button("Submit Feedback"):
    feedback_entry = {
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "emoji": selected_emoji,
        "feedback": optional_feedback
    }
    
    try:
        # Read existing CSV file
        df = pd.read_csv("employee_feedback.csv")
        # Create a DataFrame for the new entry
        new_entry = pd.DataFrame([feedback_entry])
        # Concatenate the new entry to the existing DataFrame
        df = pd.concat([df, new_entry], ignore_index=True)
    except FileNotFoundError:
        # Create new DataFrame if file doesn't exist
        df = pd.DataFrame([feedback_entry])
    
    # Save to CSV
    df.to_csv("employee_feedback.csv", index=False)
    # Also save to Excel
    df.to_excel("employee_feedback.xlsx", index=False)
    
    st.success("Thank you for your feedback!")
