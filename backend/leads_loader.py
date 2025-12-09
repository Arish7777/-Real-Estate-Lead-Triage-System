import pandas as pd
import io

def load_leads_from_csv(file_content: bytes) -> list:
    """
    Parses CSV content and returns a list of dictionaries.
    Handles missing values by replacing them with None or empty strings.
    """
    try:
        df = pd.read_csv(io.BytesIO(file_content))
        # Replace NaN with None or empty string for consistency
        df = df.where(pd.notnull(df), None)
        # Convert to list of dicts
        leads = df.to_dict(orient='records')
        return leads
    except Exception as e:
        print(f"CSV Load Error: {e}")
        return []
