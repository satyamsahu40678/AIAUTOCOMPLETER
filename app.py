from flask import Flask, render_template, jsonify, request
from model_lstm import Model

app = Flask(__name__)
#create get api which feed value to Model
@app.route('/api/predict', methods=['GET'])
def get_autocomplete():
    try:
        seed_text= request.args.get('input_string')
        if seed_text is None:
            raise ValueError("Input string is missing")
        print(seed_text)
        model = Model()
        model.load_model()
        ans = model.output(seed_text)
        print(ans)
        return jsonify({'predicted':ans})
    except:
        return jsonify({'predicted':'Model not loaded'})


@app.route('/')
def index():

    return render_template('index.html')

@app.route('/', methods=['POST'])
def autocomplete():

    pass
if __name__ == '__main__':
    app.run()
