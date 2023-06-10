import sqlite3
db = sqlite3.connect('./words.sqlite')
cur = db.cursor()

with open('./words.txt') as f:
    words = f.readlines()
    for word in words:
        word = word[:-1]
        sql = f'insert into words (value, occ, acc, speed) values ("{word}", 0, 0, 0);'
        cur.execute(sql)
        print(word)
    db.commit()
