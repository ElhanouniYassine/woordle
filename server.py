# from flask import Flask, request, jsonify

# app = Flask(__name__)

# @app.route('/process', methods=['POST'])
# def process():
#     data = request.json

#     print("Received data from JavaScript:")
#     for item in data:
#         print(f"Letter: {item['letter']}, Index: {item['index']}")

#     response = {"status": "success", "message": "Data processed successfully"}
#     return jsonify(response)

# if __name__ == '__main__':
#     app.run(debug=True)

with open("words.txt", "r") as wordle_words:
    content = wordle_words.read()
list_wordle_words=content.split("\n")

possible_words={"r":0,"i":1}#hada khasso ikon list dyal dictionnaries
possible_solutions=[]
for word in list_wordle_words:
    satisfies_constraints = True
    for letter, position in possible_words.items():
        if len(word) <= position or word[position] != letter:
            satisfies_constraints = False
            break
    if satisfies_constraints:
        possible_solutions.append(word)

print(len(possible_solutions),len(list_wordle_words))
print(possible_solutions)