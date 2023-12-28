import os, json

class Score:
    def __init__(self, id: str):
        self.id = id
        self.file = os.path.join('static/user_score', id + '.json')
        if not os.path.exists(self.file):
            with open(self.file, 'w', encoding='utf-8') as f:
                f.write('{}')

    def __getitem__(self, key: 'str | int') -> 'float | None':
        with open(self.file, 'r', encoding='utf-8') as f:
            return json.load(f).get(str(key))
    
    def __setitem__(self, key: 'str | int', value: float):
        with open(self.file, 'r', encoding='utf-8') as f:
            obj = json.load(f)
        obj[str(key)] = value
        with open(self.file, 'w', encoding='utf-8') as f:
            json.dump(obj, f, indent=4)

    def __iadd__(self, value: dict[int, float]):
        with open(self.file, 'r', encoding='utf-8') as f:
            obj = json.load(f)
        obj.update(value)
        with open(self.file, 'w', encoding='utf-8') as f:
            json.dump(obj, f, indent=4)
        
        return self
    
    def to_dict(self):
        with open(self.file, 'r', encoding='utf-8') as f:
            return json.load(f)