import base64, json, os

def xor_encrypt(input_string: str, key: str):
    input_bytes = input_string.encode('utf-8')
    encoded_bytes = base64.b64encode(input_bytes)
    key_bytes = key.encode('utf-8')
    encrypted_bytes = bytes([b ^ key_bytes[i % len(key_bytes)] for i, b in enumerate(encoded_bytes)])
    encrypted_string = encrypted_bytes.decode('utf-8')
    return encrypted_string

def xor_decrypt(encrypted_string: str, key: str):
    encrypted_bytes = encrypted_string.encode('utf-8')
    key_bytes = key.encode('utf-8')
    decoded_bytes = bytes([b ^ key_bytes[i % len(key_bytes)] for i, b in enumerate(encrypted_bytes)])
    decoded_bytes = base64.b64decode(decoded_bytes)
    decrypted_string = decoded_bytes.decode('utf-8')
    return decrypted_string

KEY = 'nekomikoreimu'

FILE = 'user.ini'

def get_raw_data():
    if not os.path.exists(FILE):
        with open(FILE, 'w', encoding='utf-8') as f:
            f.write(xor_encrypt('{}', KEY))
        return {}
    else:
        with open(FILE, 'r', encoding='utf-8') as f:
            return json.loads(xor_decrypt(f.read(), KEY))

def append_data(raw):
    raw.update(get_raw_data())
    with open(FILE, 'w', encoding='utf-8') as f:
        f.write(xor_encrypt(json.dumps(raw), KEY))

def check_if_registered(id):
    return id in get_raw_data().keys()

def register(id, pw):
    if check_if_registered(id):
        return False
    
    append_data({id: pw})
    
    return True

def login(id, pw):
    return get_raw_data().get(id) == pw