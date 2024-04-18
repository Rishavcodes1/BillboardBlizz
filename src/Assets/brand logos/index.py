import os

cwd = os.listdir()
cwd.remove("index.py")
for f in cwd:
    f2 = f.split('.')[0]
    # print(f"import {f2} from '../assets/brand logos/{f2}.png'")
    print(f"{f2},", end="")
print("\b\b")