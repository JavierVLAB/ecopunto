import secrets

def generate_api_key():
    return secrets.token_urlsafe(32)

api_key = generate_api_key()
print(f"Tu API key es: {api_key}")