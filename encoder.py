"""
Position-shift cipher.

No interactive console anymore — this just exposes one function:

    process(text, mode)
        text -> the string to transform
        mode -> 'encode' or 'decode'
        returns the transformed string

encoder.html loads this file and calls process() directly.
"""

import random

# Added a space to the CHARS list so it gets shuffled/encoded
CHARS = " `1234567890-=qwertyuiop[]\\asdfghjkl;'zxcvbnm,./~!@#$%*()_+QWERTYUIOP{}|ASDFGHJKL:\"ZXCVBNM<>?"


def get_map(seed_val, reverse=False):
    c_list = list(CHARS)
    shuffled = list(CHARS)
    rng = random.Random(str(seed_val))
    while True:
        rng.shuffle(shuffled)
        # Ensure no character maps to itself
        if all(c_list[i] != shuffled[i] for i in range(len(c_list))):
            break
    return dict(zip(shuffled, c_list)) if reverse else dict(zip(c_list, shuffled))


def process(text, mode):
    res = ""
    for i, c in enumerate(text):
        # If the character isn't in our map (like newlines), keep it as is
        if c not in CHARS:
            res += c
            continue

        m = get_map(i + 1, mode == 'decode')
        res += m.get(c, c)
    return res
